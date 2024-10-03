import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.sass',
})
export class BlogFormComponent {
  user$!: Observable<User | null>;
  userId: string | undefined;

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
  }

  onSubmit() {
    if (this.postForm.valid) {
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
          this.notyf.success('Post created successfully');
          this.postForm.reset();
          this.router.navigate(['/']);
        })
        .catch((err) => {
          this.notyf.error('Failed to create post');
          console.error('Login failed', err.message);
        });
    }
  }
}
