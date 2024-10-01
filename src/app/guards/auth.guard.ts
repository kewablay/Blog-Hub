import { inject } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  const router = inject(Router);

  if (auth.currentUser) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

  // const isLoggedIn = false;
  // if (isLoggedIn) {
  //   return true;
  // } else {
  //   router.navigate(['/login']);
  //   return false;
  // }
};
