import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgForOf, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { SelectElement } from '../../models/select-element.model';

@Component({
  selector: 'app-autocomplete-chips-input',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    NgForOf,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './autocomplete-chips-input.component.html',
  styleUrl: './autocomplete-chips-input.component.scss'
})
export class AutocompleteChipsInputComponent<T> implements OnInit, OnChanges, OnDestroy {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement> | undefined;

  @Input() label = 'valeur';
  @Input() valuesControl = new FormControl<T[]>([], {nonNullable: true});
  @Input() allValues: SelectElement<T>[] = [];
  @Input() readonly = false;
  @Input() allowNewValue = false;

  inputControl = new FormControl<string>('');
  selectedElements: SelectElement<T>[] = [];
  filteredValues: string[];

  watcher = new Subscription();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allValues']) {
      this.filteredValues = this.inputControl.value ? this._filter(this.inputControl.value) : Array.from(this.allValues.map(v => v.label));
      this.selectedElements = this.valuesControl.value.map(v => this.allValues.filter(av => av.value === v).pop() ?? {
        value: v,
        label: v + ''
      });
    }
  }

  ngOnInit() {
    this.watcher.add(this.inputControl.valueChanges.subscribe(value => this.filteredValues = value ? this._filter(value) : Array.from(this.allValues.map(v => v.label))));

    this.selectedElements = this.valuesControl.value.map(v => this.allValues.filter(av => av.value === v).pop() ?? {
      value: v,
      label: v + ''
    });
    this.watcher.add(this.valuesControl.valueChanges.subscribe(values => {
      this.selectedElements = values.map(v => this.allValues.filter(av => av.value === v).pop() ?? {
        value: v,
        label: v + ''
      });
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const newValue = (event.value || '').trim();

    if (newValue) {
      const values = this.valuesControl.value ?? [];
      let value = this.allValues.filter(v => v.label === newValue).pop()?.value;

      if (this.allowNewValue) value = value ?? newValue as T;

      if (value && !values.includes(value)) {
        values.push(value);
        this.valuesControl.setValue(values);
        event.chipInput.clear();
        this.inputControl.setValue(null);
      }
    }
  }

  remove(tag: T): void {
    const values = this.valuesControl.value ?? [];
    const index = values.indexOf(tag);

    if (index >= 0) {
      values.splice(index, 1);
      this.valuesControl.setValue(values);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const values = this.valuesControl.value ?? [];
    const value = this.allValues.filter(v => v.label === event.option.viewValue).pop()?.value;
    if (value && !values.includes(value)) {
      values.push(value);
      this.valuesControl.setValue(values);
      if (this.valueInput) this.valueInput.nativeElement.value = '';
      this.inputControl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allValues
      .filter(value => value.label.toLowerCase().includes(filterValue))
      .map(v => v.label);
  }
}
