/// <reference path="../../node_modules/@nativescript/types-android/lib/android-26.d.ts" />

import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { AppSettingsService } from './services/app-settings/app-settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private appSettingsService: AppSettingsService) {

    }

    ngOnInit() {
        this.appSettingsService.vibrator = Application.android.context.getSystemService(android.content.Context.VIBRATOR_SERVICE);
        if (this.appSettingsService.vibrator) {
            this.appSettingsService.hasAmplitude = Application.android.context.getSystemService(android.content.Context.VIBRATOR_SERVICE).hasAmplitudeControl();
            this.appSettingsService.hasVibrator = Application.android.context.getSystemService(android.content.Context.VIBRATOR_SERVICE).hasVibrator();
        }
    }

}
