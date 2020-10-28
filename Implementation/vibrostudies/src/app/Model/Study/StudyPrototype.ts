import { IPrototype } from "../GenericIPrototype";
import { Section } from "./StudyObjects/Section";
import { SectionElement } from "./StudyObjects/SectionElement";
import { AbstractStudyObject } from "./StudyObjects/AbstractStudyObject";
import { MetaData } from "./MetaData";
import { AbstractQuestion } from "./StudyObjects/Questions/AbstractQuestion";
import { ReferenceTuple } from "./ReferenceTuple";
import { RandomizingStrategies } from "../Randomizing/RandomizingStrategies";
import { KeyData } from "./KeyData";
import * as _ from "lodash";

/**
 * Die Klasse public class StudyPrototype ist ein Template für die Instanz einer Studie,
 *  in der gleichzeitig das Ergebnis nach Ausführung der Studie durch einen User gespeichert wird.
 */
export class StudyPrototype implements IPrototype<StudyPrototype> {

    /**
     * In diesem Attribut sind alle wichtigen Schlüsselinformationen zu einer Studie enthalten.
     */
    private _keyData: KeyData;
    get keyData(): KeyData {
        return this._keyData;
    }
    set keyData(keyData: KeyData) {
        this._keyData = keyData;
    }

    /**
     * In diesem Attribut werden die Metadaten des Endgerätes als JSON gespeichert.
     */
    private _metaDataOfDevice: MetaData;
    get metaDataOfDevice(): MetaData {
        return this._metaDataOfDevice;
    }
    set metaDataOfDevice(metaDataOfDevice: MetaData) {
        if (!metaDataOfDevice) {
            throw new Error("Parameter darf nicht null sein!");
        }
        this._metaDataOfDevice = metaDataOfDevice;
    }

    /**
     * Diese Liste repräsentiert die Reihenfolge in der Sections in der Studienausführung drankommen.
     */
    private _refSections: ReferenceTuple[] = [];
    get refSections(): ReferenceTuple[] {
        return this._refSections;
    }
    set refSections(refSections: ReferenceTuple[]) {
        if (refSections == null) {
            throw new Error("RefSections darf nicht null sein!");
        }
        this._refSections = refSections;
    }

    /**
     * Enthält alle Sections der Studie.
     */
    private _sections: Section[] = [];
    get sections(): Section[] {
        return this._sections;
    }
    set sections(sections: Section[]) {
        if (!sections) {
            throw new Error("Sections darf nicht null sein!");
        }
        this._sections = sections;
    }

    /**
     * In dieser Liste werden alle Section Elemente einer Studie gespeichert.
     */
    _sectionElements: SectionElement[] = [];
    get sectionElements(): SectionElement[] {
        return this._sectionElements;
    }
    set sectionElements(sectionElements: SectionElement[]) {
        if (sectionElements == null) {
            throw new Error("SectionElements darf nicht null sein!");
        }
        this._sectionElements = sectionElements;
    }

    /**
     * In dieser Liste werden bereits erstellte Study Objects einer Studie gepeichert.
     */
    _studyObjects: AbstractStudyObject[] = [];
    get studyObjects(): AbstractStudyObject[] {
        return this._studyObjects;
    }
    set studyObjects(studyObjects: AbstractStudyObject[]) {
        if (studyObjects == null) {
            throw new Error("StudyObjects darf nicht null sein!");
        }
        this._studyObjects = studyObjects;
    }

    private _answeredQuestion: AbstractQuestion[] = []; // in der Reihenfolge, in der sie bearbeitet wurden
    get answeredQuestion(): AbstractQuestion[] {
        return this._answeredQuestion;
    }

    /**
     * Enthält die Randomisierungsstrategie welche auf die Liste refSections angewendet wird.
     */
    private _randomStrategy: RandomizingStrategies;
    get randomStrategy(): RandomizingStrategies {
        return this._randomStrategy;
    }
    set randomStrategy(randomStrategy: RandomizingStrategies) {
        this._randomStrategy = randomStrategy;
    }

    /**
     * Erzeugt einen neuen StudyPrototype
     *
     * @param metaDataOfDevice;
     * @param sections;
     * @param randomStrategy;
     */
    constructor(keyData: KeyData) {
        this._keyData = keyData; 
    }

    /**
     * Erzeugt ein neues Objekt vom Typ StudyPrototype mit den selben Werten wie das aktuelle
     */
    clone(): StudyPrototype {
        return _.cloneDeep(this);
    }

    addAnsweredQuestion(answer: AbstractQuestion): void {
        this._answeredQuestion.push(answer);
    }
}
