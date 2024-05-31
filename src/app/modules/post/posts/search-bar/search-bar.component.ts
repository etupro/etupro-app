import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() searchUpdate = new EventEmitter<string>();

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

}
