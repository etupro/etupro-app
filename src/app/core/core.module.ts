import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from "./errors/global-error-handler";

@NgModule({
  declarations: [],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
