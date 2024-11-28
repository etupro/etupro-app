import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../../shared/services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';
import { MatIcon } from '@angular/material/icon';
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
import { EmitorStatusPipe } from '../../../../shared/pipes/emitor-status/emitor-status.pipe';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    PostCardComponent,
    MatFabButton,
    MatIcon,
    MatToolbar,
    MatChipSet,
    MatChip,
    MatChipRemove,
    MatBadge,
    EmitorStatusPipe,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  coverUrls: Map<string, string> = Map<string, string>();
  query: QueryPostTags = new QueryPostTags();
  department: Department | null = null;
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
      this.query = QueryPostTags.fromQueryParams(params);
      this.searchDepartment();
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
    this.postsService.getAllByTags(this.query).then(posts => {
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
    if (this.query.departmentId) {
      this.departmentsService.getById(this.query.departmentId).then(department => {
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
    const navigationExtras: NavigationExtras = {
      queryParams: this.query.toQueryParams(),
    };

    this.router.navigate(['/', 'posts', 'search'], navigationExtras);
  }

  navigateToPost(postId: number) {
    this.router.navigate(['/', 'posts', postId]);
  }

  navigateToOrganization(organizationId: number) {
    this.router.navigate(['/', 'organizations', organizationId]);
  }

  handleEmitorStatusRemoveClick() {
    this.query.emitorStatus = undefined;

    this.queryNavigation(this.query);
  }

  handleDepartmentRemoveClick() {
    this.query.departmentId = undefined;

    this.queryNavigation(this.query);
  }

  handleTagRemoveClick(tag: string) {
    if (this.query.tags) {
      this.query.tags = this.query.tags.filter(t => t !== tag);

      this.queryNavigation(this.query);
    }
  }

  queryNavigation(query: QueryPostTags) {
    const navigationExtras: NavigationExtras = {
      queryParams: query.toQueryParams()
    };
    this.router.navigate(['/posts'], navigationExtras);
  }

}
