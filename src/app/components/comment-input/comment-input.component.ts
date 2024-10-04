import { Component, Inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments-service/comments.service';
import { Observable } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from '../../utils/notyf.token';

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
  commentLoading: boolean = false;

  @Input() postId!: string | null;
  comment = new FormControl('', [Validators.required]);

  constructor(
    private commentService: CommentsService,
    private auth: Auth,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  postComment() {
    if (this.comment.valid) {
      this.commentLoading = true;
      console.log('comment :', this.comment.value, this.postId, this.userId);
      this.commentService
        .createComment(this.comment.value, this.postId, this.userId)
        .then(() => {
          this.commentLoading = false;
          this.comment.reset();
          this.notyf.success('Comment posted successfully');
        })
        .catch((err) => {
          this.commentLoading = false;
          this.comment.reset();
          this.notyf.error('Failed to post comment');
        });
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
