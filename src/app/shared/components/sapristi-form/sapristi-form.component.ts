import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SapristiFormModel } from './sapristi-form.model';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { SapristiInformation } from '../../models/sapristi-information';

@Component({
  selector: 'app-sapristi-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    NgClass
  ],
  templateUrl: './sapristi-form.component.html',
  styleUrl: './sapristi-form.component.scss'
})
export class SapristiFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input() sapristiInformation: SapristiInformation | null = null;
  @Input() form!: FormGroup<SapristiFormModel>;

  isXs = false;

  watcher = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sapristiInformation']) {
      if (this.sapristiInformation) {
        this.form.setValue({
          external_activity: this.sapristiInformation.external_activity,
          cleaning_help: this.sapristiInformation.cleaning_help,
          banned_places: this.sapristiInformation.banned_places,
          banned_illnesses: this.sapristiInformation.banned_illnesses,
        });
      }

    }
  }

  ngOnInit() {
    this.watcher.add(this.breakpointObserver
      .observe('(min-width: 800px)')
      .subscribe(({matches}) => this.isXs = !matches));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
