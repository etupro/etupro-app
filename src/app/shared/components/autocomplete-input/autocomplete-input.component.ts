import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { map, Observable, startWith } from "rxjs";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteInputComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement> | undefined;

  @Input() label = 'valeur';
  @Input() allValues: string[] = [];
  @Input() valuesControl = new FormControl<string[]>([]);

  valueControl = new FormControl<string>('');
  values: string[] = [];
  filteredValues$: Observable<string[]>;

  constructor() {
    this.filteredValues$ = this.valueControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this._filter(value) : Array.from(this.allValues))),
    );
  }

  ngOnInit() {
    this.values = this.valuesControl.value ?? [];
    this.valuesControl.valueChanges.subscribe(values => {
      this.values = values ?? [];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.values.push(value);
    }

    event.chipInput.clear();
    this.valueControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.values.indexOf(tag);

    if (index >= 0) {
      this.values.splice(index, 1);
    }

    this.allValues.push(tag)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.values.push(event.option.viewValue);
    if (this.valueInput) this.valueInput.nativeElement.value = '';
    this.valueControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allValues.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
