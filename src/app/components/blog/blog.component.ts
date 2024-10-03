import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { DocumentData } from '@angular/fire/firestore';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ProfileComponent, TruncatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.sass',
})
export class BlogComponent {
  @Input() blog!: DocumentData;

  ngOnInit() {
    console.log('Blog: ', this.blog);
  }
}
