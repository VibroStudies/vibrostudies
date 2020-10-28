import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { KeyDataDao } from '@src/app/Model/Study/KeyDataDAO.service';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { StudyPrototypeDAO } from '@src/app/Model/Study/StudyPrototypeDAO.service';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { AuthService } from '../../services/auth/auth.service';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { CSVConverter } from '@src/app/Model/Study/CSVConverter/csvconverter.service';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { UserResultTuple } from '@src/app/Model/Study/Result/UserResultTuple';
import { UserResultTupleDAO } from '@src/app/Model/Study/Result/UserResultTupleDAO.service';
import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { ConfirmDialogService } from '@src/app/services/dialogs/confirmDialog.service';

@Component({
    selector: 'app-my-studies',
    templateUrl: './my-studies.component.html',
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
    studies: KeyData[] = [];
    /**
     * boolean, welches zeigt, ob etwas lädt oder nicht.
     */
    loading: boolean = true;
    /**
     * boolean, welches zeigt, ob etwas erstellt wird oder nicht.
     */
    creating: boolean = false;

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
     */
    constructor(
        private router: Router,
        private studywrapper: StudyWrapperService,
        public keyDataService: KeyDataDao,
        private studyService: StudyPrototypeDAO,
        private authService: AuthService,
        private csvService: CSVConverter,
        private resultService: UserResultTupleDAO,
        private confirmDialogService: ConfirmDialogService
    ) { }

    /**
     * Initialisiert die AvailableStudiesComponent.
     */
    async ngOnInit() {
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
                this.studies = keyDataResults;
            } else {
                this.studies = [];
            }
            this.loading = false;
        });
    }

    /**
     * Navigiert den Nutzer zur Studienerstellung-Ansicht, der jeweiligen ausgewählten Studie.
     * @param keyData KeyData sind die Schlüsselinformationen der ausgewählten Studie
     */
    async onEditClick(keyData: KeyData) {
        await this.studyService.get(keyData.id).then(studyResult => {
            this.studywrapper.study = studyResult;
        });
        this.router.navigate(["studycreation/general-editing"], { replaceUrl: true });
    }

    /**
     * Löscht die ausgewählte Studie aus der Datenbank.
     * @param keyData KeyData sind die Schlüsselinformationen der ausgewählten Studie
     */
    async onDelete(keyData: KeyData) {
        this.confirmDialogService.openDialog("Hiermit wird die Studie unwiderruflich gelöscht!").then(async isConfirmed => {
            if (isConfirmed) {
                await this.keyDataService.delete(keyData.id).then(keyDataResult => {
                    this.getStudies();
                });
            }
        });
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
     * Navigiert den Nutzer zur Studienerstellung-Ansicht, um eine neue Studie anzulegen.
     */
    async onNewClick() {
        if (!this.creating) {
            this.creating = true;
            let user = await this.authService.getUser();
            let keyData = new KeyData(-1, user, StudyStatus.CREATED, new ShortDescription("Neue Studie"), "Neue Studie", false, "Neue Studie");
            let study = new StudyPrototype(keyData);
            study.randomStrategy = RandomizingStrategies.STANDARD;
            await this.studyService.save(study).then(async result => {
                if (result) {
                    await this.studyService.get(result).then(studyResult => {
                        this.studywrapper.study = studyResult;
                        this.creating = false;
                        this.router.navigate(["studycreation/general-editing"], { replaceUrl: true });
                    });
                }
            });
        }
    }

    /**
     * Konvertiert die Ergebnisse in eine .csv-Datei und legt diese auf dem Endsystem des Nutzers ab.
     * @param studyId number ist die ID der Studie, dessen Ergebnisse exportiert werden
     */
    async getCSV(studyId: number) {
        let study: StudyPrototype;
        await this.studyService.get(studyId).then(studyResult => {
            study = studyResult;
        });
        let userResult: UserResultTuple[];
        await this.resultService.get(studyId).then(result => {
            userResult = result;
        });
        this.csvService.giveResultCSV(study, userResult);
    }

    /**
     * Trägt alle Teilnehmer einer ausgewählten Studie in eine .csv-Datei ein und
     * legt diese auf dem Endsystem des Nutzers ab.
     * @param studyId number ist die ID der Studie, dessen Ergebnisse exportiert werden
     */
    async getParticipants(studyId: number) {
        let study: StudyPrototype;
        await this.studyService.get(studyId).then(studyResult => {
            study = studyResult;
        });
        let userResult: UserResultTuple[];
        await this.resultService.get(studyId).then(result => {
            userResult = result;
        });
        this.csvService.giveParticipantsCSV(study, userResult);
    }

    /**
     * Setzt eine Studie zurück.
     * @param studyId number ist die ID der Studie, die zurückgesetzt wird
     */
    async resetStudy(studyId: number) {
        this.confirmDialogService.openDialog("Beim Zurücksetzen der Studie werden auch alle Studienergebnisse gelöscht!").then(async isConfirmed => {
            if (isConfirmed) {
                let study: StudyPrototype;
                await this.studyService.get(studyId).then(studyResult => {
                    study = studyResult;
                });
                study.keyData.studyStatus = StudyStatus.CREATED;
                await this.keyDataService.delete(study.keyData.id);
                await this.studyService.save(study);
                this.getStudies();
            }
        });
    }

    /**
     * Veröffentlicht eine ausgewählte Studie.
     * @param keyData KeyData sind die Schlüsselinformationen der ausgewählten Studie
     */
    async publish(keyData: KeyData) {
        keyData.studyStatus = StudyStatus.PUBLISHED;
        await this.keyDataService.updateStudyState(keyData.id, StudyStatus.PUBLISHED).then(result => {
            if (result) {
                this.getStudies();
            }
        });
    }

}
