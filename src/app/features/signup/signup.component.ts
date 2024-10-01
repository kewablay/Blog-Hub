import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signUpForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );
  // signUpForm = new FormGroup({
  //   userName: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   confirmPassword: new FormControl('', [Validators.required]),
  // }, );

  // Custom validator to check if passwords match
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  TestSubmit() {
    console.log('About to signup');
    this.authService.signUp('kewablay@gmail.com', 'deadpool', 'password123');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, password, username } = this.signUpForm.value;
      if (email && password && username) {
        this.authService
          .signUp(email, username, password)
          .then(() => {
            this.router.navigate(['/login']);
          })
          .catch((err) =>
            console.log('error occured while logging in', err.message)
          );
        console.log(this.signUpForm.value);
      }
    }
  }
}
