import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatBadge } from '@angular/material/badge';
import { UserProfileFormModel } from './models/user-profile-form.model';
import { StudentInformationsFormModel } from './models/student-informations-form.model';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { MatButton } from '@angular/material/button';
import { UserProfile } from '../../models/user-profile.model';
import { StorageService } from '../../services/storage.service';
import { StudentInformation } from '../../models/student-information';
import { UserProfileService } from '../../services/user-profile.service';
import { AuthService } from '../../services/auth.service';
import { StudentInformationsService } from '../../services/student-informations.service';

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

  @Input() userProfile: UserProfile | null = null;
  @Output() saved = new EventEmitter();

  profileForm = new FormGroup<UserProfileFormModel>({
    firstname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl<string | null>(null),
    phone_number: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\d{10}/)]
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

  constructor(private storageService: StorageService,
              private userProfileService: UserProfileService,
              private studentInformationsService: StudentInformationsService,
              private authService: AuthService) {
  }

  getErrorCount(form: FormGroup): number {
    let errors = 0;
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        errors++;
      }
    });
    return errors;
  }

  async submitForms(): Promise<void> {
    this.profileForm.markAllAsTouched();
    this.studentForm.markAllAsTouched();
    if (this.profileForm.valid && this.studentForm.valid) {
      await this.saveUserProfile();
      await this.saveStudentInformation();
    }

    this.saved.emit();
  }

  async saveUserProfile() {
    let picturePath: string | undefined;
    if (this.profileForm.value.picture_path) {
      picturePath = await this.storageService.uploadToBucket(StorageService.BucketName.PROFILE_PICTURE, this.profileForm.value.picture_path);
    }

    const userProfileUpdate: UserProfile.Update = {
      ...this.profileForm.value,
      picture_path: picturePath ?? this.userProfile?.picture_path ?? null
    };

    await this.userProfileService.update(this.userProfile!.id, userProfileUpdate);
    await this.authService.updateUserProfile();
  }

  async saveStudentInformation() {
    if (this.userProfile?.studentInformation) {
      const studentInformationUpdate: StudentInformation.Update = {
        ...this.studentForm.value,
      };

      await this.studentInformationsService.update(this.userProfile.studentInformation.id, studentInformationUpdate);
    } else {
      const studentInformationInsert: StudentInformation.Insert = {
        study_institute: this.studentForm.value.study_institute!,
        study_level: this.studentForm.value.study_level!,
        study_label: this.studentForm.value.study_label!,
        skills: this.studentForm.value.skills!,
      };

      const newStudentInformation = await this.studentInformationsService.create(studentInformationInsert);
      this.userProfileService.update(this.userProfile!.id, {student_information_id: newStudentInformation.id});
    }

    await this.authService.updateUserProfile();
  }
}
