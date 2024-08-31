import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { first, map } from "rxjs";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).userProfile$.pipe(
    first(),
    map(userProfile => {
      if (userProfile) return true;
      else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};


export const noAuthGuard: CanActivateFn = () => {
  return inject(AuthService).userProfile$.pipe(
    first(),
    map(userProfile => {
      return !userProfile;
    })
  );
};
