import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostCardComponent } from '../post-card.component';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-card-preview',
  standalone: true,
  imports: [
    PostCardComponent
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PostCardPreviewComponent implements OnChanges {

  @Input() post?: Post.Update;
  @Input() coverUrl?: SafeResourceUrl | string;

  postPreview: Post = {
    id: 0,
    title: 'Titre',
    content: 'Contenu',
    cover: null,
    tags: ['tag1', 'tag2'],
    department_id: null,
    author_name: null,
    user_profile_id: 0,
    user_profiles: null,
    created_at: '',
    updated_at: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post']) {
      this.postPreview = {
        ...this.postPreview,
        title: this.post?.title ?? 'Titre',
        content: this.post?.content ?? 'Contenu',
        tags: this.post?.tags ?? ['tag1', 'tag2'],
        author_name: this.post?.author_name ?? null,
      };
    }
  }
}
