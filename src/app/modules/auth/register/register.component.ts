import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { passwordConfirmationValidator } from "../../../shared/validators/password-confirmation.validator";
import { CommonModule } from "@angular/common";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatButton,
    MatError,
    MatLabel
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  redirect = ['/posts'];

  registerForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
    updateOn: "submit",
    validators: [passwordConfirmationValidator()]
  })

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  async register() {
    if (!this.registerForm.valid) {
      return;
    }

    const displayName = this.registerForm.value.displayName ?? '';
    const email = this.registerForm.value.email ?? '';
    const password = this.registerForm.value.password ?? '';

    await this.authService.register(displayName, email, password);
    this.router.navigate(this.redirect);
  }
}
