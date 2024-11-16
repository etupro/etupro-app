import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMarkdown } from 'ngx-markdown';
import { EmitorStatusPipe } from './shared/pipes/emitor-status/emitor-status.pipe';
import { RolePipe } from './shared/pipes/role/role.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    CoreModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideMarkdown(),
    EmitorStatusPipe,
    RolePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
