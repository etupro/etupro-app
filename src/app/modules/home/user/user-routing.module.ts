import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../../../core/guard/auth.guard";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
