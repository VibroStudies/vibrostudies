import { Injectable } from '@angular/core';
const appSettings = require('@nativescript/core/application-settings');

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	get(key: string) {
        return appSettings.getString(key);
    }
    
    set(key: string, data: string) {
        appSettings.setString(key, data);
    }

    clear() {
        appSettings.clear();
    }

    remove(key: string) {
        appSettings.remove(key);
    }
}
