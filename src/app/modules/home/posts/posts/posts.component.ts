import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../../shared/services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../../../shared/components/navidation/navigation.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';
import { MatIcon } from '@angular/material/icon';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { StorageService } from '../../../../shared/services/storage.service';
import { Map } from 'immutable';
import { MatToolbar } from '@angular/material/toolbar';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    SearchBarComponent,
    MatButton,
    PostCardComponent,
    MatFabButton,
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatToolbar,
    MatChipSet,
    MatChip,
    MatIconButton,
    MatChipRemove,
    MatBadge,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  coverUrls: Map<string, string> = Map<string, string>();
  tags: string[] = [];
  postsLoading = false;
  isHandset = false;

  watcher = new Subscription();

  constructor(private postsService: PostsService,
              private storageService: StorageService,
              private router: Router,
              private route: ActivatedRoute,
              private responsive: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.watcher.add(this.route.queryParams.subscribe(params => {
        this.tags = [];
        if (params['tags']) {
          this.tags = params['tags'].split(',');
        }
        this.searchPosts(this.tags);
      }
    ));

    this.watcher.add(this.responsive.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => this.isHandset = result.matches));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  searchPosts(tags: string[]) {
    this.postsLoading = true;
    this.postsService.getAllByTags(tags).then(posts => {
      this.posts = posts;
    }).finally(() => {
      this.postsLoading = false;
    }).then(async () => {
      this.coverUrls = await this.storageService.getSignedUrls(StorageService.BucketName.POST_COVERS, this.posts.map(post => post.cover).filter(Boolean) as string[]);
    });
  }

  navigateToPostCreation() {
    this.router.navigate(['/', 'posts', 'create']);
  }

  navigateToSearchPosts() {
    const navigationExtras: NavigationExtras = {
      queryParams: {'tags': this.tags.length ? this.tags.join(',') : undefined},
    };

    this.router.navigate(['/', 'posts', 'search'], navigationExtras);
  }

  navigateToPost(postId: number) {
    this.router.navigate(['/', 'posts', postId]);
  }

  handleTagFilterClick(tag: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {'tags': tag},
    };

    this.router.navigate(['/posts'], navigationExtras);
  }

  handleTagRemoveClick(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);

    const navigationExtras: NavigationExtras = {
      queryParams: {'tags': this.tags.length ? this.tags.join(',') : undefined},
    };

    this.router.navigate(['/posts'], navigationExtras);
  }

}
