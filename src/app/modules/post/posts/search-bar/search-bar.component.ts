import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { TagsService } from "../../../../shared/services/tags.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Output() searchUpdate = new EventEmitter<string[]>();

  allTags: string[] = [];
  watcher = new Subscription();

  searchForm = new FormGroup({
    tags: new FormControl<string[]>([]),
  });

  constructor(private tagsService: TagsService) {
  }

  ngOnInit() {
    this.watcher.add(this.tagsService.updatedSnapshot$.subscribe(snapshot => {
      this.allTags = snapshot?.docs?.map(d => d.data().tag) ?? []
    }));

    this.watcher.add(this.searchForm.valueChanges.subscribe(value => {
      this.searchUpdate.emit(value.tags ?? []);
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
