import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators {
  static equalValues = (first: string, second: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(first);
      const secondControl = control.get(second);

      if (firstControl?.value !== secondControl?.value) {
        return { equalValues: true };
      }
      return null;
    };
  };
}
