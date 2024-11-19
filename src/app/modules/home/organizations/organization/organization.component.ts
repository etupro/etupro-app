import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { OrganizationsService } from '../../../../shared/services/organizations.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Organization } from '../../../../shared/models/organiazation.model';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { SinglePictureInputComponent } from '../../../../shared/components/single-picture-input/single-picture-input.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { StorageService } from '../../../../shared/services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserOrganizationsService } from '../../../../shared/services/user-organizations.service';
import { UserSelectInputComponent } from '../../../../shared/components/select-input/user-select-input/user-select-input.component';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatCardTitle,
    SinglePictureInputComponent,
    MatError,
    MatLabel,
    MatButton,
    MatInput,
    MatIcon,
    MatIconButton,
    UserSelectInputComponent,

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
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    picture: new FormControl<File | null>(null),
    owner: new FormControl<number | null>(null, {validators: [Validators.required]}),
  }, {
    updateOn: 'submit',
  });

  organizationId: number | null = null;
  userProfileId: number | null = null;
  watcher = new Subscription();

  constructor(private authService: AuthService,
              private organizationService: OrganizationsService,
              private userOrganizationsService: UserOrganizationsService,
              private storageService: StorageService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.readonly = true;

    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => {
      this.userProfileId = userProfile?.id ?? null;
      this.organizationForm.controls.owner.setValue(this.userProfileId, {emitEvent: false});
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
    this.organizationForm.setValue({
      name: this.organization?.name ?? '',
      picture: null,
      owner: this.organization?.owner ?? null
    }, {
      emitEvent: false
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
    this.organizationForm.controls.picture.setValue(coverFile, {emitEvent: false});
  }

  async saveOrganization() {
    if (!this.organizationForm.valid || !this.userProfileId) {
      this.organizationForm.markAllAsTouched();
      return;
    }

    const name = this.organizationForm.value.name ?? '';
    const picture = this.organizationForm.value.picture;
    const owner = this.organizationForm.value.owner ?? null;

    let uploadPath: string | undefined;

    if (picture) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.ORGANIZATION_IMAGES, picture);
    }

    let newOrganization: Organization | null;
    if (this.organizationId) {
      newOrganization = await this.organizationService.update(this.organizationId, {
        name,
        picture: uploadPath,
        owner
      });

      this.snackbarService.openSnackBar('Sauvegardé !');
      this.organization = newOrganization;
      this.resetForm();
      this.setFormReadOnly();
    } else {
      newOrganization = await this.organizationService.create({
        name,
        picture: uploadPath,
        owner
      });
      if (newOrganization) {
        await this.userOrganizationsService.insert(this.userProfileId, newOrganization.id);
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
