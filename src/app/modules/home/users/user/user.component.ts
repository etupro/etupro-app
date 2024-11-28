import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../../../../shared/services/user-profile.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';
import { Post } from '../../../../shared/models/post.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../../../../shared/services/posts.service';
import { Map } from 'immutable';
import { StorageService } from '../../../../shared/services/storage.service';
import { OrganizationsAutocompleteChipsInputComponent } from '../../../../shared/components/autocomplete-chips-input/organizations-autocomplete-chips-input/organizations-autocomplete-chips-input.component';
import { UserOrganizationsService } from '../../../../shared/services/user-organizations.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    PostCardComponent,
    OrganizationsAutocompleteChipsInputComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  userProfile: UserProfile | null = null;
  currentProfile: UserProfile | null = null;
  isOwner = false;

  profileForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    organizations: new FormControl<number[]>([], {nonNullable: true}),
  }, {
    updateOn: 'submit',
  });

  readonly = true;
  profileId: number | null = null;
  posts: Post[] = [];
  coverUrls: Map<string, string> = Map<string, string>();
  watcher = new Subscription();

  constructor(private authService: AuthService,
              private userProfileService: UserProfileService,
              private userOrganizationsService: UserOrganizationsService,
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
            const covers = this.posts.map(post => post.cover).filter(Boolean) as string[];
            if (covers.length > 0) {
              this.coverUrls = await this.storageService.getSignedUrls(StorageService.BucketName.POST_COVERS, covers);
            }
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
        organizations: this.currentProfile.organizations?.map(o => o.id) ?? [],
      }, {
        emitEvent: true
      });
    } else {
      this.profileForm.setValue({
        displayName: this.userProfile?.display_name,
        email: null,
        organizations: this.userProfile.organizations?.map(o => o.id) ?? [],
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
    const organizations = this.profileForm.value.organizations ?? [];

    await this.authService.updateUserEmail(email);
    await this.userProfileService.update(this.userProfile.id, {display_name: displayName});
    await this.userOrganizationsService.update(this.userProfile.id, organizations);
    await this.authService.updateUserProfile();
    console.log('user');
    this.snackbarService.openSnackBar('Sauvegardé !');
    this.readonly = true;
  }

  navigateToPost(postId: number) {
    this.router.navigate(['/', 'posts', postId]);
  }
}
