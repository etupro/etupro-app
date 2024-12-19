import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatBadge } from '@angular/material/badge';
import { UserProfileFormModel } from './models/user-profile-form.model';
import { StudentInformationsFormModel } from './models/student-informations-form.model';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-informations-form',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatBadge,
    MatTabLabel,
    ReactiveFormsModule,
    ProfileFormComponent,
    StudentFormComponent,
    MatButton
  ],
  templateUrl: './user-informations-form.component.html',
  styleUrl: './user-informations-form.component.scss'
})
export class UserInformationsFormComponent {

  profileForm = new FormGroup<UserProfileFormModel>({
    display_name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(5)]
    }),
    description: new FormControl<string | null>(null),
    phone_number: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]
    }),
    picture_path: new FormControl<File | null>(null),
  }, {
    updateOn: 'submit'
  });
  studentForm = new FormGroup<StudentInformationsFormModel>({
    study_institute: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    study_level: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    study_label: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    skills: new FormControl<string[]>([], {nonNullable: true, validators: [Validators.required]}),
  }, {
    updateOn: 'submit'
  });

  getErrorCount(form: FormGroup): number {
    let errors = 0;
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        errors++;
      }
    });
    return errors;
  }

  submitForms(): void {
    this.profileForm.markAllAsTouched();
    this.studentForm.markAllAsTouched();
    if (this.profileForm.valid && this.studentForm.valid) {
      const profileData = this.profileForm.value;
      const studentData = this.studentForm.value;
    } else {
      if (this.profileForm.invalid) {
        console.error('Profile Form Errors:', this.profileForm.errors);
      }
      if (this.studentForm.invalid) {
        console.error('Student Form Errors:', this.studentForm.errors);
      }
    }
  }
}
