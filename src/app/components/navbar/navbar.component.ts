import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { Auth, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProfileComponent, AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  user$!: Observable<User | null>;

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.user$ = user(this.auth);
  }
}
