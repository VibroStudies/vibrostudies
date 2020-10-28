import { Injectable } from '@angular/core';
import { Dialogs } from '@nativescript/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor() { }

    async alert(message: string): Promise<boolean> {
        let result = false;
        await Dialogs.alert({message: message, title: "Achtung", okButtonText: "Alles klar"}).then(response => {
            result = true;
        });
        return result;
    }
}
