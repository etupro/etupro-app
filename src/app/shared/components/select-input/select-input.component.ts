import { Component, Input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectElement } from '../../models/select-element.model';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatError,
    MatInput
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent<T> {

  @Input() valueControl = new FormControl<T | null>(null);
  @Input() readonly = false;
  @Input() required = true;
  @Input() label = '';
  @Input() values: SelectElement<T>[] = [];

  getReadOnlyValueLabel(): string {
    return this.values.find(value => value.value === this.valueControl.value)?.label ?? '';
  }
}
