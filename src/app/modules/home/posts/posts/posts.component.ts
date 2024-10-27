import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../../shared/services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../../../shared/components/navidation/navigation.component';
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
import { Department } from '../../../../shared/models/department.model';
import { DepartmentsService } from '../../../../shared/services/departments.service';
import { QueryPostTags } from '../../../../shared/models/query-post-tags.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
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
  departmentId: number | undefined = undefined;
  department: Department | null = null;
  tags: string[] = [];
  postsLoading = false;
  isHandset = false;

  watcher = new Subscription();

  constructor(private postsService: PostsService,
              private storageService: StorageService,
              private departmentsService: DepartmentsService,
              private router: Router,
              private route: ActivatedRoute,
              private responsive: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.watcher.add(this.route.queryParams.subscribe(params => {
      this.departmentId = params['departmentId'] ? parseInt(params['departmentId'], 10) : undefined;
      this.searchDepartment();
      this.tags = params['tags'] ? params['tags'].split(',') : [];
      this.searchPosts();
      }
    ));

    this.watcher.add(this.responsive.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => this.isHandset = result.matches));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  searchPosts() {
    this.postsLoading = true;
    this.postsService.getAllByTags(this.departmentId, this.tags).then(posts => {
      this.posts = posts;
    }).finally(() => {
      this.postsLoading = false;
    }).then(async () => {
      const covers = this.posts.map(post => post.cover).filter(Boolean) as string[];
      if (covers.length > 0) {
        this.coverUrls = await this.storageService.getSignedUrls(StorageService.BucketName.POST_COVERS, covers);
      }
    });
  }

  searchDepartment() {
    if (this.departmentId) {
      this.departmentsService.getById(this.departmentId).then(department => {
        this.department = department;
      });
    } else {
      this.department = null;
    }
  }

  navigateToPostCreation() {
    this.router.navigate(['/', 'posts', 'create']);
  }

  navigateToSearchPosts() {
    const query: QueryPostTags = new QueryPostTags({
      departmentId: this.departmentId,
      tags: this.tags,
    });

    const navigationExtras: NavigationExtras = {
      queryParams: query.toQueryParams(),
    };

    this.router.navigate(['/', 'posts', 'search'], navigationExtras);
  }

  navigateToPost(postId: number) {
    this.router.navigate(['/', 'posts', postId]);
  }

  handleDepartmentRemoveClick() {
    const query: QueryPostTags = new QueryPostTags({
      tags: this.tags,
    });

    this.queryNavigation(query);
  }

  handleTagRemoveClick(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);

    const query: QueryPostTags = new QueryPostTags({
      departmentId: this.departmentId ?? undefined,
      tags: this.tags,
    });

    this.queryNavigation(query);
  }

  queryNavigation(query: QueryPostTags) {
    const navigationExtras: NavigationExtras = {
      queryParams: query.toQueryParams()
    };
    this.router.navigate(['/posts'], navigationExtras);
  }

}
