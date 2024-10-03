import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.sass'
})
export class BlogComponent {

}
