import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";

export const authGuard: CanActivateFn = () => {
  if (inject(AuthService).isLoggedIn) {
    return true;
  }

  inject(Router).navigate(['/auth/login']);
  return false;
}


export const noAuthGuard: CanActivateFn = () => {
  if (!inject(AuthService).isLoggedIn) {
    return true;
  }

  inject(Router).navigate(['/posts']);
  return false;
}
