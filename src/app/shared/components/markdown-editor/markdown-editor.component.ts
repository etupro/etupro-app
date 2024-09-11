import { Component, Input } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MarkdownComponent } from 'ngx-markdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-markdown-editor',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MarkdownComponent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss'
})
export class MarkdownEditorComponent {

  @Input() controller: FormControl<string> = new FormControl('', {nonNullable: true});

}
