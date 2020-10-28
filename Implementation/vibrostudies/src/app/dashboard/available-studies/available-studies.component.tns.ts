import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableArray } from '@nativescript/core';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { KeyDataDao } from '@src/app/Model/Study/KeyDataDAO.service';
import { StudyPrototypeDAO } from '@src/app/Model/Study/StudyPrototypeDAO.service';
import { AppSettingsService } from '@src/app/services/app-settings/app-settings.service';
import { AuthService } from '@src/app/services/auth/auth.service';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { SideDrawerService } from '../services/side-drawer/side-drawer.service';

@Component({
    selector: 'app-available-studies',
    templateUrl: './available-studies.component.html',
    styleUrls: ['./available-studies.component.css']
})
/**
 * Die AvailableStudiesComponent ist für das Anzeigen aller verfügbaren Studien zuständig,
 * in welche man teilnehmen kann. Wird eine Studie ausgewählt, so wird die "Studienteilnahme"-Ansicht aufgerufen.
 */
export class AvailableStudiesComponent implements OnInit {
    /**
     * Der Suchschlüssel soll ein Teilwort des Studiennames sein.
     */
    searchKey: string = "";
    /**
     * Die verfügbaren Studien in denen der Nutzer teilnehmen kann.
     */
    availableStudies: ObservableArray<KeyData> = new ObservableArray<KeyData>();

    /**
     * Konstruktor der AvailableStudiesComponent. Darin werden sämtliche Services initialisert,
     * die für die "Verfügbare Studien"-Ansicht gebraucht werden.
     * @param studyDataService KeyDataDao Singleton, um auf die Schlüsselinformationen aller verfügbaren Studien zuzugreifen
     * @param appSettings AppSettingsService Singleton, um auf die nötigen Anwendungseinstellungen zuzugreifen
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param sideDrawer SideDrawerService Singleton, wird für das Ansprechen der Seitenliste gebraucht
     * @param studywrapper StudyWrapperService Singleton, indem die teilzunehmende Studie enthalten ist
     * @param studyService StudyPrototypeDAO Singleton, um auf sämtliche Studien zuzugreifen, die verfügbar sind
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     */
    constructor(private studyDataService: KeyDataDao, private appSettings: AppSettingsService, private authService: AuthService, public sideDrawer: SideDrawerService, private studywrapper: StudyWrapperService, private studyService: StudyPrototypeDAO, private router: Router) { }

    /**
     * Initialisiert die AvailableStudiesComponent.
     */
    async ngOnInit(): Promise<void> {
        this.sideDrawer.title = "Verfügbare Studien";
        this.initialize();
    }

    private async initialize() {
        await this.studyDataService.getAvailableStudies(this.authService.getUser().id, this.appSettings.hasAmplitude).then(result => {
            this.availableStudies = new ObservableArray(result);
        });
    }

    /**
     * Navigiert eine ausgewählte Studie zu ihrerer "Studienteilnahme"-Ansicht.
     * @param studyData KeyData-Objeckt der ausgewählten Studie
     */
    async onReadMore(studyData: KeyData) {
        this.studywrapper.isDemo = false;
        this.studywrapper.study = await this.studyService.get(studyData.id);
        this.router.navigate(["studyparticipation"], { replaceUrl: true });
    }

     /**
     * Aktualisiert die Menge an verfügbaren Studien, durch Runterwischen des Displays.
     * @param event any-Objeckt welches das Runterwischen beinhaltet
     */
    async onPullToRefreshInitiated(event) {
        await this.initialize();
        event.object.notifyPullToRefreshFinished();
    }

    /**
     * Sucht eine Studie an Hand ihrem Namen.
     */
    async searchForStudy() {
        if (this.searchKey != "") {
            await this.initialize();
            this.availableStudies = new ObservableArray(this.availableStudies.filter(element => {
                return element.name.toLowerCase().includes(this.searchKey.toLowerCase());
            }));
        } else {
            await this.initialize();
        }
    }
}
