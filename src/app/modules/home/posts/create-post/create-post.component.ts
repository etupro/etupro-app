import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PostsService } from "../../../../shared/services/posts.service";
import { Post } from "../../../../shared/models/post.model";
import { TagsService } from "../../../../shared/services/tags.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../../../shared/services/auth.service";
import { StorageService } from "../../../../shared/services/storage.service";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { SinglePictureInputComponent } from "../../../../shared/components/single-picture-input/single-picture-input.component";
import { AutocompleteInputComponent } from "../../../../shared/components/autocomplete-input/autocomplete-input.component";
import { MatToolbar } from "@angular/material/toolbar";
import { SubHeaderComponent } from "../../../../shared/components/sub-header/sub-header.component";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
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
    SubHeaderComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    cover: new FormControl<File | undefined>(undefined),
    tags: new FormControl<string[]>([]),
  })

  watcher = new Subscription();
  allTags: string[] = [];

  createLoading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private postsService: PostsService,
              private tagsService: TagsService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.tagsService.getAll().then(response => {
      this.allTags = response.data?.map(d => d.value) ?? []
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
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

    let coverUrl: string | undefined;
    if (cover) {
      const uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.POST_COVERS, cover);
      coverUrl = this.storageService.getPublicUrl(StorageService.BucketName.POST_COVERS, uploadPath);
    }

    const post: Post.Insert = {
      user_profile_id: userProfileId,
      title,
      content,
      cover: coverUrl,
      tags,
    };

    this.createLoading = true;
    try {
      tags.filter(tag => !this.allTags.includes(tag))
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
