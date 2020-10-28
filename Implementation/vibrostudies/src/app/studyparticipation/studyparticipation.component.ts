/// <reference path="../../../node_modules/@nativescript/types-android/lib/android-26.d.ts" />
/// <reference path="../../../node_modules/nativescript-dom-free/dom-global.d.ts" />

require("nativescript-dom-free");

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application, Dialogs, ObservableArray } from '@nativescript/core';
import { IRandomizerStrategy } from '../Model/Randomizing/IRandomizerStrategy';
import { IRandomizerStrategyAdapter } from '../Model/Randomizing/IRandomizerStrategyAdapter';
import { NoneRandomizer } from '../Model/Randomizing/NoneRandomizer';
import { RandomizingStrategies } from '../Model/Randomizing/RandomizingStrategies';
import { StandardRandomizer } from '../Model/Randomizing/StandardRandomizer';
import { DateQuestion } from '../Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '../Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '../Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { TextQuestion } from '../Model/Study/StudyObjects/Questions/TextQuestion';
import { Section } from '../Model/Study/StudyObjects/Section';
import { SectionElement } from '../Model/Study/StudyObjects/SectionElement';
import { TextBlock } from '../Model/Study/StudyObjects/TextBlock';
import { VibrationPattern } from '../Model/Study/StudyObjects/VibrationPattern';
import { StudyWrapperService } from '../services/study-wrapper/study-wrapper.service';
import { AbstractVibrationPatternElement } from '../Model/Study/StudyObjects/AbstractVibrationPatternElement';
import { PauseElement } from '../Model/Study/StudyObjects/PauseElement';
import { VibrationElement } from '../Model/Study/StudyObjects/VibrationElement';
import { UserResultTuple } from '../Model/Study/Result/UserResultTuple';
import { AuthService } from '../services/auth/auth.service';
import { AbstractQuestion } from '../Model/Study/StudyObjects/Questions/AbstractQuestion';
import { UserResultTupleDAO } from '../Model/Study/Result/UserResultTupleDAO.service';
import { MetaData } from '../Model/Study/MetaData';
import { AppSettingsService } from '../services/app-settings/app-settings.service';
import * as _ from "lodash";
import { ResultTuple } from '../Model/Study/Result/ResultTuple';

@Component({
    selector: 'app-studyparticipation',
    templateUrl: './studyparticipation.component.html',
    styleUrls: ['./studyparticipation.component.css']
})
/**
 * Die StudyParticipationComponent ist zum Routing des Nutzers auf Studienteilnahme
 * und für den Datentransfer zwischen den beantworteten Fragen und der Datenbank zuständig.
 * Hier wird hier die teilzunehmende Studie reingeladen, randomisiert und seitenweise ausgegeben.
 */
export class StudyParticipationComponent implements OnInit, AfterViewInit {
    
    /**
     * Boolean um zu speichern, ob der Nutzer gerade dran teilnimmt.
     */
    participating: boolean = false;
    /**
     * Boolean um zu speichern, ob der Nutzer mit der Teilnahme fertig ist.
     */
    finished: boolean = false;
    /**
     * Boolean, ob Antworten mitgespeichert werden müssen.
     */
    saveAnswers: boolean = false;
   
    /**
     * number für den Index des aktuellen Abschnitts.
     */
    currentSection = -1;
    /**
     * number für den Index des aktuellen Abschnittelements.
     */
    currentSectionElement = -1;
   
    /**
     * OberservableArray aus AbstractStudyObjects, worin sich die aktuellen Studienobjekte der App-Seite befinden.
     */
    currentStudyObjects: ObservableArray<ResultTuple> = new ObservableArray<ResultTuple>();

    /**
     * Ist der Vibrationsdienst der angesprochen wird.
     */
    vibratorService;
    /**
     * Array aus AbstractQuestions, worin die bereits beantworteten Fragen abgespeichert werden.
     */
    answeredQuestions: ResultTuple[] = [];
    /**
     * number für den Startzeitpunkt indem die Studie begonnen hat.
     */
    startTime: number;

    /**
     * string für die Spalten.
     */
    columns: string;
    /**
     * string für den Titel der Studie.
     */
    currentTitle: string = "";

    /**
     * number für die Position des SectionElements.
     */
    sectionElementPos: number;
    /**
     * number für die Menge an SectionElements.
     */
    sectionElementAmount: number;

    /**
     * number für die ID des Studienteilnehmers.
     */
    participantId: number;

    instantUncheck: boolean = false;

    private _studyObjectType: (item: ResultTuple, index: number, items: any) => string;

    get studyObjectType(): (item: ResultTuple, index: number, items: any) => string {
        return this._studyObjectType;
    }

    /**
     * Konstruktor der StudyParticipationComponent. Darin werden sämtliche Services initialisert,
     * die für eine Studeindurchführung gebraucht werden.
     * @param studywrapper StudyWrapperService Singleton, indem die teilzunehmende Studie enthalten ist
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param resultService UserResultTupleDAO Singleton, ist für das Ansprechen der Datenbank zum Antwort abspeichern zuständig
     * @param appSettings appSettingsService Singleton, enthält alle für die Anwendung relevanten Appeinstellunge 
     */
    constructor(public studywrapper: StudyWrapperService, private router: Router, private authService: AuthService, private resultService: UserResultTupleDAO, private appSettings: AppSettingsService) {
        this._studyObjectType = this.getStudyObjectType;
    }

    /**
     * Initialisiert die StudyParticipationComponent.
     */
    ngOnInit(): void {

    }

    /**
     * Initialisiert den Methodeninhalt nach der Initialisierung der Studienteilnahme-Ansicht
     */
    ngAfterViewInit() { }

    /**
     * Leitet den Nutzer zur "Verfügbare Studien"-Ansicht zurück.
     */
    goBackToDash() {
        if (this.studywrapper.isDemo) {
            this.router.navigate(["dashboard/my-studies"], { replaceUrl: true });
        } else {
            this.router.navigate(["dashboard/available-studies"], { replaceUrl: true });
        }
    }

    /**
     * Bricht die Studienteilnahme ab. Dafür wird ein Dialogfenster geöffnet, worin der Nutzer
     * dazu aufgefordert wird die Aktion nochmal zu bestätigen. Hat er dies getan, werden die
     * bereits ausgefüllten Antworten nicht mehr zurück in die Datenbank geschrieben.
     */
    cancel() {
        Dialogs.confirm({
            title: "Bist du dir sicher?",
            message: "Hiermit werden auch deine gesamten Fortschritte gelöscht und du kannst nicht erneut an dieser Studie teilnehmen!",
            okButtonText: "Studie abbrechen",
            cancelButtonText: "Zurück zur Studie",
        }).then(result => {
            if (result) {
                if (this.studywrapper.isDemo) {
                    this.router.navigate(["dashboard/my-studies"], { replaceUrl: true });
                } else {
                    this.router.navigate(["dashboard/available-studies"], { replaceUrl: true });
                }
            }
        });
    }

    /**
     * Es werden Dialogfenster generiert, der den Nutzer dazu auffordert Qualifikationsfragen
     * zu beantworten. Sind diese nicht qualifiziert, werden sie aus der Einführungstext-Ansicht
     * zurück in die "Verfügbare Studien"-Ansicht befördert.
     */
    async onParticipation() {
        let done = true;
        await Dialogs.confirm({
            title: "Warnung!",
            message: "Wird die Studienteilnahme abgebrochen, kann nicht mehr an der Studie teilgenommen werden.",
            okButtonText: "Verstanden",
            cancelButtonText: "Zurück"
        }).then(async result => {
            if (result) {
                for await (let keyData of this.studywrapper.study.keyData.qualiQuestions) {
                    await Dialogs.confirm({
                        title: "Bevor es los geht",
                        message: "" + keyData.questionText,
                        okButtonText: "Ja",
                        cancelButtonText: "Nein"
                    }).then(result => {
                        if (result != keyData.requiredAnswer || result == undefined) {
                            done = false;
                        }
                    });
                }
                if (done) {
                    this.initialize();
                } else {
                    await Dialogs.alert({
                        title: "Nicht zugelassen",
                        message: "Leider sucht der Studienleiter andere Teilnehmer.",
                        okButtonText: "Ok"
                    }).then(() => {
                        this.router.navigate(["dashboard"], { replaceUrl: true });
                    });
                }
            }
        });

    }

    /**
     * Initialisiert die Komponente und setzt alle Properties und randomisiert die Studie.
     */
    initialize() {
        this.participating = true;
        this.currentSection = 0;
        this.currentSectionElement = 0;
        this.sectionElementPos = 0;
        this.columns = "0*,100*";
        this.sectionElementAmount = 0;
        if (!this.studywrapper.isDemo) {
            this.resultService.startStudy(this.studywrapper.study.keyData.id, this.authService.getUser().id).then(result => {
                this.participantId = result;
            });
        }
        this.randomizeStudy();
        this.setSectionElementAmount();
        this.goNext();
        this.startTime = Date.now();
    }

    /**
     * Speichert für eine konkrete Datum-Frage die Antwort ab, indem das Antwortattribut innerhalb der DateQuestion
     * auf das Datum gesetzt wurde.
     * @param item DateQuestion ist die aktuelle Frage, die beantwortet wurde
     * @param args Date ist das Datum, welches vom Nutzer als Antwort gesezt wurde
     */
    onDateChanged(item: DateQuestion, args) {
        item.answer = args.value.getFullYear() + "-" + args.value.getMonth() + "-" + args.value.getDate();
    }

    /**
     * Setzt ob die Frage einer SectionElement beantwortet wurden oder nicht.
     * @returns boolean ob die Frage beantwortet wurde
     */
    checkIfAnswered(): boolean {
        let result = true;
        if (!this.studywrapper.isDemo) {
            this.currentStudyObjects.forEach(element => {
                let answer = (element.object as AbstractQuestion).answer;
                if (element.object instanceof LinearScaleQuestion) {
                    if (answer == -1) {
                        result = false;
                    }
                } else {

                    if (answer == [] || answer == "") {
                        result = false;
                    }
                }
            });
        }
        return result;
    }

    /**
     * Die goNext()-Methode lädt nach Drücken des "Weiter"-Knopfs die aktuellen StudyObjects in die Seite rein.
     * Dazu wird der StudyWrapper angesprochen, der die aktuelle Studie enthält.
     * Das aktuelle SectionElement wird innerhalb des StudyWrappers und der aktuelle Index des Sections wird abgespeichert.
     * Bevor die nächsten StudyObjects reingeladen werden, werden die Ergebnisse des Fragenobjekts in answeredQuestions reingepusht.
     */
    goNext() {
        if (this.checkIfAnswered()) {
            if (this.currentStudyObjects.length > 0 && this.saveAnswers) {
                this.currentStudyObjects.forEach(element => {
                    if (element.object instanceof AbstractQuestion) {
                        this.answeredQuestions.push(element);
                    }
                });
                this.currentStudyObjects = new ObservableArray<ResultTuple>();
            }

            let section: Section;
            let sectionElement: SectionElement;

            // ENDE DES SECTION ARRAYS ERREICHT?
            if (this.currentSection >= this.studywrapper.study.refSections.length) {
                // ENDE
                this.participating = false;
                this.finished = true;
            } else {
                // WEITER

                // SECTION RAUSSUCHEN
                for (let findSection of this.studywrapper.study.sections) {
                    if (this.studywrapper.study.refSections[this.currentSection].ID == findSection.id) {
                        section = findSection;
                        break;
                    }
                }

                // ENDE DES SECTIONELEMENT ARRAYS ERREICHT?
                if (this.currentSectionElement >= section.sectionElements.length) {
                    // NÄCHSTE SECTION
                    this.currentSection++;
                    this.currentSectionElement = 0;
                    this.goNext();
                } else {
                    // SECTIONELEMENT RAUSSUCHEN
                    for (let findSectionElement of this.studywrapper.study.sectionElements) {
                        if (section.sectionElements[this.currentSectionElement].ID == findSectionElement.id) {
                            sectionElement = findSectionElement;
                            this.currentTitle = sectionElement.name;
                            if (section.resultRelevant) {
                                this.saveAnswers = findSectionElement.resultRelevant;
                            } else {
                                this.saveAnswers = false;
                            }
                            break;
                        }
                    }


                    // HAT DAS SECITONELEMENT STUDYOBJECTS?
                    if (sectionElement.studyObjects.length > 0) {
                        // AKTUELLE STUDYOBJECTS ZUWEISEN
                        this.currentStudyObjects = new ObservableArray<ResultTuple>(); // VORHERIGE LEEREN
                        // PER ID FINDEN
                        for (let studyObjectRef of sectionElement.studyObjects) {
                            for (let studyObject of this.studywrapper.study.studyObjects) {
                                if (studyObjectRef.ID == studyObject.id) {
                                    let cloned = _.cloneDeep(studyObject);
                                    cloned.id = this.studywrapper.lastID;
                                    let toInsert = new ResultTuple(studyObject.id, cloned);
                                    this.currentStudyObjects.push(toInsert); // IN KORREKTER REIHENFOLGE PUSHEN
                                }
                            }
                        }
                    }

                    this.currentSectionElement++;
                    this.sectionElementPos++;
                    this.columns = (this.sectionElementPos / this.sectionElementAmount * 100) + "*," + (100 - this.sectionElementPos / this.sectionElementAmount * 100) + "*";
                    if (sectionElement.studyObjects.length <= 0) {
                        this.goNext();
                    }
                }
            }
        } else {
            Dialogs.alert({
                message: "Bitte überprüfe, ob jede Frage beantwortet wurde.",
                okButtonText: "Ok",
                title: "Fortfahren nicht möglich!",
            });
        }
    }

    /**
     * Speichert für eine konkrete Linearen Skala die Antworten ab, indem das Antwortattribut innerhalb der LinearScaleQuestion
     * auf den nötigen Index gesetzt wurde.
     * @param item LinearScaleQuestion ist die aktuelle Frage, die beantwortet wurde
     * @param index number ist der Index zur Antwort der LinearScaleQuestion
     */
    onLinearScaleSelect(item: LinearScaleQuestion, index: number) {
        if (item.answer == -1) {
            item.answer = index;
        } else {
            getElementById("rb-" + item.id + "-" + item.answer).checked = false;
            item.answer = index;
        }
    }

    /**
     * Speichert für eine konkrete Mutlitplce Choice Frage die Antworten ab, indem das Antwortattribut innerhalb
     * der MultipleChoiceQuestion auf den nötien String gesetzt wurde.
     * @param item MultiplceChoiceQuestion ist die aktuelle Frage, die beantworted wurde
     * @param answerChoice String ist die markierte Antwort
     */
    onMultipleChoiceCheck(item: MultipleChoiceQuestion, answerChoice: string, index: number) {
        if (getElementById("cb-" + item.id + '-' + index).checked) {
            if ((item.answer as string[]).length < item.maxChoices) {
                (item.answer as string[]).push(answerChoice);
            } else {
                this.instantUncheck = true;
                getElementById("cb-" + item.id + '-' + index).checked = false;
            }
        } else {
            if (!this.instantUncheck) {
                item.answer = (item.answer as string[]).filter(element => {
                    return element != answerChoice;
                });
            }
            this.instantUncheck = false;
        }
    }

    /**
     * Gibt einen String für die Spaltenanzahl der Linearen Skala Frage zurück.
     * @param numberOfChoices number ist die Anzahl an Antwortmöglichkeiten
     */
    getLinearScaleColumns(numberOfChoices: number) {
        let percentage = 100 / (numberOfChoices + 1);
        let result = "";
        for (let i = 0; i < numberOfChoices; i++) {
            if (i == 0) {
                result = result.concat(percentage + "*");
            } else {
                result = result.concat("," + percentage + "*")
            }
        }
        return result;
    }

    /**
     * Beendet die Studie, indem zum Teilnehmer ein UserResultTuple erstellt und durch den
     * resultService in die Datenbank reingeschrieben wird.
     * Nach der Beendigung wird der Nutzer zurück zur "Verfügbare Studien"-Ansicht gebracht.
     */
    finish() {
        if (!this.studywrapper.isDemo) {
            let questions = [];
            for (let element of this.answeredQuestions) {
                questions.push(element.object);
            }
            let userResults = new UserResultTuple(this.authService.getUser(), [], new MetaData(android.os.Build.BRAND, android.os.Build.DEVICE, android.os.Build.DISPLAY, android.os.Build.HARDWARE, android.os.Build.MANUFACTURER, android.os.Build.MODEL, android.os.Build.PRODUCT, Number(android.os.Build.VERSION.SDK), Date.now() - this.startTime, this.appSettings.hasAmplitude));
            userResults.answeredQuestions = this.answeredQuestions;
            this.resultService.save(this.studywrapper.study.keyData.id, userResults.user.id, userResults, this.participantId);
        }
        this.router.navigate(["dashboard/available-studies"], { replaceUrl: true });
    }

    /**
     * Holt sich den benötigten Randomizer für die Studienteilnahme.
     * @param randomStrategy RandomizingStrategies enum für die Spezifierzung der Strategie
     */
    getRandomizer(randomStrategy: RandomizingStrategies): IRandomizerStrategy {
        let randomizer;
        switch (randomStrategy) {
            case RandomizingStrategies.STANDARD:
                randomizer = new StandardRandomizer();
                break;
            case RandomizingStrategies.NONE:
                randomizer = new NoneRandomizer();
            default:
                break;
        }
        return randomizer;
    }

    /**
     * Setzt die Menge an SectionElements als Property.
     */
    setSectionElementAmount() {
        for (let section of this.studywrapper.study.sections) {
            for (let ref of section.sectionElements) {
                this.sectionElementAmount++;
            }
        }
    }

    /**
     * Randomisiert die ausgewählte Studie.
     */
    randomizeStudy() {
        for (let section of this.studywrapper.study.sections) {
            for (let sectionelement of this.studywrapper.study.sectionElements) {
                sectionelement.studyObjects = IRandomizerStrategyAdapter.randomize(this.getRandomizer(sectionelement.randomStrategy), sectionelement.studyObjects);
            }
            section.sectionElements = IRandomizerStrategyAdapter.randomize(this.getRandomizer(section.randomStrategy), section.sectionElements);
        }
        this.studywrapper.study.refSections = IRandomizerStrategyAdapter.randomize(this.getRandomizer(this.studywrapper.study.randomStrategy), this.studywrapper.study.refSections);
    }

    /**
     * Ist ein TypeCaster, die das AbstractStudyObject zu ihrer jeweiligen Unterklasse casted.
     * @param item AbstractStudyObject ist das umzuformende abstrakte StudyObject
     * @param index ist die Nummer 
     * @param items 
     */
    getStudyObjectType(item: ResultTuple, index: number, items: any): string {
        switch (true) {
            case item.object instanceof VibrationPattern:
                return "VibrationPattern";
            case item.object instanceof TextBlock:
                return "TextBlock";
            case item.object instanceof DateQuestion:
                return "DateQuestion";
            case item.object instanceof LinearScaleQuestion:
                return "LinearScaleQuestion";
            case item.object instanceof MultipleChoiceQuestion:
                return "MultipleChoiceQuestion";
            case item.object instanceof TextQuestion:
                return "TextQuestion";
            default:
                return "undefined";
        }
    }

    /**
     * Lässt einen Vibrationsknopf in der "Studienteilnahme"-Sicht nach einem bestimmten Muster vibrieren.
     * @param vibrationPattern VibrationPattern ist das Vibrationsmuster, was aufgerufen werden sollte
     */

    vibrate(vibrationPattern: VibrationPattern) {
        this.getVibratorService().vibrate(this.getVibrationEffectfromPattern(vibrationPattern));
    }

    /**
     * Wandelt ein gegebens Vibrationsmuster in ein VibrationEffect um, sodass die Android APi damit umgehen kann.
     * @param vibrationPattern VibrationPattern ist das Vibrationsmuster, was aufgerufen werden sollte
     */
    getVibrationEffectfromPattern(vibrationPattern: VibrationPattern): android.os.VibrationEffect {
        let index = 0;

        while (
            vibrationPattern.vibrationPatternElements[index + 1] !== undefined
        ) {
            const firstElement: AbstractVibrationPatternElement = vibrationPattern.vibrationPatternElements[index];
            const secondElement: AbstractVibrationPatternElement = vibrationPattern.vibrationPatternElements[index + 1];

            if (
                firstElement instanceof PauseElement &&
                secondElement instanceof PauseElement
            ) {
                firstElement.duration = firstElement.duration + secondElement.duration;
                vibrationPattern.vibrationPatternElements.splice(index + 1, 1);
            } else if (
                firstElement instanceof VibrationElement &&
                secondElement instanceof VibrationElement
            ) {
                vibrationPattern.vibrationPatternElements.splice(index + 1, 0, new PauseElement(1));
                index = index + 2;
            } else {
                index++;
            }
        }

        if (vibrationPattern.vibrationPatternElements[0] instanceof VibrationElement) {
            vibrationPattern.vibrationPatternElements.splice(0, 0, new PauseElement(1));
        }

        const size = vibrationPattern.vibrationPatternElements.length;
        let timings = new Array<number>(size);
        let amplitudes = new Array<number>(size);

        for (let index = 0; index < size; index++) {
            if (index % 2 === 0) {
                timings[index] = vibrationPattern.vibrationPatternElements[index].duration;
                amplitudes[index] = 0;
            } else {
                const vibrationElement = <VibrationElement>(
                    vibrationPattern.vibrationPatternElements[index]
                );
                timings[index] = vibrationElement.duration;
                amplitudes[index] = vibrationElement.amplitude;
            }
        }

        return android.os.VibrationEffect.createWaveform(
            timings,
            amplitudes,
            -1
        );

    }

    private getVibratorService() {
        if (!this.vibratorService) {
            this.vibratorService = Application.android.context.getSystemService(android.content.Context.VIBRATOR_SERVICE);
        }
        return this.vibratorService;
    }

    /**
     * Gibt ein number Array mit einer bestimmten Länge zurück. Dabei ist jeder Eintrag mit seinem eigenen Index gefüllt.
     * @param amount number für die Anzahl an Einträgen
     */
    asArray(amount: number): number[] {
        return Array.from(new Array(amount), (x, i) => i);
    }
}
