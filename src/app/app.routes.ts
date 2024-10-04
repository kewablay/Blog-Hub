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
    path: 'blog/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/create-blog/create-blog.component').then(
        (m) => m.CreateBlogComponent
      ),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./features/blog-detail/blog-detail.component').then(
        (m) => m.BlogDetailComponent
      ),
  },
  {
    path: 'blog/:id/edit',
    loadComponent: () =>
      import('./features/edit-blog/edit-blog.component').then(
        (m) => m.EditBlogComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
