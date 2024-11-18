import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TagsService } from '../../../services/tags.service';
import { AutocompleteChipsInputComponent } from '../autocomplete-chips-input.component';
import { SelectElement } from '../../../models/select-element.model';

@Component({
  selector: 'app-tags-autocomplete-chips-input',
  standalone: true,
  imports: [
    AutocompleteChipsInputComponent,
  ],
  templateUrl: './tags-autocomplete-chips-input.component.html',
  styleUrl: './tags-autocomplete-chips-input.component.scss'
})
export class TagsAutocompleteChipsInputComponent implements OnInit {

  @Input() label = 'valeur';
  @Input() valuesControl = new FormControl<string[]>([], {nonNullable: true});
  @Input() readonly = false;

  allTags: SelectElement<string>[] = [];

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.tagsService.getAll().then(tags => {
      this.allTags = tags.map(d => {
        return {
          value: d.value,
          label: d.value
        };
      }) ?? [];
    });
  }
}
