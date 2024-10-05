import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authState().pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['auth/login']);
        return false;
      }
    })
  );
};
