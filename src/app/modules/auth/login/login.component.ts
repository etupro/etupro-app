import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { CommonModule } from "@angular/common";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  redirect = ['/posts'];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
    updateOn: "submit"
  })

  hide = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    await this.authService.login(email, password);
    this.router.navigate(this.redirect);
  }
}
