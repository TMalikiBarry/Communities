import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmEqualValidator(main: string, toConfirm: string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(main) || !ctrl.get(toConfirm)) {
      return {
        confirmEqual: 'Invalid control names'
      }
    }

    const mainValue = ctrl.get(main)?.value;
    const confirmValue = ctrl.get(toConfirm)?.value;
    return confirmValue === mainValue ? null : {
      confirmEqual: {
        main: mainValue,
        confirm: confirmValue
      }
    }
  }
}
