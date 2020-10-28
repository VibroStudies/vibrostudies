import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EMail } from "../User/EMail";
import { User } from "../User/User";
import { KeyData } from "./KeyData";
import { ReferenceTuple } from "./ReferenceTuple";
import { SectionElement } from "./StudyObjects/SectionElement";
import { Section } from "./StudyObjects/Section";
import { ShortDescription } from "./ShortDescription";
import { PauseElement } from "./StudyObjects/PauseElement";
import { DateQuestion } from "./StudyObjects/Questions/DateQuestion";
import { LinearScaleQuestion } from "./StudyObjects/Questions/LinearScaleQuestion";
import { MultipleChoiceQuestion } from "./StudyObjects/Questions/MultipleChoiceQuestion";
import { TextQuestion } from "./StudyObjects/Questions/TextQuestion";
import { TextBlock } from "./StudyObjects/TextBlock";
import { VibrationElement } from "./StudyObjects/VibrationElement";
import { VibrationPattern } from "./StudyObjects/VibrationPattern";
import { StudyPrototype } from "./StudyPrototype";
import { AppSettings } from "@src/app/app-settings";
import { AuthService } from "@src/app/services/auth/auth.service";
import { QualificationQuestion } from "./StudyObjects/Questions/QualificationQuestion";

@Injectable({
    providedIn: "root"
})
/**
 * Das StudyPrototypeDAO ist für den Zugriff auf die StudyPrototype Objekte in der Datenbank verantwortlich.
 */
export class StudyPrototypeDAO {
    studyURL: string = AppSettings.baseURL + "Study/";
    qualiQuestionURL: string = AppSettings.baseURL + "QualificationQuestion/";
    userURL: string = AppSettings.baseURL + "User/";


    constructor(private authService: AuthService, private http: HttpClient) { }

    /**
     * Die Methode gibt asynchron ein StudyPrototype Objekt zurück, welches eindeutig durch die id identifiziert wird.
     * @param id number ist die ID der StudyPrototype, die aus der Datenbank geholt werden soll
     */
    async get(id: number): Promise<StudyPrototype> {
        let study: StudyPrototype;

        await (this.http.post(AppSettings.baseURL + "StudyNew/" + id + "/", { token: this.authService.getAuthToken() }) as Observable<StudyPrototype>).toPromise().then(studyResult => {
            let keyData = new KeyData(studyResult.keyData.id,
                new User(studyResult.keyData.author.id,
                    studyResult.keyData.author.firstName,
                    studyResult.keyData.author.lastName,
                    studyResult.keyData.author.permission,
                    new EMail(studyResult.keyData.author.email as any)),
                studyResult.keyData.studyStatus,
                new ShortDescription(studyResult.keyData.shortDescription as any),
                studyResult.keyData.fullDescription,
                studyResult.keyData.amplitudeNecessary,
                studyResult.keyData.name);

            for (let qualiQuestion of studyResult.keyData.qualiQuestions) {
                let toInsert = new QualificationQuestion(qualiQuestion.id, qualiQuestion.name, qualiQuestion.questionText, qualiQuestion.displayName, qualiQuestion.requiredAnswer);
                keyData.qualiQuestions.push(toInsert);
            }

            study = new StudyPrototype(keyData);
            study.randomStrategy = studyResult.randomStrategy;

            let sectionRef = [];
            for (let ref of studyResult.refSections) {
                sectionRef.push(new ReferenceTuple(ref.ID, ref.isFixed));
            }
            study.refSections = sectionRef;

            let sections = [];
            for (let section of studyResult.sections) {
                let refArray = [];
                for (let ref of section.sectionElements) {
                    refArray.push(new ReferenceTuple(ref.ID, ref.isFixed));
                }
                let toInsert = new Section(section.id, section.name, section.skippable, section.resultRelevant, section.randomStrategy);
                toInsert.sectionElements = refArray;
                sections.push(toInsert);
            }
            study.sections = sections;

            let sectionElements = [];
            for (let sectionElement of studyResult.sectionElements) {
                let refArray = [];
                for (let ref of sectionElement.studyObjects) {
                    refArray.push(new ReferenceTuple(ref.ID, ref.isFixed));
                }
                sectionElements.push(new SectionElement(sectionElement.id, sectionElement.name, sectionElement.randomStrategy, refArray));
            }
            study.sectionElements = sectionElements;

            let studyObjects = [];
            for (let studyObject of (studyResult as any).studyObjects) {
                switch (studyObject.studyObjectTypes) {
                    case 3: // TEXTBLOCK
                        studyObjects.push(new TextBlock(studyObject.id, studyObject.name, studyObject.text));
                        break;
                    case 4: // QUESTION
                        switch (studyObject.questionType) {
                            case 0: // DATE
                                studyObjects.push(new DateQuestion(studyObject.id, studyObject.name,
                                    studyObject.questionText, studyObject.displayName));
                                break;
                            case 1: // LINEAR SCALE
                                studyObjects.push(new LinearScaleQuestion(studyObject.id,
                                    studyObject.name, studyObject.questionText, studyObject.displayName,
                                    studyObject.numberOfChoices, studyObject.leftLabel, studyObject.rightLabel));
                                break;
                            case 2: // MULTIPLE
                                studyObjects.push(new MultipleChoiceQuestion(studyObject.id,
                                    studyObject.name, studyObject.questionText,
                                    studyObject.displayName, studyObject.answerOptions, studyObject.maxChoices));
                                break;
                            case 3: // TEXT
                                studyObjects.push(new TextQuestion(studyObject.id, studyObject.name,
                                    studyObject.questionText, studyObject.displayName));
                                break;
                        }
                        break;
                    case 5: // VIBRATIONPATTERN
                        let vibrationElements = [];
                        for (let vibElement of (studyObject as VibrationPattern).vibrationPatternElements) {
                            if ((vibElement as any).amplitude == 0) {
                                vibrationElements.push(new PauseElement(vibElement.duration));
                            } else {
                                vibrationElements.push(new VibrationElement(vibElement.duration,
                                    (vibElement as VibrationElement).amplitude));
                            }
                        }
                        let vibElement = new VibrationPattern(studyObject.id, studyObject.name);
                        vibElement.vibrationPatternElements = vibrationElements;
                        studyObjects.push(vibElement);
                        break;
                }
            }
            study.studyObjects = studyObjects;
        })

        return study;
    }

    /**
     * Die Methode speichert asynchron object in einer Datenbank, welches nachdem es gespeichert wurde wieder mit get aufgerufen werden kann.
     * @param study StudyPrototype ist die Studie, die gespeichert werden soll
     */
    async save(study: StudyPrototype): Promise<number> {
        let id = -1;
        await this.http.post(AppSettings.baseURL + "SaveStudy/",
            { study: study, token: this.authService.getAuthToken() }).toPromise().then(result => {
                if (result != -1) {
                    id = result as number;
                }
            });
        return id;
    }

    /**
     * Die Methode aktualisiert object mit der Datenbank asynchron anhand seiner id.
     * @param object StudyPrototype ist die Studie, die aktualisiert werden soll
     */
    async update(object: StudyPrototype): Promise<boolean> {
        await this.save(object);
        return true;
    }


}
