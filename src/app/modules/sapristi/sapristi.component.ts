import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepContent, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, StepperOrientation } from '@angular/material/stepper';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileFormModel } from '../../shared/components/user-informations-form/models/user-profile-form.model';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ProfileFormComponent } from '../../shared/components/user-informations-form/profile-form/profile-form.component';
import { StudentInformationsFormModel } from '../../shared/components/user-informations-form/models/student-informations-form.model';
import { StudentFormComponent } from '../../shared/components/user-informations-form/student-form/student-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserProfile } from '../../shared/models/user-profile.model';
import { StorageService } from '../../shared/services/storage.service';
import { UserProfileService } from '../../shared/services/user-profile.service';
import { StudentInformation } from '../../shared/models/student-information';
import { StudentInformationsService } from '../../shared/services/student-informations.service';
import { SapristiFormComponent } from '../../shared/components/sapristi-form/sapristi-form.component';
import { SapristiFormModel } from '../../shared/components/sapristi-form/sapristi-form.model';

@Component({
  selector: 'app-sapristi',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    MatButton,
    MatStepperNext,
    FormsModule,
    ReactiveFormsModule,
    MatStepperPrevious,
    MatStepLabel,
    MatStepContent,
    MatCardContent,
    MatCard,
    ProfileFormComponent,
    StudentFormComponent,
    AsyncPipe,
    SapristiFormComponent
  ],
  templateUrl: './sapristi.component.html',
  styleUrl: './sapristi.component.scss'
})
export class SapristiComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;

  profileForm = new FormGroup<UserProfileFormModel>({
    display_name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(5)]
    }),
    description: new FormControl<string | null>(null),
    phone_number: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\d{10}/)]
    }),
    picture_path: new FormControl<File | null>(null),
  }, {
    updateOn: 'blur',
  });

  studentForm = new FormGroup<StudentInformationsFormModel>({
    study_institute: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    study_level: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    study_label: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    skills: new FormControl<string[]>([], {nonNullable: true, validators: [Validators.required]}),
  }, {
    updateOn: 'blur'
  });

  sapristiForm = new FormGroup<SapristiFormModel>({
    external_activity: new FormControl<number>(3, {nonNullable: true, validators: [Validators.required]}),
    cleaning_help: new FormControl<boolean>(false, {nonNullable: true, validators: [Validators.required]}),
    banned_places: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    banned_illnesses: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  }, {
    updateOn: 'blur'
  });

  stepperOrientation: Observable<StepperOrientation>;
  userProfile: UserProfile | null = null;

  watcher = new Subscription();

  constructor(private authService: AuthService,
              private userProfileService: UserProfileService,
              private studentInformationsService: StudentInformationsService,
              private storageService: StorageService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(
        map(({matches}) => (matches ? 'horizontal' : 'vertical'))
      );

    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  async saveUserProfile() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid && this.userProfile) {

      let picturePath: string | undefined;
      if (this.profileForm.value.picture_path) {
        picturePath = await this.storageService.uploadToBucket(StorageService.BucketName.PROFILE_PICTURE, this.profileForm.value.picture_path);
      }

      const userProfileUpdate: UserProfile.Update = {
        ...this.profileForm.value,
        picture_path: picturePath ?? this.userProfile.picture_path
      };

      await this.userProfileService.update(this.userProfile.id, userProfileUpdate);
      await this.authService.updateUserProfile();

      this.stepper.next();
    }
  }

  async saveStudentInformation() {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid && this.userProfile) {

      if (this.userProfile.studentInformation) {
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
        this.userProfileService.update(this.userProfile.id, {student_information_id: newStudentInformation.id});
      }

      await this.authService.updateUserProfile();

      this.stepper.next();
    }
  }

  async saveSapristi() {
    console.log(this.sapristiForm.value);
  }
}
