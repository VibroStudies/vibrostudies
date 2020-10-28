import { Injectable } from '@angular/core';
import { ReferenceTupleMembershipVerifier } from '@src/app/Model/Study/ReferenceTupleMembershipVerifier';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';

@Injectable({
    providedIn: 'root'
})
/**
 * Der StudyWrapperService setzt eine beliebige Studie als Property des Services, sodass man mit dieser
 * in der Studienteilnahme, sowie Studienerstellung umgehen kann.
 */
export class StudyWrapperService {
    private _study: StudyPrototype;
    private _lastID: number;
    isDemo: boolean = false;
    /**
     * Ist der ReferenceTupleMembershipVerifier für die jeweilige Studie
     */
    referenceTupleMembershipVerifier: ReferenceTupleMembershipVerifier;

    get study(): StudyPrototype {
        return this._study;
    }

    set study(study: StudyPrototype) {
        this._study = study;
        this.referenceTupleMembershipVerifier.studyPrototype = this._study;
        this.lastID = this.getLastID();
    }

    set lastID(lastID: number) {
        if (lastID == null) {
            throw new Error("Setting the last ID to null or undefined is not allowed.")
        }
        this._lastID = lastID;
    }

    /**
     * Auf jeden get()-Aufruf wird die aktuelle lastID inkrementiert zurückgegeben.
     */
    get lastID(): number {
        this._lastID += 1;
        return this._lastID;
    }

    /**
     * Gibt die höchste bzw. letzte ID innerhalb der Menge von Sections, SectionElements, StudyObjects
     * und QualificationQuestions zurück.
     */
    private getLastID(): number {
        let lastID = 0;
        if (this._study) {

            for (let section of this._study.sections) {
                if (section.id > lastID) {
                    lastID = section.id;
                }
            }
            for (let sectionelement of this._study.sectionElements) {
                if (sectionelement.id > lastID) {
                    lastID = sectionelement.id;
                }
            }
            for (let studyobject of this._study.studyObjects) {
                if (studyobject.id > lastID) {
                    lastID = studyobject.id;
                }
            }
            for (let qualiquestion of this._study.keyData.qualiQuestions) {
                if (qualiquestion.id > lastID) {
                    lastID = qualiquestion.id;
                }
            }
        }
        return lastID;
    }

    /**
     * Setzt für den StudyWrapperService den ReferenceTupleMembershipVerifier. Dieser war dann undefiniert.
     */
    constructor() {
        this.referenceTupleMembershipVerifier = new ReferenceTupleMembershipVerifier(undefined);
    }

    /**
     * Holt sich zu einer bestimmten number den Zufallstypen ab.
     * @param value number für den Zufallstypen der zurückgegeben wird
     */
    getRandomizerName(value: number) {
        switch (value) {
            case 0:
                return "Keine";
            case 1:
                return "Einfacher Zufall";
        }
    }
}

