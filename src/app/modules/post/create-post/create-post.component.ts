import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";
import {Auth} from "@angular/fire/auth";
import {ReferencesService} from "../../../shared/services/references.service";

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
              private postsService: PostsService,
              private referencesService: ReferencesService) {}

  createPost() {
    const userUid = this.auth.currentUser?.uid;

    if (!this.postForm.valid || !userUid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const title = this.postForm.value.title!;
    const content = this.postForm.value.content!;
    const tags = this.postForm.value.tags ?? [];

    const post = new Post({
      author: userUid,
      title,
      content,
      tags: new Set(tags)
    });

    this.postsService.create(post);
    this.referencesService.updateTags(new Set(tags));
  }
}
