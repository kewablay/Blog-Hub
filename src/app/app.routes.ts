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
    // canActivate: [authGuard],
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./features/blog-detail/blog-detail.component').then(
        (m) => m.BlogDetailComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
