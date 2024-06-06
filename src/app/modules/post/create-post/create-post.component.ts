import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostsService } from "../../../shared/services/posts.service";
import { Post } from "../../../shared/models/post.model";
import { TagsService } from "../../../shared/services/tags.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../../shared/services/auth.service";
import { UserProfileService } from "../../../shared/services/user-profile.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tags: new FormControl<string[]>([]),
  })

  watcher = new Subscription();
  allTags: string[] = [];

  createLoading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private postsService: PostsService,
              private tagsService: TagsService,
              private userProfileService: UserProfileService) {
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
    const userId = this.authService.userId;
    if (!userId) {
      throw new Error('No user id found');
    }

    const authorId = (await this.userProfileService.getByUserId(userId)).data?.id;

    if (!this.postForm.valid || !authorId) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title ?? '';
    const content = this.postForm.value.content ?? '';
    const tags = this.postForm.value.tags ?? [];

    const post: Post.Insert = {
      user_profile_id: authorId,
      title,
      content,
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

  backToPosts() {
    this.router.navigate(['/', 'posts']);
  }
}
