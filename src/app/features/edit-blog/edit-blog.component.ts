import { Component, Inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BlogFormComponent } from "../../components/blog-form/blog-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [NavbarComponent, BlogFormComponent, AsyncPipe],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.sass'
})
export class EditBlogComponent {
  blogPost$: Observable<DocumentData | undefined>;
  blogPostId!: string;
  constructor(
    private blogPostsService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf,
  
  ) {
    this.blogPost$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const blogId = params.get('id');
        this.blogPostId = blogId as string;
        return this.blogPostsService.getBlogById(blogId as string);
      })
    );
  }

}
