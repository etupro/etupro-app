import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SapristiComponent } from './sapristi.component';
import { authGuard } from '../../core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SapristiComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapristiRoutingModule {
}
