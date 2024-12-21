import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutocompleteChipsInputComponent } from '../autocomplete-chips-input.component';
import { OrganizationsService } from '../../../services/organizations.service';
import { SelectElement } from '../../../models/select-element.model';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-organizations-autocomplete-chips-input',
  standalone: true,
  imports: [
    AutocompleteChipsInputComponent,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './organizations-autocomplete-chips-input.component.html',
  styleUrl: './organizations-autocomplete-chips-input.component.scss'
})
export class OrganizationsAutocompleteChipsInputComponent implements OnInit {

  @Input() label = 'valeur';
  @Input() valuesControl = new FormControl<number[]>([], {nonNullable: true});
  @Input() readonly = false;

  allOrganizations: SelectElement<number>[] = [];

  constructor(private organizationsService: OrganizationsService,
              private router: Router) {
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

  addOrganization() {
    this.router.navigate(['/', 'home', 'organizations', 'new']);
  }
}
