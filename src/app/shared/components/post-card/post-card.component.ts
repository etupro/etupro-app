import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { SafeResourceUrl } from '@angular/platform-browser';

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
  ]
})
export class PostCardComponent {

  @Input() post: Post;
  @Input() coverUrl?: SafeResourceUrl | string;
}
