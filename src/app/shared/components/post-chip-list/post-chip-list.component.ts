import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmitorStatusPipe } from '../../pipes/emitor-status/emitor-status.pipe';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { Post } from '../../models/post.model';
import { QueryPostTags } from '../../models/query-post-tags.model';
import { Department } from '../../models/department.model';
import { PostLifecyclePipe } from '../../pipes/post-lifecycle/post-lifecycle.pipe';

@Component({
  selector: 'app-post-chip-list',
  standalone: true,
  imports: [
    EmitorStatusPipe,
    MatChipListbox,
    MatChipOption,
    PostLifecyclePipe
  ],
  templateUrl: './post-chip-list.component.html',
  styleUrl: './post-chip-list.component.scss'
})
export class PostChipListComponent {

  @Input() post: Post;

  @Output() tagClick = new EventEmitter<QueryPostTags>();

  handleLifecycleClick(lifecycle: string, event: MouseEvent) {
    event.stopPropagation();
    this.tagClick.emit(new QueryPostTags({
      lifecycle: lifecycle,
    }));
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
      departmentCode: department.code,
    }));
  }

  handleTagClick(tag: string, event: MouseEvent) {
    event.stopPropagation();
    this.tagClick.emit(new QueryPostTags({
      tags: [tag],
    }));
  }
}
