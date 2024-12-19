import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfileFormModel } from '../models/user-profile-form.model';
import { Subscription } from 'rxjs';
import { SinglePictureInputComponent } from '../../single-picture-input/single-picture-input.component';
import { UserProfile } from '../../../models/user-profile.model';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    SinglePictureInputComponent
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnChanges, OnDestroy {

  @Input() userProfile: UserProfile | null = null;
  @Input() form: FormGroup<UserProfileFormModel>;

  coverUrl: string | undefined;

  private picturePathWatcher = new Subscription();

  constructor(private storageService: StorageService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['form']) {
      this.picturePathWatcher.unsubscribe();
    }

    if (changes['userProfile']) {
      if (this.userProfile) {
        this.form.setValue({
          display_name: this.userProfile.display_name,
          description: this.userProfile.description,
          phone_number: this.userProfile.phone_number,
          picture_path: null,
        });
        if (this.userProfile.picture_path) {
          this.storageService.getSignedUrl(StorageService.BucketName.PROFILE_PICTURE, this.userProfile.picture_path).then(url => {
            this.coverUrl = url;
          });
        }
      }
    }
  }

  ngOnDestroy() {
    this.picturePathWatcher.unsubscribe();
  }

  handlePictureUpload(coverUrl: File) {
    this.form.controls.picture_path.setValue(coverUrl);
  }

}
