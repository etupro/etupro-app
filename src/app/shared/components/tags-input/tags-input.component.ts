import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith} from "rxjs";
import {ReferencesService} from "../../services/references.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  @Input('control') tagsControl = new FormControl<string[]>([]);
  tagControl = new FormControl<string>('');

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  filteredTags: Observable<string[]>;
  allTags: Set<string> = new Set();

  constructor(private referencesService: ReferencesService) {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : Array.from(this.allTags))),
    );
  }

  ngOnInit() {
    this.referencesService.getTags().subscribe(allTags => this.allTags = allTags);
    this.tags = this.tagsControl.value ?? [];
    this.tagsControl.valueChanges.subscribe(modules => {
      this.tags = modules ?? [];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.allTags.add(tag)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    if (this.tagInput) this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return Array.from(this.allTags).filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
