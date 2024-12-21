import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';

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
    MatError,
    MatAnchor
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  redirect: string | null = null; // Store redirectTo value

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
    updateOn: "submit"
  });

  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to access query params
  ) {
    this.redirect = this.route.snapshot.queryParamMap.get('redirectTo');
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    await this.authService.login(email, password);

    // Redirect to `redirectTo` if present, else default route
    this.router.navigateByUrl(this.redirect || '/');
  }

  // Preserve `redirectTo` when navigating to registration
  navigateToRegister() {
    this.router.navigate(['/auth/register'], {queryParams: {redirectTo: this.redirect ?? undefined}});
  }
}
