import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class NumberErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        let success = true;
        let value = Number(control.value);
        if (!value && value != 0) {
            success = false;
        }
        return !success || !control.valid;
    }
}