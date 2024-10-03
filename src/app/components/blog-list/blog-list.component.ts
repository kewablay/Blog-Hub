import { Component } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { Observable } from 'rxjs';
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
  constructor(private blogPostsService: BlogPostService) {}

  ngOnInit() {
    this.blogs$ = this.blogPostsService.getBlogPosts();
  }
}
