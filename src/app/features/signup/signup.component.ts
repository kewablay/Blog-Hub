import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { MetaService } from '../../services/meta-service/meta.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  signUpLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.metaService.updateMeta(
      'Sign Up | Blog Hub - Join Our Community of Writers & Readers',
      'Create your free account on Blog Hub, where writers share stories and readers discover new perspectives. Sign up today and start your blogging journey!',
      'Blog Hub sign up, create account, blogging platform, join Blog Hub, writers community, readers community, blogging platform registration'
    );
  }

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

  // Custom validator to check if passwords match
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onGoogleSignup() {
    this.authService
      .googleSignIn()
      .then(() => {
        this.notyf.success('Account created successful.');
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.notyf.error('Error occured while logging in');
      });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.signUpLoading = true;

      const { email, password, username } = this.signUpForm.value;
      if (email && password && username) {
        this.authService
          .signUp(email, username, password)
          .then(() => {
            this.signUpLoading = false;
            this.notyf.success('Account created successful.');
            this.router.navigate(['/login']);
          })
          .catch((err) => {
            this.signUpLoading = false;
            this.notyf.error('Error occured while signing up.');
            console.log('error occured while logging in', err.message);
          });
        console.log(this.signUpForm.value);
      }
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
