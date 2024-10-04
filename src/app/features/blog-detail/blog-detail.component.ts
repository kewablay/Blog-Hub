import { Component, Inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CommentsListComponent } from '../../components/comments-list/comments-list.component';
import { Auth, user, User } from '@angular/fire/auth';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    ProfileComponent,
    AsyncPipe,
    CommentsListComponent,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.sass',
})
export class BlogDetailComponent {
  blogPost$: Observable<DocumentData | undefined>;
  blogPostId!: string;
  authorId!: string;
  user$!: Observable<User | null>;
  currentUserId!: string | undefined;

  isLoggedIn: boolean | undefined;

  constructor(
    private blogPostsService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.blogPost$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const blogId = params.get('id');
        this.blogPostId = blogId as string;
        return this.blogPostsService.getBlogById(blogId as string);
      })
    );
  }

  ngOnInit() {
    combineLatest([user(this.auth), this.blogPost$]).subscribe(
      ([currentUser, blogPost]) => {
        if (currentUser && blogPost) {
          const currentUserId = currentUser.uid;
          const authorId = blogPost['authorId'];

          console.log('Current User ID: ', currentUserId);
          console.log('Author ID: ', authorId);

          // Check if the current user is the author
          this.isLoggedIn = currentUserId === authorId;
        } else {
          // If either user or blogPost is null/undefined
          this.isLoggedIn = false;
        }
      }
    );
  }

  onDelete() {
    this.blogPostsService.deleteBlogPost(this.blogPostId).subscribe({
      next: () => {
        this.notyf.success('Blog post deleted successfully');
        this.router.navigate(['/']);
      },

      error: (err) => {
        this.notyf.error('Failed to delete blog post');
        console.error('Failed to delete blog post', err.message);
      },
    });
  }
}
