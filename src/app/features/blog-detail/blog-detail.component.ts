import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { CommentsListComponent } from '../../components/comments-list/comments-list.component';
import { Auth, user, User } from '@angular/fire/auth';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    ProfileComponent,
    AsyncPipe,
    CommentsListComponent,
    RouterLink,
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
    private auth: Auth
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
    this.user$ = user(this.auth);

    this.user$.subscribe((user) => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });

    this.blogPost$.subscribe((blogPost) => {
      if (blogPost) {
        this.authorId = blogPost['authorId'];
      }
    });

    if (this.currentUserId === this.authorId) {
      this.isLoggedIn = true;
    }
  }
}
