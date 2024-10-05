import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';
import { MetaService } from '../../services/meta-service/meta.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, BlogListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  posts$!: Observable<unknown[]>;

  constructor(
    private blogPostsService: BlogPostService,
    private authService: AuthService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.posts$ = this.blogPostsService.getBlogPosts();
    this.posts$.subscribe((posts) => console.log('posts:', posts));

    // set meta tags
    this.metaService.updateMeta(
      'Home | Blog Hub - Access Your Account',
      'Home to Blog Hub and access your personal dashboard, write blogs, and connect with Fellow writers and readers. Dont have an account? Sign up today!',
      'Blog Hub home, home to account, access blog hub, blogging platform home, writers home, readers home, blog hub sign up'
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
