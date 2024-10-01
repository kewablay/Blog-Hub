import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { getAuth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  TestSubmit() {
    console.log('About to signup');
    this.authService.login('kewablay@gmail.com', 'password123');
  }

  auth = getAuth();
  ngOnInit() {
    if (this.auth.currentUser) {
      console.log('there is a user');
    } else {
      console.log('error');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.authService
          .login(email, password)
          .then(() => {
            this.router.navigate(['']);
          })
          .catch((err) => console.log('error occured while logging in', err.message));
          console.log(this.loginForm.value);
      }

    }
  }
}
