import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../../../shared/services/posts.service";
import { Post } from "../../../../shared/models/post.model";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "../../../../shared/components/navidation/navigation.component";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { MatButton, MatFabButton } from "@angular/material/button";
import { PostCardComponent } from "../../../../shared/components/post-card/post-card.component";
import { MatIcon } from "@angular/material/icon";
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";

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
    MatExpansionPanelTitle
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  posts: Post[] = [];
  tags: string[] = [];
  postsLoading = false;

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.tags = [];
        if (params['tags']) {
          this.tags = params['tags'].split(',');
        }
        this.searchPosts(this.tags);
      }
    );
  }

  searchPosts(tags: string[]) {
    this.postsLoading = true;
    this.postsService.getAllByTags(tags).then(response => {
      this.posts = response.data ?? [];
    }).finally(() => {
      this.postsLoading = false
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

  navigateToPost(post: Post) {
    this.router.navigate(['/', 'posts', post.id]);
  }

}
