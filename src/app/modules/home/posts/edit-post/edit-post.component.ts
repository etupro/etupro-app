import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarkdownEditorComponent } from '../../../../shared/components/markdown-editor/markdown-editor.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { PostCardPreviewComponent } from '../../../../shared/components/post-card/preview/preview.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SinglePictureInputComponent } from '../../../../shared/components/single-picture-input/single-picture-input.component';
import { TagsAutocompleteInputsComponent } from '../../../../shared/components/autocomplete-input/tags-autocomplete-inputs/tags-autocomplete-inputs.component';
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
    TagsAutocompleteInputsComponent,
    MatCard,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatCardContent,
    MatCardFooter
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    content: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    cover: new FormControl<File | undefined>(undefined),
    author: new FormControl(''),
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
    this.watcher.add(this.route.params.subscribe(params => {
      this.postId = params['id'];
      if (this.postId) {
        this.postLoading = true;
        this.postsService.getById(this.postId).then(post => {
          this.post = post;
          if (post) {
            if (post.user_profile_id !== this.authService.userProfileId) {
              this.router.navigate(['/', 'posts', this.postId]);
            }
            this.postForm.setValue({
              title: post.title,
              content: post.content,
              cover: null,
              author: post.author_name ?? this.authService.userProfile?.display_name ?? null,
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
        author_name: value.author && value.author !== '' ? value.author : undefined,
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
      throw new Error('No user id found');
    }

    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title ?? '';
    const content = this.postForm.value.content ?? '';
    const cover = this.postForm.value.cover ?? '';
    const author = this.postForm.value.author ?? null;
    const tags = this.postForm.value.tags ?? [];

    this.updateLoading = true;

    let uploadPath: string | undefined;
    if (cover) {
      uploadPath = await this.storageService.uploadToBucket(StorageService.BucketName.POST_COVERS, cover);
    }

    const post: Post.Update = {
      user_profile_id: userProfileId,
      title,
      content,
      cover: uploadPath,
      author_name: author,
      tags,
    };

    try {
      const allTagsResponse = await this.tagsService.getAll();
      const allTags = allTagsResponse.data?.map(d => d.value) ?? [];
      tags.filter(tag => !allTags.includes(tag))
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
