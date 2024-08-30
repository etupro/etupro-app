import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/services/auth.service";
import { SnackbarService } from "../../../../shared/services/snackbar.service";
import { OrganizationService } from "../../../../shared/services/organization.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { passwordConfirmationValidator } from "../../../../shared/validators/password-confirmation.validator";
import { Organization } from "../../../../shared/models/organiazation.model";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { SinglePictureInputComponent } from "../../../../shared/components/single-picture-input/single-picture-input.component";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { StorageService } from "../../../../shared/services/storage.service";
import { UserProfile } from "../../../../shared/models/user-profile.model";
import { UserProfileService } from "../../../../shared/services/user-profile.service";
import { SubHeaderComponent } from "../../../../shared/components/sub-header/sub-header.component";

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatCardActions,
    MatCardTitle,
    SinglePictureInputComponent,
    MatError,
    MatLabel,
    MatButton,
    MatInput,
    SubHeaderComponent
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {

  readonly = true;
  userProfile: UserProfile | null = null;
  organization: Organization | null = null;
  pictureUrl: string | undefined;

  organizationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    picture: new FormControl<File | undefined>(undefined),
  }, {
    updateOn: "submit",
    validators: [passwordConfirmationValidator()]
  })

  constructor(private authService: AuthService,
              private organizationService: OrganizationService,
              private userProfileService: UserProfileService,
              private storageService: StorageService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.readonly = true;

    this.authService.userProfile$.subscribe(async userProfile => {
      this.userProfile = userProfile;
      await this.updateOrganization();
    });
  }

  async updateOrganization() {
    console.log(this.userProfile);
    if (this.userProfile?.organization_id) {
      this.organization = await this.organizationService.getById(this.userProfile.organization_id)
      console.log(this.organization);
      this.resetForm();

      if (this.organization?.picture) {
        this.pictureUrl = await this.storageService.getSignedUrl(StorageService.BucketName.ORGANIZATION_IMAGES, this.organization.picture);
        console.log(this.pictureUrl);
      }
    }
  }

  resetForm() {
    this.organizationForm.patchValue({
      name: this.organization?.name,
      picture: undefined,
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

  handleCoverUpload(coverUrl: File) {
    this.organizationForm.controls.picture.setValue(coverUrl);
  }

  async editOrganization() {
    if (!this.organizationForm.valid) {
      return;
    }

    const name = this.organizationForm.value.name ?? '';
    const picture = this.organizationForm.value.picture;

    let uploadPath: string | undefined;

    if (picture && typeof picture !== "string") {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.ORGANIZATION_IMAGES, picture);
    }

    let newOrganization: Organization | null = null;
    if (this.organization) {
      newOrganization = await this.organizationService.update(this.organization.id, {
        name,
        picture: uploadPath
      });
    } else {
      newOrganization = await this.organizationService.create({
        name,
        picture: uploadPath
      })
    }

    if (this.userProfile) {
      await this.userProfileService.update(this.userProfile.id, {organization_id: newOrganization?.id ?? null})
    }

    this.snackbarService.openSnackBar("Sauvegardé !")
    await this.updateOrganization();
    this.setFormReadOnly();
  }

}
