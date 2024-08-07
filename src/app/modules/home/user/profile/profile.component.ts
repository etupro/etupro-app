import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../../shared/services/auth.service";
import { UserProfile } from "../../../../shared/models/user-profile.model";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";
import { SubHeaderComponent } from "../../../../shared/components/sub-header/sub-header.component";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { passwordConfirmationValidator } from "../../../../shared/validators/password-confirmation.validator";
import { UserProfileService } from "../../../../shared/services/user-profile.service";
import { SnackbarService } from "../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton,
    MatToolbar,
    SubHeaderComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile | null = null;

  profileForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  }, {
    updateOn: "submit",
    validators: [passwordConfirmationValidator()]
  })

  readonly = true;

  constructor(private authService: AuthService,
              private userProfileService: UserProfileService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.readonly = true;

    this.authService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
      this.resetForm();
    })
  }

  resetForm() {
    this.profileForm.patchValue({
      displayName: this.userProfile?.display_name,
      email: this.userProfile?.user?.email,
    }, {
      emitEvent: true
    });
  }

  setFormEditMode() {
    this.readonly = false;
  }

  setFormReadOnly() {
    this.resetForm();
    this.readonly = true;
  }

  async editProfile() {
    if (!this.profileForm.valid || !this.userProfile) {
      return;
    }

    const displayName = this.profileForm.value.displayName ?? '';
    const email = this.profileForm.value.email ?? '';

    await this.authService.updateUserEmail(email);
    await this.userProfileService.update(this.userProfile.id, {display_name: displayName})
    await this.authService.updateUserProfile();
    this.snackbarService.openSnackBar("Sauvegardé !")
    this.setFormReadOnly();
  }
}
