import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentInformationsFormModel } from '../models/student-informations-form.model';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { MatIcon } from '@angular/material/icon';
import { StudentInformation } from '../../../models/student-information';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatIcon,
    MatChipGrid
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnChanges {

  @Input() studentInformations: StudentInformation | null = null;
  @Input() form!: FormGroup<StudentInformationsFormModel>;

  readonly separatorKeysCodes = [ENTER] as const;
  newSkill = new FormControl('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentInformations']) {
      if (this.studentInformations) {
        this.form.setValue({
          study_institute: this.studentInformations.study_institute,
          study_level: this.studentInformations.study_level,
          study_label: this.studentInformations.study_label,
          skills: this.studentInformations.skills,
        });
      }

    }
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const skills = this.form.controls.skills.value || [];
      this.form.controls.skills.setValue([...skills, value]);
      this.form.controls.skills.markAsDirty();
    }

    event.chipInput!.clear();
    this.newSkill.reset();
  }

  removeSkill(skill: string): void {
    const skills = this.form.controls.skills.value || [];
    const index = skills.indexOf(skill);

    if (index >= 0) {
      skills.splice(index, 1);
      this.form.controls.skills.setValue(skills);
      this.form.controls.skills.markAsDirty();
    }
  }
}
