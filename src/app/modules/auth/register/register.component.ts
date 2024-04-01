import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {Router} from "@angular/router";

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
    validators: [passwordConfirmationValidator]
  })

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private auth: Auth, private router: Router) {
  }

  async register() {
    if (!this.registerForm.valid) {
      return;
    }

    const value = this.registerForm.value;

    try {
      const userCreds = await createUserWithEmailAndPassword(this.auth, value.email!, value.password!);
      await updateProfile(userCreds.user, {displayName: value.firstname + ' ' + value.lastname})
      await signInWithEmailAndPassword(this.auth, value.email!, value.password!)
    } catch (error: any) {
      console.log(error.message);
      return;
    }
    this.router.navigate(this.redirect);
  }
}

const passwordConfirmationValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value
    ? null
    : {passwordMismatch: true};
};
