import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { MatToolbar } from '@angular/material/toolbar';
import { PostCardPreviewComponent } from '../../../../shared/components/post-card/preview/preview.component';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MarkdownEditorComponent } from '../../../../shared/components/markdown-editor/markdown-editor.component';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { TagsAutocompleteChipsInputComponent } from '../../../../shared/components/tags-autocomplete-chips-input/tags-autocomplete-chips-input.component';
import { DepartmentAutocompleteInputComponent } from '../../../../shared/components/department-autocomplete-input/department-autocomplete-input.component';
import { EmitorStatusSelectInputComponent } from '../../../../shared/components/emitor-status-select-input/emitor-status-select-input.component';

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
    TagsAutocompleteChipsInputComponent,
    MatButton,
    MatToolbar,
    MatError,
    MatLabel,
    PostCardPreviewComponent,
    MarkdownEditorComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    DepartmentAutocompleteInputComponent,
    EmitorStatusSelectInputComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  postForm = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    content: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    cover: new FormControl<File | undefined>(undefined),
    author: new FormControl(''),
    emitorStatus: new FormControl<string | null>(null),
    departmentId: new FormControl<number | null>(null),
    tags: new FormControl<string[]>([], {nonNullable: true}),
  });

  createLoading = false;

  postPreview: Post.Update = {};
  coverUrl?: SafeResourceUrl;

  watcher = new Subscription();

  constructor(private authService: AuthService,
              private router: Router,
              private postsService: PostsService,
              private tagsService: TagsService,
              private storageService: StorageService,
              private readonly dom: DomSanitizer) {
  }

  ngOnInit() {
    this.postForm.controls.author.setValue(this.authService.userProfile?.display_name ?? '');

    this.watcher.add(this.postForm.valueChanges.subscribe(value => {
      this.postPreview = {
        title: value.title && value.title !== '' ? value.title : undefined,
        content: value.content && value.content !== '' ? value.content : undefined,
        tags: value.tags && value.tags.length !== 0 ? value.tags : undefined,
        author_name: value.author && value.author !== '' ? value.author : undefined,
        emitor_status: value.emitorStatus && value.emitorStatus !== '' ? value.emitorStatus : undefined,
        department_id: value.departmentId ? value.departmentId : undefined,
      };
    }));

    this.watcher.add(this.postForm.controls.cover.valueChanges.subscribe(value => {
      if (value) {
        this.coverUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(value));
      } else {
        this.coverUrl = undefined;
      }
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  async createPost() {
    const userProfileId = this.authService.userProfileId;
    if (!userProfileId) {
      throw new Error('Une erreur s\'est produite lors de la création du post', {cause: 'Id de l\'utilisateur manquant'});
    }

    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title ?? '';
    const content = this.postForm.value.content ?? '';
    const cover = this.postForm.value.cover ?? '';
    const author = this.postForm.value.author ?? null;
    const departmentId = this.postForm.value.departmentId ?? null;
    const emitorStatus = this.postForm.value.emitorStatus ?? null;
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
      author_name: author,
      department_id: departmentId,
      emitor_status: emitorStatus,
      tags,
    };

    this.createLoading = true;
    try {
      const allTags = await this.tagsService.getAll();
      const allTagValues = allTags.map(d => d.value) ?? [];
      tags.filter(tag => !allTagValues.includes(tag))
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
