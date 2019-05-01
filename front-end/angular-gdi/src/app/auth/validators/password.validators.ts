import { AbstractControl } from '@angular/forms';

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  const PASSWORD_REGEXP = /^[a-zA-Z0-9]{3,30}$/;

  if (
    control.value &&
    (control.value.length <= 5 || !PASSWORD_REGEXP.test(control.value))
  ) {
    return { malformedPassword: true };
  }

  return null;
}
