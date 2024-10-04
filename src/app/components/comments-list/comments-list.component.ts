import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommentsService } from '../../services/comments-service/comments.service';
import { AsyncPipe } from '@angular/common';
import { CommentComponent } from "../comment/comment.component";
import { CommentInputComponent } from "../comment-input/comment-input.component";

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [AsyncPipe, CommentComponent, CommentInputComponent],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.sass',
})
export class CommentsListComponent {
  comments$!: Observable<DocumentData[]>;
  @Input() postId!: string | null;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.comments$ = this.commentService.getCommentsByPostId(this.postId);
    this.comments$.subscribe({
      next: (comments) => console.log(comments),
      error: (err) => console.error(err),
    });
  }
}
