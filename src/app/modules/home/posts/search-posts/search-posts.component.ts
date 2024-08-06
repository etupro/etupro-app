import { Component } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutocompleteInputComponent } from "../../../../shared/components/autocomplete-input/autocomplete-input.component";
import { TagsAutocompleteInputsComponent } from "../../../../shared/components/autocomplete-input/tags-autocomplete-inputs/tags-autocomplete-inputs.component";
import { NavigationExtras, Router } from "@angular/router";

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
    ReactiveFormsModule
  ],
  templateUrl: './search-posts.component.html',
  styleUrl: './search-posts.component.scss'
})
export class SearchPostsComponent {

  searchForm = new FormGroup({
    tags: new FormControl<string[]>([], {nonNullable: true})
  })

  constructor(private router: Router) {
  }

  handleGoBack() {
    const lastNav = this.router.lastSuccessfulNavigation;
    const previousRoute = lastNav?.previousNavigation?.finalUrl;

    if (previousRoute) {
      this.router.navigateByUrl(previousRoute);
    } else {
      this.router.navigate(['/', 'posts'])
    }


  }

  handleSubmit() {
    const navigationExtras: NavigationExtras = {
      queryParams: {'session_id': null},
    };

    this.router.navigate(['/posts'], navigationExtras);
  }
}
