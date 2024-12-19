import { Component, Input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SapristiFormModel } from './sapristi-form.model';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-sapristi-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './sapristi-form.component.html',
  styleUrl: './sapristi-form.component.scss'
})
export class SapristiFormComponent {

  @Input() form!: FormGroup<SapristiFormModel>;
}
