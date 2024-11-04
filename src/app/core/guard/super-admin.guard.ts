import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { first, map } from 'rxjs';

export const superAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).userProfile$.pipe(
    first(),
    map(userProfile => {
      if (userProfile?.role === 'SUPER_ADMIN') return true;
      else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
