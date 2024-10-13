import { Component, Input, OnInit } from '@angular/core';
import { AutocompleteInputComponent } from '../autocomplete-input.component';
import { FormControl } from '@angular/forms';
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'app-tags-autocomplete-inputs',
  standalone: true,
  imports: [
    AutocompleteInputComponent
  ],
  templateUrl: './tags-autocomplete-inputs.component.html',
  styleUrl: './tags-autocomplete-inputs.component.scss'
})
export class TagsAutocompleteInputsComponent implements OnInit {

  @Input() valuesControl = new FormControl<string[]>([]);

  allTags: string[] = [];

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.tagsService.getAll().then(tags => {
      this.allTags = tags.map(d => d.value) ?? [];
    });
  }
}
