import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { passwordConfirmationValidator } from "../../../shared/validators/password-confirmation.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  redirect = ['/posts'];

  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
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

    const displayName = this.registerForm.value.firstname + ' ' + this.registerForm.value.lastname;
    const email = this.registerForm.value.email ?? '';
    const password = this.registerForm.value.password ?? '';

    await this.authService.register(displayName, email, password);
    this.router.navigate(this.redirect);
  }
}
