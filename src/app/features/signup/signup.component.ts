import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  constructor(private authService: AuthServiceService) {}

  TestSubmit() {
    console.log("About to signup")
    this.authService.signUp('kewablay@gmail.com', 'deadpool', 'password123');
  }
}
