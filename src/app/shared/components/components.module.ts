import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
  declarations: [
    HeaderComponent,
    AutocompleteInputComponent,
  ],
  exports: [
    HeaderComponent,
    AutocompleteInputComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    NgOptimizedImage
  ]
})
export class ComponentsModule { }
