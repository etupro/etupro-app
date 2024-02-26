import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {MatCardModule} from "@angular/material/card";
import {LogoutComponent} from "./logout/logout.component";


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
