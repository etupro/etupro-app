import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectElement } from '../../models/select-element.model';
import { DepartmentsService } from '../../services/departments.service';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-autocomplete-input',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
    MatError,
    NgIf
  ],
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss'
})
export class AutocompleteInputComponent implements OnChanges {

  @Input() valueControl = new FormControl<number | null>(null);
  @Input() selectElements: SelectElement<number>[] = [];
  @Input() label = 'Valeur';
  @Input() required = false;
  @Input() readonly = false;

  constructor(private departmentsService: DepartmentsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectElements']) {
      this.valueControl.setValue(this.valueControl.value, {emitEvent: false});
    }
  }

  displayFn() {
    return (value: number): string => {
      return this.selectElements.find(e => e.value === value)?.label ?? '';
    };
  }
}
