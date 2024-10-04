import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { from, Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
})
export class ProfileComponent {
  @Input() authorId!: string;
  user$!: Observable<DocumentData | undefined>;

  constructor(private userService: UserService) {}


  ngOnInit() {
    console.log('authorId:', this.authorId);
    this.user$ = from(this.userService.getUserById(this.authorId));
    this.user$.subscribe((user) => console.log('user:', user));
  }
}
