import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow } from "@angular/material/chips";
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    ReactiveFormsModule,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatLabel
  ],
})
export class AutocompleteInputComponent implements OnInit, OnChanges {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement> | undefined;

  @Input() label = 'valeur';
  @Input() allValues: string[] = [];
  @Input() valuesControl = new FormControl<string[]>([]);

  tagInputControl = new FormControl<string>('');
  values: string[] = [];
  filteredValues: string[];

  ngOnInit() {
    this.tagInputControl.valueChanges.subscribe(value => this.filteredValues = value ? this._filter(value) : Array.from(this.allValues));

    this.values = this.valuesControl.value ?? [];
    this.valuesControl.valueChanges.subscribe(values => {
      this.values = values ?? [];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allValues']) {
      this.filteredValues = this.tagInputControl.value ? this._filter(this.tagInputControl.value) : Array.from(this.allValues);
    }
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

    this.allValues.push(tag)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.values.push(event.option.viewValue);
    this.valuesControl.setValue(this.values);
    if (this.valueInput) this.valueInput.nativeElement.value = '';
    this.tagInputControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allValues.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
