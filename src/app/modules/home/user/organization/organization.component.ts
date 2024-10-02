import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../../../../shared/validators/password-confirmation.validator';
import { Organization } from '../../../../shared/models/organiazation.model';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { SinglePictureInputComponent } from '../../../../shared/components/single-picture-input/single-picture-input.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { StorageService } from '../../../../shared/services/storage.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';
import { UserProfileService } from '../../../../shared/services/user-profile.service';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit, OnDestroy {

  readonly = true;
  userProfile: UserProfile | null = null;
  isOwner = false;
  organization: Organization | null = null;
  pictureUrl: string | undefined;

  organizationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    picture: new FormControl<File | undefined>(undefined),
  }, {
    updateOn: "submit",
    validators: [passwordConfirmationValidator()]
  });

  profileId: number | null = null;
  watcher = new Subscription();

  constructor(private authService: AuthService,
              private organizationService: OrganizationService,
              private userProfileService: UserProfileService,
              private storageService: StorageService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.readonly = true;

    this.watcher.add(this.route.params.subscribe(params => {
      this.profileId = params['id'];
      if (this.profileId) {
        this.userProfileService.getById(this.profileId).then(async userProfile => {
          if (userProfile) {
            this.userProfile = userProfile;
            this.isOwner = this.checkIfCurrentUser();
            await this.updateOrganization();
            this.resetForm();
          } else {
            this.router.navigate(['/']);
          }
        });
      }
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  checkIfCurrentUser(): boolean {
    return this.authService.userProfileId === this.userProfile?.id;
  }

  async updateOrganization() {
    if (this.userProfile?.organization_id) {
      this.organization = await this.organizationService.getById(this.userProfile.organization_id);
      this.resetForm();

      if (this.organization?.picture) {
        this.pictureUrl = await this.storageService.getSignedUrl(StorageService.BucketName.ORGANIZATION_IMAGES, this.organization.picture);
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

  handleCoverUpload(coverFile: File) {
    this.organizationForm.controls.picture.setValue(coverFile);
  }

  async editOrganization() {
    if (!this.organizationForm.valid) {
      return;
    }

    const name = this.organizationForm.value.name ?? '';
    const picture = this.organizationForm.value.picture;

    let uploadPath: string | undefined;

    if (picture) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.ORGANIZATION_IMAGES, picture);
    }

    let newOrganization: Organization | null;
    if (this.organization) {
      newOrganization = await this.organizationService.update(this.organization.id, {
        name,
        picture: uploadPath
      });
    } else {
      newOrganization = await this.organizationService.create({
        name,
        picture: uploadPath
      });
    }

    if (this.userProfile) {
      await this.userProfileService.update(this.userProfile.id, {organization_id: newOrganization?.id ?? null});
    }

    this.snackbarService.openSnackBar("Sauvegardé !");
    await this.updateOrganization();
    this.setFormReadOnly();
  }

  cancel() {
    this.router.navigate(['/', 'user', this.profileId]);
  }

}
