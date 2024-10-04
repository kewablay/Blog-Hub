import { Component, Inject, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ProfileComponent } from '../profile/profile.component';
import { Auth, user } from '@angular/fire/auth';
import { combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../services/comments-service/comments.service';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ProfileComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass',
})
export class CommentComponent {
  @Input() comment!: DocumentData;
  isCommentAuthor: boolean = false;

  constructor(
    private auth: Auth,
    private commentsService: CommentsService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    user(this.auth).subscribe((user) => {
      if (user) {
        this.isCommentAuthor = user.uid === this.comment['authorId'];
      }
    });
  }

  onDelete() {
    this.commentsService.deleteComment(this.comment['id']).subscribe({
      next: () => {
        this.notyf.success('Comment deleted successfully');
      },
      error: () => {
        this.notyf.error('Failed to delete comment');
      },
    });
  }
}
