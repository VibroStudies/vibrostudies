import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/**
 * Der AppSettingsService verwaltet die Speicherung und Bearbeitung
 * der App-Einstellungn. Zu diesen Einstellungen zählt, ob das mobile Endgerät vibrieren kann
 * und ob sie Amplituden unterstützt.
 */
export class AppSettingsService {
    private _hasVibrator = false;
    private _hasAmplitude = false;
    /**
     * any-Objekt für das Vibrator-Objekt, den man zum Vibrieren des Handys braucht.
     */
    vibrator: any;

    get hasVibrator(): boolean {
        return this._hasVibrator;
    }

    set hasVibrator(hasVibrator: boolean) {
        if (hasVibrator == null) {
            throw new Error("Setting hasVibrator to null or undefined is not allowed.");
        }
        this._hasVibrator = hasVibrator;
    }

    get hasAmplitude(): boolean {
        return this._hasAmplitude;
    }

    set hasAmplitude(hasAmplitude: boolean) {
        if (hasAmplitude == null) {
            throw new Error("Setting hasAmplitude to null or undefined is not allowed.");
        }
        this._hasAmplitude = hasAmplitude;
    }

    /**
     * Standardkonstruktor für den AppSettingsService.
     */
    constructor() { }

}
