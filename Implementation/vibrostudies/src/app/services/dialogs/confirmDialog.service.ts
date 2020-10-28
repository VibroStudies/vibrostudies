import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface Message {
    message: string;
}


@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {

    constructor(public dialog: MatDialog) {
    }

    async openDialog(msg: string): Promise<boolean> {
        let isConfirmed = false;
        const dialogRef = this.dialog.open(DialogTemplate,
            { data: { message: msg } }
        );
        await dialogRef.afterClosed().toPromise().then(result => {
            isConfirmed = result;
        });
        return isConfirmed;
    }
}



@Component({
    selector: 'dialog-template',
    templateUrl: 'dialog-template.html',
})
export class DialogTemplate {

    constructor(
        public dialogRef: MatDialogRef<DialogTemplate>, @Inject(MAT_DIALOG_DATA) public data: Message) { }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
