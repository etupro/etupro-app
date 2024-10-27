import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { TagsAutocompleteChipsInputComponent } from '../../../../shared/components/tags-autocomplete-chips-input/tags-autocomplete-chips-input.component';
import { DepartmentAutocompleteInputComponent } from '../../../../shared/components/department-autocomplete-input/department-autocomplete-input.component';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { QueryPostTags } from '../../../../shared/models/query-post-tags.model';

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
    MatToolbar,
    MatFabButton,
    MatCard,
    MatCardTitle,
    DepartmentAutocompleteInputComponent,
    MatAutocompleteTrigger,
    MatInput
  ],
  templateUrl: './search-posts.component.html',
  styleUrl: './search-posts.component.scss'
})
export class SearchPostsComponent implements OnInit, OnDestroy {

  searchForm = new FormGroup({
    departmentId: new FormControl<number | null>(null),
    tags: new FormControl<string[]>([], {nonNullable: true})
  });

  previousDepartmentId: number | undefined;
  previousTags: string[] = [];
  isHandset = false;

  watcher = new Subscription();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private responsive: BreakpointObserver) {
  }

  ngOnInit() {
    this.watcher.add(this.route.queryParams.subscribe(params => {
        this.searchForm.reset();
      this.previousDepartmentId = params['departmentId'] ? parseInt(params['departmentId'], 10) : undefined;
      this.previousTags = params['tags'] ? params['tags'].split(',') : [];

      this.searchForm.setValue({
        departmentId: this.previousDepartmentId ?? null,
        tags: this.previousTags
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
    const query: QueryPostTags = new QueryPostTags({
      departmentId: this.previousDepartmentId ?? undefined,
      tags: this.previousTags ?? undefined,
    });

    this.queryNavigation(query);
  }

  handleSubmit() {
    const query: QueryPostTags = new QueryPostTags({
      departmentId: this.searchForm.value.departmentId ?? undefined,
      tags: this.searchForm.value.tags ?? undefined,
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
