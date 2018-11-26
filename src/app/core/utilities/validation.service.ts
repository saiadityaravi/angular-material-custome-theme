import { Injectable } from '@angular/core';
import { 
  FormControl,
  FormGroup,
  AbstractControl,
  ValidatorFn
}                     from '@angular/forms';
@Injectable()
export class ValidationService {

  /**
   * Validates email address
   *
   * @param formControl
   */
  public static validateEmail(regexp: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }
        return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
    };
}


  /**
   * Validates required numeric values
   *
   * @param formControl
   */
  public numericRequired(formControl: FormControl): {[error: string]: any} {
    return (formControl.value && formControl.value > 0) ? null : { numericRequired: { valid: false } };
  }

  /**
   * Validates matching string values
   *
   * @param controlKey
   * @param matchingControlKey
   */
  public matchingPasswords(controlKey: string, matchingControlKey: string): {[error: string]: any} {
    return (group: FormGroup): {[key: string]: any} => {
      if (group.controls[controlKey].value !== group.controls[matchingControlKey].value) {
        return { mismatch: { valid: false } };
      }
    }
  }
}