import { Component, Inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule, EditorModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.sass',
})
export class BlogFormComponent {
  @Input() blog!: DocumentData;
  @Input() blogPostId!: string;
  user$!: Observable<User | null>;
  userId: string | undefined;
  isLoading: boolean = false;
  isEditMode: boolean = false;

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private blogPostService: BlogPostService,
    private auth: Auth,
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router
  ) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user?.uid;
      }
    });

    // SHOW BLOG DATA IF IT IS EDIT BLOG
    if (this.blog) {
      // this.isEditMode = true;
      this.postForm.patchValue({
        title: this.blog['title'],
        content: this.blog['content'],
      });
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      // UPDATE BLOG POST
      if (this.blog) {
        this.isLoading = true;
        this.blogPostService
          .updateBlogPost(this.blogPostId, {
            title: this.postForm.value.title,
            content: this.postForm.value.content,
          })
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.notyf.success('Post updated successfully');
              this.router.navigate(['/']);
            },
            error: (err) => {
              this.isLoading = false;
              this.notyf.error('Failed to update post');
              console.error('Login failed', err.message);
            },
          });
      } else {
        // CREATE BLOG POST
        this.isLoading = true;
        this.blogPostService
          .createBlogPost({
            title: this.postForm.value.title,
            content: this.postForm.value.content,
            dateCreated: new Date(),
            likes: 0,
            dislikes: 0,
            authorId: this.userId,
          })
          .then(() => {
            this.isLoading = false;
            this.notyf.success('Post created successfully');
            this.postForm.reset();
            this.router.navigate(['/']);
          })
          .catch((err) => {
            this.isLoading = false;
            this.notyf.error('Failed to create post');
            console.error('Login failed', err.message);
          });
      }
    }
  }
}
