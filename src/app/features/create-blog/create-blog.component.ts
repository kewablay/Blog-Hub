import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { MetaService } from '../../services/meta-service/meta.service';
import { AnalyticsService } from '../../services/analytics-service/analytics.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [NavbarComponent, BlogFormComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.sass',
})
export class CreateBlogComponent {
  constructor(
    private metaService: MetaService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    // Log analytics
    this.analyticsService.logPageView('Create Blog Page');
    
    // set meta tags
    this.metaService.updateMeta(
      'Create a New Blog | Blog Hub - Share Your Stories with the World',
      'Start writing your next blog on Blog Hub. Share your thoughts, ideas, and stories with our community of readers. Create a new blog today!',
      'create new blog, write blog, start blogging, Blog Hub create, blogging platform, share stories, writers, publish blog'
    );
  }
}
