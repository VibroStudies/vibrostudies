import { AbstractQuestion } from "./AbstractQuestion";

/**
 * Ein DateQuestion stellt ein Fragenobjekt dar, bei dem man nur ein Kalenderdatum vom Typ
 * Date als Antwort angeben kann.
 */
export class DateQuestion extends AbstractQuestion {
    objectType = "DateQuestion";

    private _start: Date;
    get start(): Date {
        return this._start;
    }
    set start(start: Date) {
        this._start = start;
    }

    private _end: Date;
    get end(): Date {
        return this._end;
    }
    set end(end: Date) {
        this._end = end;
    }

    /**
     * Ein Attribut, was nicht als Parameter übergeben wird, ist answer. Dieses bezeichnet die Antwort,
     * die auf die Frage gegeben wird. Die Antwort stellt ein Datum vom Typ Date dar.
     *
     * @param questionText ist die Frage, die gestellt werden soll
     * @param id ist die eindeutige Identifikationsnummer des DateQuestions
     * @param fixed entscheidet, ob DateQuestion innerhalb eines Section-Elements eine feste Position hat oder die
     * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
     */
    constructor(id: number, name: string, questionText: string, displayName: string, start?: Date, end?: Date) {
        super(id, name, questionText, displayName);
        this.start = start;
        this.end = end;
        super.answer = "";
    }
}
