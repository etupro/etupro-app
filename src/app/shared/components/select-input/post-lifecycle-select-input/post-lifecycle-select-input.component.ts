import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectElement } from '../../../models/select-element.model';
import { SelectInputComponent } from '../select-input.component';
import { PostLifecycle } from '../../../models/enum/post_lifecycle.enum';
import { PostLifecyclePipe } from '../../../pipes/post-lifecycle/post-lifecycle.pipe';

@Component({
  selector: 'app-post-lifecycle-select-input',
  standalone: true,
  imports: [
    SelectInputComponent
  ],
  templateUrl: './post-lifecycle-select-input.component.html',
  styleUrl: './post-lifecycle-select-input.component.scss'
})
export class PostLifecycleSelectInputComponent {

  @Input() valueControl = new FormControl<string | null>(null);
  @Input() readonly = false;
  @Input() required = true;

  emitorStatuses: SelectElement<PostLifecycle>[] = [
    {value: 'OPEN', label: this.postLifecyclePipe.transform('OPEN')},
    {value: 'ONGOING', label: this.postLifecyclePipe.transform('ONGOING')},
    {value: 'FINISHED', label: this.postLifecyclePipe.transform('FINISHED')},
  ];

  constructor(private postLifecyclePipe: PostLifecyclePipe) {
  }

}
