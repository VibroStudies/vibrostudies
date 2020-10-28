import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
/**
 * Der StorageService verwaltet die Speicherung, Bearbeitung und Löschen von Items, welche
 * im lokalen Speicher der Sitzung abgelegt werden.
 */
export class StorageService {

	/**
	 * Standardkonstruktor eines Services
	 */
	constructor() { }

	/**
	 * Gibt das Item, welches den Schlüssel hat, aus dem lokalen Speicher zurück.
	 * @param key string ist der Schlüssel des Items
	 * @returns string des Items
	 * @throws Error sobald das zurückgegebene Item null ist
	 */
	get(key: string) {
		const item = localStorage.getItem(key);
		if(item == null) {
			throw new Error("No such data with given key found in local storage.");
		}
		return localStorage.getItem(key);
	}

	/**
	 * Legt ein Item im lokalen Speicher ab.
	 * @param key string ist der Schlüssel des Items
	 * @param data string sind die Nutzdaten des Items
	 * @throws Error sobald key oder data null oder undefined ist
	 */
	set(key: string, data: string) {
		if((key == null) || (data == null)) {
			throw new Error("Key or data is null or undefined.");
		}
		localStorage.setItem(key, data);
	}

	/**
	 * Löscht alle abgelegten Items innerhalb des lokalen Speichers.
	 */
	clear() {
		localStorage.clear();
	}

	/**
	 * Löscht ein Item, welches den Schlüssel hat, aus dem lokalen Speicher.
	 * @param key String ist der Schlüssel des Items
	 */
	remove(key: string) {
		localStorage.removeItem(key);
	}
}
