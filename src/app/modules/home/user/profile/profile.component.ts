import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../../../../shared/validators/password-confirmation.validator';
import { UserProfileService } from '../../../../shared/services/user-profile.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';
import { Post } from '../../../../shared/models/post.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../../../../shared/services/posts.service';
import { Map } from 'immutable';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton,
    MatToolbar,
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
    ReactiveFormsModule,
    PostCardComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  userProfile: UserProfile | null = null;
  currentProfile: UserProfile | null = null;
  isOwner = false;

  profileForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  }, {
    updateOn: "submit",
    validators: [passwordConfirmationValidator()]
  });

  readonly = true;
  profileId: number | null = null;
  posts: Post[] = [];
  coverUrls: Map<string, string> = Map<string, string>();
  watcher = new Subscription();

  constructor(private authService: AuthService,
              private userProfileService: UserProfileService,
              private snackbarService: SnackbarService,
              private postService: PostsService,
              private storageService: StorageService,
              private router: Router,
              private route: ActivatedRoute) {
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
            this.resetForm();
            this.posts = await this.postService.getAllByUserProfileId(userProfile.id);
            this.coverUrls = await this.storageService.getSignedUrls(StorageService.BucketName.POST_COVERS, this.posts.map(post => post.cover).filter(Boolean) as string[]);
          } else {
            this.router.navigate(['/']);
          }
        });
      }
    }));

    this.authService.userProfile$.subscribe(userProfile => {
      this.currentProfile = userProfile;
      this.isOwner = this.checkIfCurrentUser();
      this.resetForm();
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  checkIfCurrentUser(): boolean {
    return this.currentProfile?.id === this.userProfile?.id;
  }

  resetForm() {
    if (!this.userProfile || !this.currentProfile) {
      return;
    }

    if (this.isOwner) {
      this.profileForm.setValue({
        displayName: this.currentProfile.display_name,
        email: this.currentProfile.user?.email ?? null,
      }, {
        emitEvent: true
      });
    } else {
      this.profileForm.setValue({
        displayName: this.userProfile?.display_name,
        email: null,
      }, {
        emitEvent: true
      });
    }

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
    await this.userProfileService.update(this.userProfile.id, {display_name: displayName});
    await this.authService.updateUserProfile();
    this.snackbarService.openSnackBar("Sauvegardé !");
    this.readonly = true;
  }

  editOrganization() {
    this.router.navigate(['/', 'user', this.profileId, 'organization']);
  }

  navigateToPost(postId: number) {
    this.router.navigate(['/', 'posts', postId]);
  }
}
