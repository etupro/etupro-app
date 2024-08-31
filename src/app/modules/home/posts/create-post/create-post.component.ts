import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../../shared/services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { TagsService } from '../../../../shared/services/tags.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../../../shared/components/navidation/navigation.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SinglePictureInputComponent } from '../../../../shared/components/single-picture-input/single-picture-input.component';
import { AutocompleteInputComponent } from '../../../../shared/components/autocomplete-input/autocomplete-input.component';
import { MatToolbar } from '@angular/material/toolbar';
import { TagsAutocompleteInputsComponent } from '../../../../shared/components/autocomplete-input/tags-autocomplete-inputs/tags-autocomplete-inputs.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    SinglePictureInputComponent,
    AutocompleteInputComponent,
    MatButton,
    MatToolbar,
    MatError,
    MatLabel,
    TagsAutocompleteInputsComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    cover: new FormControl<File | undefined>(undefined),
    tags: new FormControl<string[]>([]),
  });


  createLoading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private postsService: PostsService,
              private tagsService: TagsService,
              private storageService: StorageService) {
  }

  async createPost() {
    const userProfileId = this.authService.userProfileId;
    if (!userProfileId) {
      throw new Error('No user id found');
    }

    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title ?? '';
    const content = this.postForm.value.content ?? '';
    const cover = this.postForm.value.cover ?? '';
    const tags = this.postForm.value.tags ?? [];

    let uploadPath: string | undefined;
    if (cover) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.POST_COVERS, cover);
    }

    const post: Post.Insert = {
      user_profile_id: userProfileId,
      title,
      content,
      cover: uploadPath,
      tags,
    };

    this.createLoading = true;
    try {
      const allTagsResponse = await this.tagsService.getAll();
      const allTags = allTagsResponse.data?.map(d => d.value) ?? [];
      tags.filter(tag => !allTags.includes(tag))
        .map(async tag => await this.tagsService.create({value: tag}));

      const postId = await this.postsService.create(post);
      await this.router.navigate(['/', 'posts', postId]);
    } finally {
      this.createLoading = false;
    }
  }

  handleCoverUpload(coverUrl: File) {
    this.postForm.controls.cover.setValue(coverUrl);
  }
}
