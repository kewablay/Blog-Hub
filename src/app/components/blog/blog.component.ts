import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { DocumentData } from '@angular/fire/firestore';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { DatePipe } from '@angular/common';
import { FirestoreTimestampPipe } from '../../pipes/firestore-timestamp.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    ProfileComponent,
    TruncatePipe,
    DatePipe,
    FirestoreTimestampPipe,
    SkeletonModule,
    RouterLink,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.sass',
})
export class BlogComponent {
  @Input() blog!: DocumentData;

  ngOnInit() {
    console.log('Blog: ', this.blog);
  }
}
