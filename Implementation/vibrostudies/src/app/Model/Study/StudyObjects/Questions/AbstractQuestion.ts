import { AbstractStudyObject } from "../AbstractStudyObject";

/**
 * Ein AbstractQuestion stellt ein allgemeines Fragenobjekt dar.
 */
export abstract class AbstractQuestion extends AbstractStudyObject {
  private _questionText: string = "";
  get questionText(): string {
    return this._questionText;
  }
  set questionText(questionText: string) {
    this._questionText = questionText;
  }

  private _answer: Date | number | string | string[];
  get answer(): Date | number | string | string[] {
    return this._answer;
  }
  set answer(answer: Date | number | string | string[]) { // null überprüfen
    if (answer == null) {
      throw new Error("Answer darf nicht null sein.");
    }
    this._answer = answer;
  }

  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist answer. Dieses bezeichnet die Antwort,
   * die auf die Frage gegeben wird kann und dessen Typ bzw. Antwortmöglichkeit von der erbenden Klasse abhängt
   *
   * @param questionText ist die Frage, die gestellt werden soll
   * @param id ist die eindeutige Identifikationsnummer des Fragenobjekts
   */
  constructor(id: number, name: string, questionText: string, displayName: string) {
    super(id, name, displayName);
    this.questionText = questionText;
    this._answer = undefined;
    this.displayName = displayName;
  }
}
