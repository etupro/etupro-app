import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { TagsAutocompleteChipsInputComponent } from '../../../../shared/components/tags-autocomplete-chips-input/tags-autocomplete-chips-input.component';
import { DepartmentAutocompleteInputComponent } from '../../../../shared/components/select-input/department-autocomplete-input/department-autocomplete-input.component';
import { QueryPostTags } from '../../../../shared/models/query-post-tags.model';
import { EmitorStatusSelectInputComponent } from '../../../../shared/components/select-input/emitor-status-select-input/emitor-status-select-input.component';

@Component({
  selector: 'app-posts-search',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatButton,
    TagsAutocompleteChipsInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    DepartmentAutocompleteInputComponent,
    EmitorStatusSelectInputComponent
  ],
  templateUrl: './search-posts.component.html',
  styleUrl: './search-posts.component.scss'
})
export class SearchPostsComponent implements OnInit, OnDestroy {

  searchForm = new FormGroup({
    departmentId: new FormControl<number | null>(null),
    emitorStatus: new FormControl<string | null>(null),
    tags: new FormControl<string[]>([], {nonNullable: true})
  });

  previousQuery = new QueryPostTags();
  isHandset = false;

  watcher = new Subscription();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private responsive: BreakpointObserver) {
  }

  ngOnInit() {
    this.watcher.add(this.route.queryParams.subscribe(params => {
        this.searchForm.reset();

      this.previousQuery = QueryPostTags.fromQueryParams(params);

      this.searchForm.setValue({
        departmentId: this.previousQuery.departmentId ?? null,
        emitorStatus: this.previousQuery.emitorStatus ?? null,
        tags: this.previousQuery.tags ?? [],
      });
      }
    ));

    this.watcher.add(this.responsive.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => this.isHandset = result.matches));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  handleGoBack() {
    this.queryNavigation(this.previousQuery);
  }

  handleSubmit() {
    const query: QueryPostTags = new QueryPostTags({
      departmentId: this.searchForm.value.departmentId ?? undefined,
      emitorStatus: this.searchForm.value.emitorStatus ?? undefined,
      tags: this.searchForm.value.tags ?? undefined,
    });

    this.queryNavigation(query);
  }

  handleReset() {
    this.searchForm.reset();
  }

  queryNavigation(query: QueryPostTags) {
    const navigationExtras: NavigationExtras = {
      queryParams: query.toQueryParams()
    };
    this.router.navigate(['/posts'], navigationExtras);
  }
}
