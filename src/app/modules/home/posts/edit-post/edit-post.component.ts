import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarkdownEditorComponent } from '../../../../shared/components/markdown-editor/markdown-editor.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { PostCardPreviewComponent } from '../../../../shared/components/post-card/preview/preview.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SinglePictureInputComponent } from '../../../../shared/components/single-picture-input/single-picture-input.component';
import { Post } from '../../../../shared/models/post.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../shared/services/posts.service';
import { TagsService } from '../../../../shared/services/tags.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { TagsAutocompleteChipsInputComponent } from '../../../../shared/components/tags-autocomplete-chips-input/tags-autocomplete-chips-input.component';
import { DepartmentAutocompleteInputComponent } from '../../../../shared/components/autocomplete-input/department-autocomplete-input/department-autocomplete-input.component';
import { EmitorStatusSelectInputComponent } from '../../../../shared/components/emitor-status-select-input/emitor-status-select-input.component';
import {
    UserAutocompleteInputComponent
} from '../../../../shared/components/autocomplete-input/user-autocomplete-input/user-autocomplete-input.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
    imports: [
        MarkdownEditorComponent,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        PostCardPreviewComponent,
        ReactiveFormsModule,
        SinglePictureInputComponent,
        TagsAutocompleteChipsInputComponent,
        MatCard,
        MatCardTitle,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatCardContent,
        MatCardFooter,
        DepartmentAutocompleteInputComponent,
        EmitorStatusSelectInputComponent,
        UserAutocompleteInputComponent
    ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    content: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    cover: new FormControl<File | undefined>(undefined),
    author: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    emitorStatus: new FormControl<string>('STUDENT', {nonNullable: true, validators: [Validators.required]}),
    departmentId: new FormControl<number>(1, {nonNullable: true, validators: [Validators.required]}),
    tags: new FormControl<string[]>([], {nonNullable: true}),
  });

  updateLoading = false;

  postId: number | null = null;
  postLoading = false;
  post: Post | null = null;
  postPreview: Post.Update = {};
  coverUrl?: SafeResourceUrl;

  watcher = new Subscription();

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private postsService: PostsService,
              private tagsService: TagsService,
              private storageService: StorageService,
              private readonly dom: DomSanitizer) {
  }

  ngOnInit() {
    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => {
      this.postForm.controls.author.setValue(userProfile?.id ?? 0);
    }));

    this.watcher.add(this.route.params.subscribe(params => {
      this.postId = params['id'];
      if (this.postId) {
        this.postLoading = true;
        this.postsService.getById(this.postId).then(post => {
          this.post = post;
          if (post) {
            if (this.authService.userProfileRole !== 'SUPER_ADMIN' && post.user_profile_id !== this.authService.userProfileId) {
              this.router.navigate(['/', 'posts', this.postId]);
            }
            this.postForm.setValue({
              title: post.title,
              content: post.content,
              cover: null,
              author: post.user_profile_id,
              emitorStatus: post.emitor_status ?? 'STUDENT',
              departmentId: post.department_id ?? 1,
              tags: post.tags,
            });
          } else {
            this.router.navigate(['/']);
          }
        }).finally(() => {
          this.postLoading = false;
        });
      }
    }));

    this.watcher.add(this.postForm.valueChanges.subscribe(value => {
      this.postPreview = {
        title: value.title && value.title !== '' ? value.title : undefined,
        content: value.content && value.content !== '' ? value.content : undefined,
        tags: value.tags && value.tags.length !== 0 ? value.tags : undefined,
        department_id: value.departmentId ? value.departmentId : undefined,
        user_profile_id: value.author && value.author !== 0 ? value.author : undefined,
        emitor_status: value.emitorStatus && value.emitorStatus !== '' ? value.emitorStatus : undefined,
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

  async updatePost() {
    const userProfileId = this.authService.userProfileId;
    if (!userProfileId || !this.postId) {
      throw new Error('Une erreur s\'est produite lors de la création du post', {cause: 'Id de l\'utilisateur manquant'});
    }

    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title ?? '';
    const content = this.postForm.value.content ?? '';
    const cover = this.postForm.value.cover ?? '';
    const author = this.postForm.value.author;
    const emitorStatus = this.postForm.value.emitorStatus ?? null;
    const departmentId = this.postForm.value.departmentId ?? null;
    const tags = this.postForm.value.tags ?? [];

    this.updateLoading = true;

    let uploadPath: string | undefined;
    if (cover) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.POST_COVERS, cover);
    }

    if (!author) {
      throw new Error('Une erreur s\'est produite lors de la création du post', {cause: 'Id de l\'auteur manquant'});
    }

    const post: Post.Update = {
      title,
      content,
      cover: uploadPath,
      user_profile_id: author,
      emitor_status: emitorStatus,
      department_id: departmentId,
      tags,
    };

    try {
      const allTags = await this.tagsService.getAll();
      const allTagValues = allTags.map(d => d.value) ?? [];
      tags.filter(tag => !allTagValues.includes(tag))
        .map(async tag => await this.tagsService.create({value: tag}));

      const updatedPost = await this.postsService.update(this.postId, post);

      if (uploadPath && this.post?.cover) {
        await this.storageService.deleteFromBucket(StorageService.BucketName.POST_COVERS, this.post.cover);
      }

      await this.router.navigate(['/', 'posts', updatedPost.id]);
    } finally {
      this.updateLoading = false;
    }
  }

  handleCoverUpload(coverUrl: File) {
    this.postForm.controls.cover.setValue(coverUrl);
  }

  cancel() {
    this.router.navigate(['/', 'posts', this.postId]);
  }
}
