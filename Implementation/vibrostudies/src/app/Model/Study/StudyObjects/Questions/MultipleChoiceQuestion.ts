import { AbstractQuestion } from "./AbstractQuestion";

/**
 * Ein MultipleChoiceQuestion ist ein Fragenobjekt, das sowohl mehrere Antworten
 * anbieten als auch mehrere Antworten akzeptieren kann
 */
export class MultipleChoiceQuestion extends AbstractQuestion {
  objectType = "MultipleChoiceQuestion";

  private _maxChoices: number;
  get maxChoices(): number {
    return this._maxChoices;
  }
  set maxChoices(maxChoices: number) {
    if (maxChoices == null) {
      throw new Error("MaxChoices darf nicht null sein."); 
    }
    if (maxChoices < 1) {
      throw new Error("Es muss mindestens eine Antwort angegeben werden können"); 
    }
    this._maxChoices = maxChoices;
  }

  private _answerOptions: string[];
  get answerOptions(): string[] {
    return this._answerOptions;
  }

  set answerOptions(answerOptions: string[]) {
    this._answerOptions = answerOptions;
  }

  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist answerOptions. Dieses ist eine
   * String-Liste, dass vorkonfigurierte Antworten enthält
   *
   * Ein weiteres Attribut, was nicht als Parameter übergeben wird, ist answer. Dieses ist eine String-Liste, die
   * die ausgewählten Antwortoptionen als Antwort auf die Frage beinhaltet.
   *
   * @param maxChoices beschreibt die maximale Anzahl an Antworten, die man auf eine Frage geben kann
   * @param questionText ist die Frage, die gestellt werden soll
   * @param id ist die eindeutige Identifikationsnummer des MultipleChoiceQuestions
   * @param fixed entscheidet, ob MultipleChoiceQuestion innerhalb eines Section-Elements eine feste Position hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(
    id: number, 
    name: string, 
    questionText: string, 
    displayName: string,
    answerOptions: string[],
    maxChoices: number,
  ) {
    super(id, name, questionText, displayName);
    this.maxChoices = maxChoices;
    this.answerOptions = answerOptions;
    super.answer = [];
  }
}
