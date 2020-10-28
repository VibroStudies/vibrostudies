import { StudyPrototype } from "./StudyPrototype";
import { ReferenceTuple } from "./ReferenceTuple";
import { Types } from "./Types";
import { Section } from "./StudyObjects/Section";
import { AbstractQuestion } from "./StudyObjects/Questions/AbstractQuestion";
import { VibrationPattern } from "./StudyObjects/VibrationPattern";
import { TextBlock } from "./StudyObjects/TextBlock";
import { SectionElement } from "./StudyObjects/SectionElement";

/**
 * Der ReferenceTupleMembershipVerifier kann innerhalb einer Studie festellen, welchen
 * Typ ein ReferenceTuple hat und das Objekt zurückgeben, welches auf das ReferenceTuple zeigt.
 */
export class ReferenceTupleMembershipVerifier {
    /**
     * Studie auf die sich die ReferenceTuple beziehen, mit denen der Verifier arbeitet.
     */
    private _studyPrototype: StudyPrototype;
    get studyPrototype(): StudyPrototype {
        return this._studyPrototype;
    }
    set studyPrototype(studyPrototype: StudyPrototype) {
        this._studyPrototype = studyPrototype;
    }

    constructor(studyPrototype: StudyPrototype) {
        this._studyPrototype = studyPrototype;
    }

    /**
     * Gibt zu ref den Typ des Objekts an, zu dem die ID in ref gehört.
     * @param ref ReferenceTuple ist das Referenztupel zu dem der Typ ermittelt werden soll
     */
    getType(ref: ReferenceTuple): Types {
        let search = this.searchForId(this.studyPrototype.sections, ref); // TODO: entcopypasten
        if (search[1]) {
            return this.assignType(search[0]);
        }
        search = this.searchForId(this.studyPrototype.answeredQuestion, ref);
        if (search[1]) {
            return this.assignType(search[0]);
        }

        search = this.searchForId(this.studyPrototype.sectionElements, ref);
        if (search[1]) {
            return this.assignType(search[0]);
        }

        search = this.searchForId(this.studyPrototype.studyObjects, ref);
        if (search[1]) {
            return this.assignType(search[0]);
        }
        throw new Error("Element mit der angegebenen ID befindet sich in keiner Liste.");
    }

    /**
     * Gibt zu ref das Objekt zurück, zu dem die ID in ref gehört.
     * @param ref ReferenceTuple ist das Referenztupel welches gedowncastet wird
     */
    getObject(ref: ReferenceTuple): any {
        let search = this.searchForId(this.studyPrototype.sections, ref); // TODO: entcopypasten
        if (search[1]) {
            return search[0];
        }

        search = this.searchForId(this.studyPrototype.answeredQuestion, ref);
        if (search[1]) {
            return search[0];
        }

        search = this.searchForId(this.studyPrototype.sectionElements, ref);
        if (search[1]) {
            return search[0];
        }

        search = this.searchForId(this.studyPrototype.studyObjects, ref);
        if (search[1]) {
            return search[0];
        }
        throw new Error("Element mit der angegebenen ID befindet sich in keiner Liste.");
    }

    private searchForId(list: any[], ref: ReferenceTuple): [any, boolean] {
        if (list == null) {
            return [null, false];
        }
        for (let i = 0; i < list.length; i = i + 1) {
            if (list[i].id === ref.ID) {
                return [list[i], true];
            }
        }
        return [null, false];
    }

    private assignType(element: any): Types {
        switch (true) {
            case element instanceof SectionElement: {
                return Types.SECTIONELEMENT;
            }
            case element instanceof AbstractQuestion: {
                return Types.QUESTION;
            }
            case element instanceof TextBlock: {
                return Types.TEXT;
            }
            case element instanceof Section: {
                return Types.SECTION;
            }
            case element instanceof VibrationPattern: {
                return Types.VIBRATIONPATTERN;
            }
            default: {
                throw new Error("Kein passender Typ gefunden.");
            }

        }
    }
}
