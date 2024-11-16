import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectElement } from '../../../models/select-element.model';
import { EmitorStatus } from '../../../models/enum/emitor-status.enum';
import { EmitorStatusPipe } from '../../../pipes/emitor-status/emitor-status.pipe';
import { SelectInputComponent } from '../select-input.component';

@Component({
  selector: 'app-emitor-status-select-input',
  standalone: true,
  imports: [
    SelectInputComponent
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
