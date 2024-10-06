import { Component, Inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MetaService } from '../../services/meta-service/meta.service';
import { AnalyticsService } from '../../services/analytics-service/analytics.service';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [NavbarComponent, BlogFormComponent, AsyncPipe],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.sass',
})
export class EditBlogComponent {
  blogPost$: Observable<DocumentData | undefined>;
  blogPostId!: string;
  constructor(
    private blogPostsService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf,
    private metaService: MetaService,
    private analyticsService: AnalyticsService
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
    // Log analytics
    this.analyticsService.logPageView('Edit Blog Page');

    // set meta tags
    this.metaService.updateMeta(
      'Edit Your Blog | Blog Hub - Update and Enhance Your Content',
      'Edit your blog post on Blog Hub. Make updates, add new ideas, and improve your content. Keep your blog fresh and engaging for your readers',
      'edit blog, update blog, Blog Hub edit, modify blog post, blog platform, improve blog content, blogging community'
    );
  }
}
