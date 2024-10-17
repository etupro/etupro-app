import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../../shared/services/auth.service';
import { MatButton } from '@angular/material/button';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatError,
    MatLabel
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {

  passwordResetForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  }, {
    updateOn: 'submit'
  });

  constructor(private authService: AuthService,
              private snackbarService: SnackbarService) {
  }

  async resetPassword(): Promise<void> {
    const email = this.passwordResetForm.value.email;

    if (this.passwordResetForm.invalid || !email) {
      return;
    }

    await this.authService.resetPassword(email);
    this.snackbarService.openSnackBar('Un email de réinitialisation de mot de passe vous a été envoyé');
  }

}
