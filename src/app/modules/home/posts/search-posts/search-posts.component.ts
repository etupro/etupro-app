import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteInputComponent } from '../../../../shared/components/autocomplete-input/autocomplete-input.component';
import { TagsAutocompleteInputsComponent } from '../../../../shared/components/autocomplete-input/tags-autocomplete-inputs/tags-autocomplete-inputs.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatCard, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-posts-search',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    SearchBarComponent,
    MatButton,
    AutocompleteInputComponent,
    TagsAutocompleteInputsComponent,
    FormsModule,
    ReactiveFormsModule,
    MatToolbar,
    MatFabButton,
    MatCard,
    MatCardTitle
  ],
  templateUrl: './search-posts.component.html',
  styleUrl: './search-posts.component.scss'
})
export class SearchPostsComponent implements OnInit, OnDestroy {

  searchForm = new FormGroup({
    tags: new FormControl<string[]>([], {nonNullable: true})
  });

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
        if (params['tags']) {
          this.previousTags = params['tags'].split(',');
          this.searchForm.controls.tags.setValue(this.previousTags);
        }
      }
    ));

    this.watcher.add(this.responsive.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => this.isHandset = result.matches));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  handleGoBack() {
    const navigationExtras: NavigationExtras = {
      queryParams: {'tags': this.previousTags.length ? this.previousTags.join(',') : undefined},
    };

    this.router.navigate(['/posts'], navigationExtras);
  }

  handleSubmit() {
    const navigationExtras: NavigationExtras = {
      queryParams: {'tags': this.searchForm.value.tags?.length ? this.searchForm.value.tags.join(',') : undefined},
    };

    this.router.navigate(['/posts'], navigationExtras);
  }
}
