import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectElement } from '../../models/select-element.model';
import { DepartmentsService } from '../../services/departments.service';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-department-autocomplete-input',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    TitleCasePipe,
    ReactiveFormsModule
  ],
  templateUrl: './department-autocomplete-input.component.html',
  styleUrl: './department-autocomplete-input.component.scss'
})
export class DepartmentAutocompleteInputComponent implements OnInit {

  @Input() valueControl = new FormControl<number | null>(null);

  allDepartments: SelectElement<number>[] = [];

  constructor(private departmentsService: DepartmentsService) {
  }

  ngOnInit() {
    this.departmentsService.getAll().then(departments => {
      this.allDepartments = departments.map(d => {
        return {
          value: d.id,
          label: d.number + ' - ' + d.name
        };
      }) ?? [];
      this.valueControl.setValue(this.valueControl.value, {emitEvent: false});
    });
  }

  displayFn() {
    return (value: number): string => {
      return this.allDepartments.find(e => e.value === value)?.label ?? '';
    };
  }
}
