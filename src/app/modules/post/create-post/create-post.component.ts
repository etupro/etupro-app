import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";
import {Auth} from "@angular/fire/auth";
import {ReferencesService} from "../../../shared/services/references.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tags: new FormControl<string[]>([]),
  })

  constructor(private auth: Auth,
              private router: Router,
              private postsService: PostsService,
              private referencesService: ReferencesService) {}

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
      tags: new Set(tags)
    });

    await this.referencesService.updateTags(new Set(tags));
    const postId = await this.postsService.create(post);

    await this.router.navigate(['/', 'posts', postId]);
  }
}
