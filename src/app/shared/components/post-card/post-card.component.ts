import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Department } from '../../models/department.model';
import { QueryPostTags } from '../../models/query-post-tags.model';
import { EmitorStatusPipe } from '../../pipes/emitor-status/emitor-status.pipe';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatChipListbox,
    MatChipOption,
    EmitorStatusPipe,
  ]
})
export class PostCardComponent {

  @Input() post: Post;
  @Input() coverUrl?: SafeResourceUrl | string;

  @Output() postClick = new EventEmitter<number>();
  @Output() tagClick = new EventEmitter<QueryPostTags>();

  handlePostClick() {
    this.postClick.emit(this.post.id);
  }

  handleEmitorStatusClick(emitorStatus: string, event: MouseEvent) {
    event.stopPropagation();
    this.tagClick.emit(new QueryPostTags({
      emitorStatus: emitorStatus,
    }));
  }

  handleDepartmentClick(department: Department, event: MouseEvent) {
    event.stopPropagation();
    this.tagClick.emit(new QueryPostTags({
      departmentId: department.id,
    }));
  }

  handleTagClick(tag: string, event: MouseEvent) {
    event.stopPropagation();
    this.tagClick.emit(new QueryPostTags({
      tags: [tag],
    }));
  }
}
