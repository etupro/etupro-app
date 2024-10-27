import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TagsService } from '../../services/tags.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tags-autocomplete-chips-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    TitleCasePipe,
    ReactiveFormsModule,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatLabel,
    MatChipRemove,
  ],
  templateUrl: './tags-autocomplete-chips-input.component.html',
  styleUrl: './tags-autocomplete-chips-input.component.scss'
})
export class TagsAutocompleteChipsInputComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement> | undefined;

  @Input() label = 'valeur';
  @Input() valuesControl = new FormControl<string[]>([]);

  tagInputControl = new FormControl<string>('');
  values: string[] = [];
  filteredValues: string[];
  allTags: string[] = [];

  watcher = new Subscription();

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.tagsService.getAll().then(tags => {
      this.allTags = tags.map(d => d.value) ?? [];
      this.filteredValues = this.tagInputControl.value ? this._filter(this.tagInputControl.value) : Array.from(this.allTags);
    });

    this.watcher.add(this.tagInputControl.valueChanges.subscribe(value => this.filteredValues = value ? this._filter(value) : Array.from(this.allTags)));

    this.values = this.valuesControl.value ?? [];
    this.watcher.add(this.valuesControl.valueChanges.subscribe(values => {
      this.values = values ?? [];
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.values.push(value);
      this.valuesControl.setValue(this.values);
    }

    event.chipInput.clear();
    this.tagInputControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.values.indexOf(tag);

    if (index >= 0) {
      this.values.splice(index, 1);
      this.valuesControl.setValue(this.values);
    }

    this.allTags.push(tag);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.values.push(event.option.viewValue);
    this.valuesControl.setValue(this.values);
    if (this.valueInput) this.valueInput.nativeElement.value = '';
    this.tagInputControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
