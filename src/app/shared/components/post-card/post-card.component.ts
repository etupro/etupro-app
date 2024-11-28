import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Department } from '../../models/department.model';
import { QueryPostTags } from '../../models/query-post-tags.model';
import { EmitorStatusPipe } from '../../pipes/emitor-status/emitor-status.pipe';
import { Map } from 'immutable';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatChipListbox,
    MatChipOption,
    EmitorStatusPipe,
  ]
})
export class PostCardComponent implements OnChanges {

  @Input() post: Post;
  @Input() coverUrl?: SafeResourceUrl | string;

  @Output() postClick = new EventEmitter<number>();
  @Output() tagClick = new EventEmitter<QueryPostTags>();
  @Output() organizationClick = new EventEmitter<number>();

  organizationLogos: Map<number, (SafeResourceUrl | string)> = Map<number, (SafeResourceUrl | string)>();

  constructor(private storageService: StorageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.organizationLogos = Map<number, (SafeResourceUrl | string)>();
      if (this.post.organizations) {
        const organizationWithLogos = this.post.organizations
          .filter(o => o.picture)
          .slice(0, 3);
        this.storageService.getSignedUrls(StorageService.BucketName.ORGANIZATION_IMAGES, organizationWithLogos.map(o => o.picture) as string[]).then(urls => {
          this.organizationLogos = Map<number, (SafeResourceUrl | string)>(organizationWithLogos.map(o => [o.id, urls.get(o.picture as string) as string]));
        });
      }
    }
  }

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

  handleOrganizationClick(event: MouseEvent, organizationId: number) {
    event.stopPropagation();
    this.organizationClick.emit(organizationId);
  }

  handleKeyDown(event: KeyboardEvent, organizationId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.organizationClick.emit(organizationId);
    }
  }
}
