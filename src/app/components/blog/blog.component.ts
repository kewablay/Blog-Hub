import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.sass',
})
export class BlogComponent {
  @Input() blog!: DocumentData;

  ngOnInit() {
    console.log('Blog: ', this.blog);
  }
}
