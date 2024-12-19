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
import { TagsAutocompleteChipsInputComponent } from '../../../../shared/components/autocomplete-chips-input/tags-autocomplete-chips-input/tags-autocomplete-chips-input.component';
import { DepartmentSelectInputComponent } from '../../../../shared/components/select-input/department-select-input/department-select-input.component';
import { EmitorStatusSelectInputComponent } from '../../../../shared/components/select-input/emitor-status-select-input/emitor-status-select-input.component';
import { UserSelectInputComponent } from '../../../../shared/components/select-input/user-select-input/user-select-input.component';
import { OrganizationsAutocompleteChipsInputComponent } from '../../../../shared/components/autocomplete-chips-input/organizations-autocomplete-chips-input/organizations-autocomplete-chips-input.component';
import { PostOrganizationsService } from '../../../../shared/services/post-organizations.service';
import { PostLifecycleSelectInputComponent } from '../../../../shared/components/select-input/post-lifecycle-select-input/post-lifecycle-select-input.component';
import { PostLifecycle } from '../../../../shared/models/enum/post_lifecycle.enum';

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
    MatCardContent,
    MatCardFooter,
    DepartmentSelectInputComponent,
    EmitorStatusSelectInputComponent,
    UserSelectInputComponent,
    OrganizationsAutocompleteChipsInputComponent,
    PostLifecycleSelectInputComponent
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
    departmentCode: new FormControl<string>('1', {nonNullable: true, validators: [Validators.required]}),
    organizations: new FormControl<number[]>([], {nonNullable: true}),
    lifecycle: new FormControl<PostLifecycle>('OPEN', {nonNullable: true, validators: [Validators.required]}),
    tags: new FormControl<string[]>([], {nonNullable: true}),
  });

  postId: number | null = null;
  postLoading = false;
  post: Post | null = null;
  postPreview: Post.Preview = {};
  coverUrl?: SafeResourceUrl;

  watcher = new Subscription();

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private postsService: PostsService,
              private postOrganizationService: PostOrganizationsService,
              private tagsService: TagsService,
              private storageService: StorageService,
              private dom: DomSanitizer) {
  }

  ngOnInit() {
    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => {
      this.postForm.controls.author.setValue(userProfile?.id ?? 0);
    }));

    this.watcher.add(this.route.params.subscribe(params => {
      this.postId = params['id'] === 'new' ? null : parseInt(params['id']);
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
              departmentCode: post.department_code ?? '1',
              tags: post.tags,
              lifecycle: post.lifecycle,
              organizations: post.organizations ? post.organizations.map(o => o.id) : [],
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
        department_code: value.departmentCode ? value.departmentCode : undefined,
        user_profile_id: value.author && value.author !== 0 ? value.author : undefined,
        emitor_status: value.emitorStatus && value.emitorStatus !== '' ? value.emitorStatus : undefined,
        lifecycle: value.lifecycle ? value.lifecycle : 'OPEN',
        organization_ids: value.organizations ? value.organizations : [],
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

  async saveForm(): Promise<void> {
    if (this.postId) {
      await this.updatePost();
    } else {
      await this.createPost();
    }
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
    const departmentCode = this.postForm.value.departmentCode ?? null;
    const organizations = this.postForm.value.organizations ?? [];
    const tags = this.postForm.value.tags ?? [];
    const lifecycle = this.postForm.value.lifecycle ?? 'OPEN';

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
      department_code: departmentCode,
      tags,
      lifecycle,
    };

    const allTags = await this.tagsService.getAll();
    const allTagValues = allTags.map(d => d.value) ?? [];
    tags.filter(tag => !allTagValues.includes(tag))
      .map(async tag => await this.tagsService.create({value: tag}));

    const updatedPost = await this.postsService.update(this.postId, post);
    await this.postOrganizationService.update(updatedPost.id, organizations);

    if (uploadPath && this.post?.cover) {
      await this.storageService.deleteFromBucket(StorageService.BucketName.POST_COVERS, this.post.cover);
    }

    await this.router.navigate(['/', 'posts', updatedPost.id]);
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
    const author = this.postForm.value.author;
    const departmentCode = this.postForm.value.departmentCode ?? null;
    const emitorStatus = this.postForm.value.emitorStatus ?? null;
    const organizations = this.postForm.value.organizations ?? [];
    const tags = this.postForm.value.tags ?? [];

    let uploadPath: string | undefined;
    if (cover) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.POST_COVERS, cover);
    }

    if (!author) {
      throw new Error('Une erreur s\'est produite lors de la création du post', {cause: 'Id de l\'auteur manquant'});
    }

    const post: Post.Insert = {
      title,
      content,
      cover: uploadPath,
      user_profile_id: author,
      department_code: departmentCode,
      emitor_status: emitorStatus,
      tags,
    };

    const allTags = await this.tagsService.getAll();
    const allTagValues = allTags.map(d => d.value) ?? [];
    tags.filter(tag => !allTagValues.includes(tag))
      .map(async tag => await this.tagsService.create({value: tag}));

    const createdPost = await this.postsService.create(post);
    await this.postOrganizationService.update(createdPost.id, organizations);
    await this.router.navigate(['/', 'posts', createdPost.id]);
  }

  handleCoverUpload(coverUrl: File) {
    this.postForm.controls.cover.setValue(coverUrl);
  }

  cancel() {
    this.router.navigate(['/', 'posts', this.postId]);
  }
}
