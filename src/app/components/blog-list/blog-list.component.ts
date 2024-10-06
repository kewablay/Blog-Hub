import { Component } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { catchError, map, Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [BlogComponent, AsyncPipe, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.sass',
})
export class BlogListComponent {
  blogs$!: Observable<DocumentData[]>;
  blogLoading: boolean = true;
  mockBlogsForLoading = [...Array(3)];

  constructor(private blogPostsService: BlogPostService) {}

  ngOnInit() {
    this.blogs$ = this.blogPostsService.getBlogPosts();

    this.blogs$.subscribe({
      next: (blogs) => {
        this.blogLoading = false;
      },
      error: (err) => {
        this.blogLoading = false;
        console.error('Failed to load blogs', err.message);
      },
    });
  }
}
