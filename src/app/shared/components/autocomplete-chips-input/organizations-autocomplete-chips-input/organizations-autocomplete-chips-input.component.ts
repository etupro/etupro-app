import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutocompleteChipsInputComponent } from '../autocomplete-chips-input.component';
import { OrganizationsService } from '../../../services/organizations.service';
import { SelectElement } from '../../../models/select-element.model';

@Component({
  selector: 'app-organizations-autocomplete-chips-input',
  standalone: true,
  imports: [
    AutocompleteChipsInputComponent,
  ],
  templateUrl: './organizations-autocomplete-chips-input.component.html',
  styleUrl: './organizations-autocomplete-chips-input.component.scss'
})
export class OrganizationsAutocompleteChipsInputComponent implements OnInit {

  @Input() label = 'valeur';
  @Input() valuesControl = new FormControl<number[]>([], {nonNullable: true});
  @Input() readonly = false;

  allOrganizations: SelectElement<number>[] = [];

  constructor(private organizationsService: OrganizationsService) {
  }

  ngOnInit() {
    this.organizationsService.getAll().then(organizations => {
      this.allOrganizations = organizations.map(o => {
        return {
          value: o.id,
          label: o.name
        };
      }) ?? [];
    });
  }
}
