import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordConfirmationValidator(passwordControlName = 'password', confirmPasswordControlName = 'confirmPassword'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordControlName);
    const confirmPassword = control.get(confirmPasswordControlName);

    return password?.value === confirmPassword?.value
      ? null
      : {passwordMismatch: true};
  };
}
