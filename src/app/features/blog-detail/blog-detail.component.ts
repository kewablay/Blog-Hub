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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MetaService } from '../../services/meta-service/meta.service';

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
  likes!: number;
  dislikes!: number;

  isLoggedIn: boolean | undefined;
  safeContent!: SafeHtml;

  constructor(
    private blogPostsService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    @Inject(NOTYF) private notyf: Notyf,
    private sanitizer: DomSanitizer,
    private metaService: MetaService
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

    // Sanitize blog content html
    this.blogPost$.subscribe((blogPost) => {
      if (blogPost) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
          blogPost['content']
        );

        // set likes
        this.likes = blogPost['likes'];

        // set dislikes
        this.dislikes = blogPost['dislikes'];
        // set meta tags
        this.metaService.updateMeta(
          blogPost['title'],
          (blogPost['content'] as string).substring(0, 150),
          'Angular, Firebase, Blog'
        );
      }
    });
  }

  onLike() {
    this.blogPost$.subscribe((blogPost) => {
      if (blogPost) {
        this.likes++;
        this.blogPostsService
          .updateBlogPost(this.blogPostId, {
            likes: blogPost['likes'] + 1,
          })
          .subscribe({
            next: () => {
              // this.likes++;
            },
            error: (err) => {
              this.likes--;
              this.notyf.error('Failed to like blog post');
              console.error('Failed to like blog post', err.message);
            },
          });
      }
    });
  }

  onDislike() {
    this.blogPost$.subscribe((blogPost) => {
      if (blogPost) {
        this.dislikes++;
        this.blogPostsService
          .updateBlogPost(this.blogPostId, {
            dislikes: blogPost['dislikes'] + 1,
          })
          .subscribe({
            next: () => {
              // this.dislikes++;
            },
            error: (err) => {
              this.dislikes--;
              this.notyf.error('Failed to dislike blog post');
              console.error('Failed to dislike blog post', err.message);
            },
          });
      }
    });
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

  private addStructuredData(blogPost: DocumentData) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
      headline: blogPost['title'],
      author: {
        '@type': 'Person',
        name: blogPost['authorName'],
      },
      dateCreated: blogPost['dateCreated'], 
      publisher: {
        '@type': 'Blog Hub',
        name: 'Blog Hub',
      },
      description: blogPost['content'].substring(0, 150),
    };

    const scriptTag =
      this.metaService.createStructuredDataScript(structuredData);
    document.head.appendChild(scriptTag);
  }
}
