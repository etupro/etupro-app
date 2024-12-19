import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { UserInformationsFormComponent } from '../../../../shared/components/user-informations-form/user-informations-form.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    UserInformationsFormComponent
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

}
