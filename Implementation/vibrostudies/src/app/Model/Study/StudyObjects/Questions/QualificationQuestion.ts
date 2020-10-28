import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { AbstractQuestion } from "./AbstractQuestion";

/**
 * Ein QualificationQuestion ist ein Fragenobjekt, das eine Ausschlussfrage modellieren soll
 * (als Teilnahmevoraussetzung zu einer Studie). Man kann nur zwei, selbst definierbare,
 * Antwortoptionen zur Verfügung stellen. Damit soll eine Ja-Nein-Ausschlussfrage realisiert werden.
 * Man kann dann auch nur eine Antwortoption auswählen.
 */
export class QualificationQuestion extends AbstractQuestion {
  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist answerOptions. Dieses ist eine
   * String-Liste, dass vorkonfigurierte Antworten enthält
   *
   * Ein weiteres Attribut, was nicht als Parameter übergeben wird, ist answer. Dieses ist ein String, das
   * die ausgewählte Antwortoption als Antwort auf die Frage darstellt.
   *
   * maxChoices ist 1, weil............
   *
   * @param questionText ist die Frage, die gestellt werden soll
   * @param id ist die eindeutige Identifikationsnummer des QualificationQuestions
   * @param fixed entscheidet, ob QualificationQuestion innerhalb eines Section-Elements eine feste Position hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(id: number, name: string, questionText: string, displayName: string, requiredAnswer: boolean) {
    super(id, name, questionText, displayName);
    this.requiredAnswer = requiredAnswer;
  }
  
  private _requiredAnswer: boolean;
  get requiredAnswer(): boolean {
    return this._requiredAnswer;
  }
  set requiredAnswer(requiredAnswer: boolean) {
    if (requiredAnswer == null) {
      throw new Error("RequiredAnswer darf nicht null sein.");
    }
    this._requiredAnswer = requiredAnswer;
  }
}
