import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // AUTH ROUTES
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
      },
    ],
  },

  // MAIN ROUTES
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'blog/new',
        pathMatch: 'full',
        canActivate: [authGuard],
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
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/edit-blog/edit-blog.component').then(
            (m) => m.EditBlogComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
