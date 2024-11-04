import { Component, Input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectElement } from '../../models/select-element.model';
import { EmitorStatus } from '../../models/enum/emitor-status.enum';
import { EmitorStatusPipe } from '../../pipes/emitor-status/emitor-status.pipe';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-emitor-status-select-input',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    FormsModule,
    MatOption,
    ReactiveFormsModule,
    MatLabel,
    MatAutocompleteTrigger,
    MatError,
    MatInput
  ],
  templateUrl: './emitor-status-select-input.component.html',
  styleUrl: './emitor-status-select-input.component.scss'
})
export class EmitorStatusSelectInputComponent {

  @Input() valueControl = new FormControl<string | null>(null);
  @Input() required = true;

  emitorStatuses: SelectElement<string>[] = [
    {value: EmitorStatus.COMMENDATAIRE, label: this.emitoStatusPipe.transform(EmitorStatus.COMMENDATAIRE)},
    {value: EmitorStatus.STUDENT, label: this.emitoStatusPipe.transform(EmitorStatus.STUDENT)},
  ];

  constructor(private emitoStatusPipe: EmitorStatusPipe) {
  }
}
