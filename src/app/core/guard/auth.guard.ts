import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { first, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).userProfile$.pipe(
    first(),
    map(userProfile => {
      if (userProfile) return true;
      else {
        const currentUrl = router.url;
        router.navigate(['/', 'auth', 'login'], {queryParams: {redirectTo: currentUrl}});
        return false;
      }
    })
  );
};


export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).userProfile$.pipe(
    first(),
    map(userProfile => {
      if (userProfile) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
