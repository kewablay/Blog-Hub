import { Component } from '@angular/core';
import { BlogComponent } from "../blog/blog.component";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [BlogComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.sass'
})
export class BlogListComponent {

}
