import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";
import {Auth} from "@angular/fire/auth";
import {TagsService} from "../../../shared/services/tags.service";
import {Router} from "@angular/router";
import {Tag} from "../../../shared/models/tag.model";
import {Subscription} from "rxjs";

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

  constructor(private auth: Auth,
              private router: Router,
              private postsService: PostsService,
              private tagsService: TagsService) {
  }

  ngOnInit() {
    this.watcher.add(this.tagsService.updatedSnapshot$.subscribe(snapshot => {
      this.allTags = snapshot.docs.map(d => d.data().tag)
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  async createPost() {
    const authorId = this.auth.currentUser?.uid;
    const authorName = this.auth.currentUser?.displayName ?? 'Anonyme';

    if (!this.postForm.valid || !authorId || !authorName) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title!;
    const content = this.postForm.value.content!;
    const tags = this.postForm.value.tags ?? [];

    const post = new Post({
      authorId,
      authorName,
      title,
      content,
      tags
    });

    tags.filter(tag => !this.allTags.includes(tag))
      .map(async tag => await this.tagsService.create(new Tag({tag})));

    const postId = await this.postsService.create(post);

    await this.router.navigate(['/', 'posts', postId]);
  }
}
