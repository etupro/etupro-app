import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { passwordConfirmationValidator } from '../../../shared/validators/password-confirmation.validator';
import { AuthService } from '../../../shared/services/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class PasswordChangeComponent {

  passwordChangeForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
    updateOn: 'submit',
    validators: [passwordConfirmationValidator()]
  });

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private authService: AuthService,
              private snackbarService: SnackbarService,
              private router: Router) {
  }

  async changePassword() {
    const password = this.passwordChangeForm.value.password;

    if (!this.passwordChangeForm.valid || !password) {
      return;
    }

    await this.authService.updateUserPassword(password);
    this.snackbarService.openSnackBar('Votre mot de passe a été modifié');

    await this.authService.logout();
    await this.router.navigate(['/', 'auth', 'login']);
  }
}
