import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SapristiComponent } from './sapristi.component';


const routes: Routes = [
  {
    path: '',
    component: SapristiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapristiRoutingModule {
}
