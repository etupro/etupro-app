import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectElement } from '../../../models/select-element.model';
import { Role } from '../../../models/enum/role.enum';
import { SelectInputComponent } from '../select-input.component';
import { RolePipe } from '../../../pipes/role/role.pipe';

@Component({
  selector: 'app-user-role-select-input',
  standalone: true,
  imports: [
    SelectInputComponent
  ],
  templateUrl: './user-role-select-input.component.html',
  styleUrl: './user-role-select-input.component.scss'
})
export class UserRoleSelectInputComponent {

  @Input() valueControl = new FormControl<string | null>(null);
  @Input() readonly = false;
  @Input() required = true;

  emitorStatuses: SelectElement<Role>[] = [
    {value: 'USER', label: this.rolePipe.transform('USER')},
    {value: 'ADMIN', label: this.rolePipe.transform('ADMIN')},
    {value: 'SUPER_ADMIN', label: this.rolePipe.transform('SUPER_ADMIN')},
  ];

  constructor(private rolePipe: RolePipe) {
  }

}
