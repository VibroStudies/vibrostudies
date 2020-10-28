import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { KeyDataDao } from '@src/app/Model/Study/KeyDataDAO.service';
import { StudyPrototypeDAO } from '@src/app/Model/Study/StudyPrototypeDAO.service';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { AuthService } from '../../services/auth/auth.service';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { Dialogs, ObservableArray } from '@nativescript/core';
import { SideDrawerService } from '../services/side-drawer/side-drawer.service';

@Component({
    selector: 'app-my-studies',
    templateUrl: './my-studies.component.tns.html',
    styleUrls: ['./my-studies.component.css']
})
/**
 * Die MyStudiesComponent blendet dem Nutzer alle Studien ein, welcher er selbst erstellt hat.
 * In der "Meine-Studien"-Ansicht kann der Nutzer seine eigenen Studien bearbeiten, veröffentlichen,
 * beenden und die Ergebnisse einsehen, sowie exportieren.
 */
export class MyStudiesComponent implements OnInit {

    /**
     * Das Array<KeyData> enthält alle Studien, die der eingeloggte Nutzer erstellt hat.
     */
    studies: ObservableArray<KeyData> = new ObservableArray<KeyData>();
    /**
     * boolean, welches zeigt, ob etwas lädt oder nicht.
     */
    loading = true;
    /**
     * boolean, welches zeigt, ob etwas erstellt wird oder nicht.
     */
    creating = false;

    /**
     * Konstruktor der MyStudiesComponent. Darin werden sämtliche Services initialisert,
     * die für die "Meine Studien"-Ansicht gebraucht werden.
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     * @param studywrapper StudyWrapperService Singleton, indem die zu bearbeitende Studie enthalten ist
     * @param keyDataService KeyDataDao Singleton, um auf die Schlüsselinformationen aller verfügbaren Studien zuzugreifen
     * @param studyService StudyPrototypeDAO Singleton, um auf sämtliche Studien zuzugreifen, die vom Nutzer erstellt wurde
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param csvService CSVConverter ist zum konvertierten der Ergebnisse und zum Abspeichern dieser da
     * @param resultService UserResultTupleDAO, um UserResultTuple aus der Datenbank anzusprechen
     * @param sideDrawer SideDrawerService Singleotn, ist für das Aufrufen der Seitenliste zuständig
     */
    constructor(
        private router: Router,
        private studywrapper: StudyWrapperService,
        public keyDataService: KeyDataDao,
        private studyService: StudyPrototypeDAO,
        private authService: AuthService,
        private sideDrawer: SideDrawerService,
    ) { }

    /**
     * Initialisiert die AvailableStudiesComponent.
     */
    async ngOnInit() {
        this.sideDrawer.title = "Meine Studien";
        if (this.authService.getUser().permission == 0) {
            this.router.navigate(["dashboard"], { replaceUrl: true });
        } else {
            await this.getStudies();
        }
    }

    /**
     * Holt die vom Nutzer erstellten Studien.
     */
    async getStudies() {
        this.loading = true;
        await this.keyDataService.getFromUserId(this.authService.getUser().id).then(keyDataResults => {
            if (keyDataResults.length > 0) {
                this.studies = new ObservableArray(keyDataResults);
            }
            this.loading = false;
        });
    }

    /**
     * Veröffentlicht eine ausgewählte Studie.
     * @param keyData KeyData sind die Schlüsselinformationen der ausgewählten Studie
     */
    async onPublish(keyData: KeyData) {
        keyData.studyStatus = StudyStatus.CREATED;
        await this.keyDataService.updateStudyState(keyData.id, StudyStatus.CREATED).then(result => {
            if (result) {
                this.getStudies();
            }
        });
    }

    /**
     * Löscht die ausgewählte Studie aus der Datenbank.
     * @param keyData KeyData sind die Schlüsselinformationen der ausgewählten Studie
     */
    async onDelete(keyData: KeyData) {
        await this.keyDataService.delete(keyData.id).then(() => {
            this.getStudies();
        });
    }

    /**
     * Führt eine Demo einer ausgewählten Studie aus.
     * @param id number ist die ID der Studie, deren Demo ausgeführt werden soll
     */
    async onDemo(id: number) {
        this.studywrapper.isDemo = true;
        this.studywrapper.study = await this.studyService.get(id);
        this.router.navigate(["studyparticipation"], { replaceUrl: true });
    }

    /**
     * Beendet eine veröffentlichte Studie des Nutzers.
     * @param keyData KeyData sind die Schlüsselinformationen der ausgewählten Studie
     */
    async onEndClick(keyData: KeyData) {
        keyData.studyStatus = StudyStatus.FINISHED;
        await this.keyDataService.updateStudyState(keyData.id, StudyStatus.FINISHED).then(result => {
            if (result) {
                this.getStudies();
            }
        });
    }

    /**
     * Konvertiert die Ergebnisse in eine .csv-Datei und legt diese auf dem Endsystem des Nutzers ab.
     * @param studyId number ist die ID der Studie, dessen Ergebnisse exportiert werden
     */
    async getCSV(studyId: number) {
        Dialogs.alert({
            title: "Sorry",
            message: "Ergebnisse können aktuell leider nur im Browser heruntergeladen werden.",
            okButtonText: "Ok"
        });
    }

    /**
     * Trägt alle Teilnehmer einer ausgewählten Studie in eine .csv-Datei ein und
     * legt diese auf dem Endsystem des Nutzers ab.
     * @param studyId number ist die ID der Studie, dessen Ergebnisse exportiert werden
     */
    async getParticipants(studyId: number) {
        Dialogs.alert({
            title: "Sorry",
            message: "Die Teilnehmerliste kann aktuell leider nur im Browser heruntegeladen werden.",
            okButtonText: "Ok"
        });
    }

    /**
     * Aktualisiert die Menge an verfügbaren Studien, durch Runterwischen des Displays.
     * @param event any-Objeckt welches das Runterwischen beinhaltet
     */
    async onPullToRefreshInitiated(event) {
        await this.getStudies();
        event.object.notifyPullToRefreshFinished();
    }
}
