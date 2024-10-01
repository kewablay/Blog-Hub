import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    canActivate: [authGuard],
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./features/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
