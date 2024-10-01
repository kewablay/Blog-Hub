import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  TestSubmit() {
    console.log('About to signup');
    this.authService.signUp('kewablay@gmail.com', 'deadpool', 'password123');
  }
}
