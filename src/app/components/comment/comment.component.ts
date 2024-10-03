import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass',
})
export class CommentComponent {
  @Input() comment!: DocumentData;

  
}
