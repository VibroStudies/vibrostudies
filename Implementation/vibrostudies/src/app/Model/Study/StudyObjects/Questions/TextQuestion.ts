import { AbstractQuestion } from "./AbstractQuestion";

/**
 * Ein TextQuestion ist ein Fragenobjekt, bei dem man als Antwort
 * nur einen Text schreiben kann.
 */
export class TextQuestion extends AbstractQuestion {
  objectType = "TextQuestion";

  private _length: number;
  get length(): number {
    return this._length;
  }
  set length(length: number) {
    this._length = length;
  }

  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist answer. Dieses bezeichnet die Antwort,
   * die auf die Frage gegeben wird. Die Antwort stellt einen Text vom Typ string dar.
   *
   * @param questionText ist die Frage, die gestellt werden soll
   * @param id ist die eindeutige Identifikationsnummer des TextQuestions
   * @param fixed entscheidet, ob TextQuestion innerhalb eines Section-Elements eine feste Position hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(id: number, name: string, questionText: string, displayName: string, length?: number) {
    super(id, name, questionText, displayName);
    this.length = length;
    super.answer = "";
  }
}
