import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostCardComponent } from '../post-card.component';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DepartmentsService } from '../../../services/departments.service';

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
    emitor_status: null,
    user_profile_id: 0,
    user_profiles: null,
    created_at: '',
    updated_at: '',
  };

  constructor(private departmentsService: DepartmentsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post']) {
      if (this.post?.department_id) {
        this.departmentsService.getById(this.post.department_id).then(department => {
          this.postPreview = {
            ...this.postPreview,
            departments: department,
          };
        });
      }

      this.postPreview = {
        ...this.postPreview,
        title: this.post?.title ?? 'Titre',
        content: this.post?.content ?? 'Contenu',
        tags: this.post?.tags ?? ['tag1', 'tag2'],
        author_name: this.post?.author_name ?? null,
        emitor_status: this.post?.emitor_status ?? null,
      };
    }
  }
}
