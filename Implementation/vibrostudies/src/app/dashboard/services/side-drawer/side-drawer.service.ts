import { Injectable } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Injectable({
    providedIn: 'root'
})
/**
 * Der SideDrawerService ruft eine Seitenleiste auf oder schließt ihn gegebenfalls.
 */
export class SideDrawerService {
    /**
     * Eine Seitenleiste von Nativescript.
     */
    drawer: RadSideDrawer;
    /**
     * boolean, ob die Seitenleiste geöffent ist.
     */
    isOpen: boolean = false;
    /**
     * string für den Titel der Seitenleiste.
     */
    title: string = "";

    /**
     * Standardkonstruktor für den SideDrawer
     */
    constructor() { }

    /**
     * Öffnet die Seitenleiste.
     */
    openDrawer() {
        this.isOpen = true;
        this.drawer.showDrawer();
    }

    /**
     * Schließt die Seitenleiste.
     */
    closeDrawer() {
        this.isOpen = false;
        this.drawer.closeDrawer();
    }

    /**
     * Wechselt die Seitenleiste.
     */
    switchDrawer() {
        if (this.isOpen) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }
}
