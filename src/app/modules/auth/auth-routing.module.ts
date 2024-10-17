import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard, noAuthGuard } from '../../core/guard/auth.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'password-change',
    component: PasswordChangeComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
