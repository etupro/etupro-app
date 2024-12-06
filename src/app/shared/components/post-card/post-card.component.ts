import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { SafeResourceUrl } from '@angular/platform-browser';
import { QueryPostTags } from '../../models/query-post-tags.model';
import { OrganizationMiniaturesComponent } from '../organization-miniatures/organization-miniatures.component';
import { PostChipListComponent } from '../post-chip-list/post-chip-list.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    OrganizationMiniaturesComponent,
    PostChipListComponent,
  ]
})
export class PostCardComponent {

  @Input() post: Post;
  @Input() coverUrl?: SafeResourceUrl | string;

  @Output() postClick = new EventEmitter<number>();
  @Output() tagClick = new EventEmitter<QueryPostTags>();
  @Output() organizationClick = new EventEmitter<number>();

  handlePostClick() {
    this.postClick.emit(this.post.id);
  }

  handleTagClick(query: QueryPostTags) {
    this.tagClick.emit(query);
  }

}
