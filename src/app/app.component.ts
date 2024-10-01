import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogPostService } from './services/blog-post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  posts$!: Observable<unknown[]>;

  constructor(private blogPostsService: BlogPostService) {}

  ngOnInit() {
    this.posts$ = this.blogPostsService.getBlogPosts();
    this.posts$.subscribe((posts) => console.log('posts:', posts));
  }
}
