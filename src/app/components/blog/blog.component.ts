import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { DocumentData } from '@angular/fire/firestore';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ProfileComponent, TruncatePipe, DatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.sass',
})
export class BlogComponent {
  @Input() blog!: DocumentData;

  ngOnInit() {
    console.log('Blog: ', this.blog);
  }
}
