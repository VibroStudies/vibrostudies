import { StudyStatus } from "./StudyStatus";
import { User } from "../User/User";
import { ShortDescription } from "./ShortDescription";
import { QualificationQuestion } from "./StudyObjects/Questions/QualificationQuestion";

/**
 * Die Klasse public class KeyData enthählt alle wichtigen Schlüsselinformationen die für eine Studie benötigt werden.
 */
export class KeyData {

    /**
     * Dieses Attribut gibt einer (nicht ausgeführten) Studie eine eindeutige ID um sie von anderen Studien zu unterscheiden. 
     */
    private _id: number;
    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    /**
     * Dieses Attribut gibt es Autoren einer Studie an.
     */
    private _author: User;
    get author(): User {
        return this._author;
    }
    set author(user: User) {
        this._author = user;
    }

    /**
     * Dieses Attribut gibt an, ob das Gerät auf dem die Studie ausgeführt wird, die Amplitude unterstützen muss.
     */
    private _amplitudeNecessary: boolean;
    get amplitudeNecessary(): boolean {
        return this._amplitudeNecessary;
    }
    set amplitudeNecessary(amplitudeNecessary: boolean) {
        if (amplitudeNecessary == null) {
            throw new Error("Parameter darf nicht null sein!");
        }
        this._amplitudeNecessary = amplitudeNecessary;
    }

    /**
     * Dieses Attribut gibt an, in welchem Zustand sich die Studie befindet. Sie kann CREATED,
     * PUBLISHED oder FINISHED sein.
     */
    private _studyStatus: StudyStatus;
    get studyStatus() {
        return this._studyStatus;
    }
    set studyStatus(studyStatus: StudyStatus) {
        if (studyStatus == null) {
            throw new Error("Parameter darf nicht null sein!");
        }
        this._studyStatus = studyStatus;
    }

    /**
     * Dieses Attribut speichert den Namen der Studie.
     */
    private _name: string;
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        if (!name) {
            throw new Error("Parameter darf nicht null sein!");
        }
        this._name = name;
    }

    /**
     * ShortDescription enthält die Kurzbeschreibung eine Studie 
     * welche in der Listenansicht in der alle verfügbaren Studien angezeigt werden sichtbar ist.
     */
    private _shortDescription: ShortDescription;
    get shortDescription(): ShortDescription {
        return this._shortDescription;
    }
    set shortDescription(shortDescription: ShortDescription) {
        this._shortDescription = shortDescription;
    }

    /**
     * FullDescription enthält die volle Beschreibung einer Studie die dem User beim öffnen einer Studie angezeigt wird.
     */
    private _fullDescription: string;
    get fullDescription(): string {
        return this._fullDescription;
    }
    set fullDescription(fullDescription: string) {
        this._fullDescription = fullDescription;
    }

    /**
     * Die Liste enthält Ja Nein Fragen die alle korrekt beantwortet werden müssen, bevor ein Nutzer an einer Studie teilnehmen darf.
     */
    private _qualiQuestions: QualificationQuestion[] = [];
    get qualiQuestions(): QualificationQuestion[] {
        return this._qualiQuestions;
    }
    set qualiQuestions(qualiQuestions: QualificationQuestion[]) {
        this._qualiQuestions = qualiQuestions;
    }

    constructor(id: number,
        author: User,
        studyStatus: StudyStatus,
        shortdescription: ShortDescription,
        fulldescription: string,
        amplitudeNecessary: boolean,
        name: string) {
        this._amplitudeNecessary = amplitudeNecessary;
        this._studyStatus = studyStatus;
        this._id = id;
        this._author = author;
        this._shortDescription = shortdescription;
        this._fullDescription = fulldescription;
        this._name = name;
    }
}
