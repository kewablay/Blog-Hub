import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments-service/comments.service';
import { Observable } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.sass',
})
export class CommentInputComponent {
  user$!: Observable<User | null>;
  userId: string | undefined = undefined;
  @Input() postId!: string | null;
  comment = new FormControl('', [Validators.required]);

  constructor(private commentService: CommentsService, private auth: Auth) {}

  postComment() {
    if (this.comment.valid) {
      console.log("comment :", this.comment.value, this.postId, this.userId);
      this.commentService.createComment(
        this.comment.value,
        this.postId,
        this.userId
      );
    }
  }

  ngOnInit() {
    this.user$ = user(this.auth);

    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
}
