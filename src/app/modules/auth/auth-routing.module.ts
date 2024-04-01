import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {RegisterComponent} from "./register/register.component";

const redirectLoggedInToHome = () => redirectLoggedInTo(['/posts']);
const redirectLogoutToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'logout',
    component: LogoutComponent,
    ...canActivate(redirectLogoutToLogin)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
