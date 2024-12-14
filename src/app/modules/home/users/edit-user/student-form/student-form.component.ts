import { Component, Input } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentInformationsFormModel } from '../models/student-informations-form.model';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { MatIcon } from '@angular/material/icon';

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
export class StudentFormComponent {

  @Input() form!: FormGroup<StudentInformationsFormModel>;

  readonly separatorKeysCodes = [ENTER] as const; // Define Enter and Comma as separators
  newSkill = new FormControl(''); // Temporary input for adding a new skill

  // Add a new skill to the form control's value
  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const skills = this.form.controls.skills.value || [];
      this.form.controls.skills.setValue([...skills, value]);
      this.form.controls.skills.markAsDirty();
    }

    // Clear the input field
    event.chipInput!.clear();
    this.newSkill.reset();
  }

  // Removes a skill from the list
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
