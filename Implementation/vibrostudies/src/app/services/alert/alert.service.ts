import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private snackBar: MatSnackBar) { }

    async alert(message: string): Promise<boolean> {
        let result = false;
        await this.snackBar.open(message, "Ok", {panelClass: "snackbar-style"}).afterDismissed().toPromise().then(response => {
            if (response.dismissedByAction) {
                result = true;
            }
        });
        return result;
    }
}
