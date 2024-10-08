import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { getAuth } from '@angular/fire/auth';
import {
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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  loginLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf,
    private metaService: MetaService
  ) {}

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

    // set meta tags
    this.metaService.updateMeta(
      'Login | Blog Hub - Access Your Account',
      'Login to Blog Hub and access your personal dashboard, write blogs, and connect with fellow writers and readers. Dont have an account? Sign up today!',
      'Blog Hub login, login to account, access blog hub, blogging platform login, writers login, readers login, blog hub sign in'
    );
  }

  onGoogleLogin() {
    this.authService
      .googleSignIn()
      .then(() => {
        this.notyf.success('Authentication successful.');
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.notyf.error('Authentication error, try again.');
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.authService
          .login(email, password)
          .then(() => {
            this.loginLoading = false;
            this.notyf.success('Login successful.');
            this.router.navigate(['']);
          })
          .catch(
            (err) => {
              this.loginLoading = false;
              this.notyf.error('Error occured while logging in');
            }
            // console.log('error occured while logging in', err.message)
          );
        console.log(this.loginForm.value);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
