import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  posts$!: Observable<unknown[]>;

  constructor(
    private blogPostsService: BlogPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.posts$ = this.blogPostsService.getBlogPosts();
    this.posts$.subscribe((posts) => console.log('posts:', posts));
  }

  onLogout() {
    this.authService.logout();
  }
}
