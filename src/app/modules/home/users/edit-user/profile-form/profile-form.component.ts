import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfileFormModel } from '../models/user-profile-form.model';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SinglePictureInputComponent } from '../../../../../shared/components/single-picture-input/single-picture-input.component';

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

  @Input() form!: FormGroup<UserProfileFormModel>;

  coverUrl: SafeResourceUrl | undefined;

  private picturePathWatcher = new Subscription();

  constructor(private dom: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['form']) {
      this.picturePathWatcher.unsubscribe();
      this.picturePathWatcher.add(this.form.controls.picture_path.valueChanges.subscribe(value => {
        if (value) {
          this.coverUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(value));
        } else {
          this.coverUrl = undefined;
        }
      }));
    }
  }

  ngOnDestroy() {
    this.picturePathWatcher.unsubscribe();
  }

  handlePictureUpload(coverUrl: File) {
    this.form.controls.picture_path.setValue(coverUrl);
  }

}
