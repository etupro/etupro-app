import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { OrganizationsService } from '../../../../shared/services/organizations.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../../../../shared/validators/password-confirmation.validator';
import { Organization } from '../../../../shared/models/organiazation.model';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { SinglePictureInputComponent } from '../../../../shared/components/single-picture-input/single-picture-input.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { StorageService } from '../../../../shared/services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserOrganisationsService } from '../../../../shared/services/user-organisations.service';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
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

  organizationId: number | null = null;
  userProfileId: number | null = null;
  watcher = new Subscription();

  constructor(private authService: AuthService,
              private organizationService: OrganizationsService,
              private userOrganisationsService: UserOrganisationsService,
              private storageService: StorageService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.readonly = true;

    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => {
      this.userProfileId = userProfile?.id ?? null;
    }));

    this.watcher.add(this.route.params.subscribe(params => {
      this.organizationId = params['id'] === 'new' ? null : parseInt(params['id']);

      if (this.organizationId) {
        this.organizationService.getById(this.organizationId).then(async organization => {
          if (organization) {
            this.organization = organization;
            this.isOwner = this.authService.userProfileId === this.organization?.owner;
            if (this.organization?.picture) {
              this.pictureUrl = await this.storageService.getSignedUrl(StorageService.BucketName.ORGANIZATION_IMAGES, this.organization.picture);
            }
            this.setFormReadOnly();
          } else {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.isOwner = true;
        this.setFormEditMode();
      }
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
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
    if (!this.organizationForm.valid || !this.userProfileId) {
      return;
    }

    const name = this.organizationForm.value.name ?? '';
    const picture = this.organizationForm.value.picture;

    let uploadPath: string | undefined;

    if (picture) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.ORGANIZATION_IMAGES, picture);
    }

    let newOrganization: Organization | null;
    if (this.organizationId) {
      newOrganization = await this.organizationService.update(this.organizationId, {
        name,
        picture: uploadPath
      });

      this.snackbarService.openSnackBar('Sauvegardé !');
      this.organization = newOrganization;
      this.resetForm();
      this.setFormReadOnly();
    } else {
      newOrganization = await this.organizationService.create({
        name,
        picture: uploadPath,
        owner: this.userProfileId
      });
      if (newOrganization) {
        await this.userOrganisationsService.insert(this.userProfileId, newOrganization.id);
      }

      this.snackbarService.openSnackBar('Sauvegardé !');
      this.router.navigate(['/', 'organizations', newOrganization?.id]);
    }
  }

  cancel() {
    const lastNavigation = this.router.lastSuccessfulNavigation?.previousNavigation;
    if (lastNavigation) {
      this.router.navigateByUrl(lastNavigation.extractedUrl.toString());
    } else {
      this.router.navigate(['/']);
    }
  }

}
