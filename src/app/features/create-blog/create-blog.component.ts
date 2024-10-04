import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BlogFormComponent } from "../../components/blog-form/blog-form.component";

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [NavbarComponent, BlogFormComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.sass'
})
export class CreateBlogComponent {

}
