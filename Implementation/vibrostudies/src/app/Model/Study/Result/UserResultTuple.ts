import { ResultTuple } from "@src/app/Model/Study/Result/ResultTuple";
import { User } from "../../User/User";
import { MetaData } from "../MetaData";
import { AbstractQuestion } from "../StudyObjects/Questions/AbstractQuestion";

/**
 * Die Klasse enthält die Ausführung einer Studie zu einem Nutzer.
 */
export class UserResultTuple {
    /**
     * Der User der die Studie ausgeführt hat.
     */
    private _user: User;
    get user(): User {
        return this._user;
    }
    set user(user: User) {
        this._user = user;
    }

    /**
     * Die Fragen und Antworten die gegeben wurden, in der Reihenfolge in der der User die Fragen erhalten hat.
     */
    private _results: AbstractQuestion[];
    get results(): AbstractQuestion[] {
        return this._results;
    }
    set results(results: AbstractQuestion[]) {
        this._results = results;
    }

    /**
     * Referenzen auf die Fragen mit der orginalen Id aus der Study
     */
    answeredQuestions: ResultTuple[] = [];

    /**
     * Die MetaDaten die bei der Durchführung der Studie entstanden sind, sowie Daten über das Gerät, auf dem die Studie ausgeführt wurde.
     */
    private _metaData: MetaData;
    get metaData(): MetaData {
        return this._metaData;
    }
    set metaData(metaData: MetaData) {
        this._metaData = metaData;
    }

    constructor(user: User, results: AbstractQuestion[], metaData: MetaData) {
        this._user = user;
        this._results = results;
        this._metaData = metaData;
    }
}
