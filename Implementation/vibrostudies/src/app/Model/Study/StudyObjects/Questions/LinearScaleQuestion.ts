import { AbstractQuestion } from "./AbstractQuestion";

/**
 * Ein LinearScaleQuestion ist ein Fragenobjekt, das eine lineare Skala darstellt.
 * Auf der Skala können nur natürliche Zahlen angezeigt werden.
 * Es kann nur ein Wert auf der Skala als Antwort ausgewählt werden.
 */
export class LinearScaleQuestion extends AbstractQuestion {
  objectType = "LinearScaleQuestion";

  private _numberOfChoices: number;
  get numberOfChoices(): number {
    return this._numberOfChoices;
  }
  set numberOfChoices(numberOfChoices: number) {
    if (numberOfChoices == null) {
      throw new Error("NumberOfChoices darf nicht null sein.");
    }
    if (numberOfChoices < 2) {
      throw new Error("NumberOfChoices muss mindestens 2 sein.");
    }
    this._numberOfChoices = numberOfChoices;
  }


  private _leftLabel: string;
  get leftLabel(): string {
    return this._leftLabel;
  }
  set leftLabel(leftLabel: string) {
    this._leftLabel = leftLabel;
  }


  private _rightLabel: string;
  get rightLabel(): string {
    return this._rightLabel;
  }
  set rightLabel(rightLabel: string) {
    this._rightLabel = rightLabel;
  }

  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist answer. Dieses bezeichnet die Wahl
   * auf der Skala als Antwort auf die Frage vom Typ number.
   *
   * @param numberOfChoices bezeichnet das Zahlenintervall, beginnend bei 1 und endet bei numberOfChoices
   * @param leftLabel ist eine Bezeichnung für den Anfang der Skala, z.B. gut
   * @param rightLabel ist eine Bezeichnung für das Ende der Skala, z.B. schlecht
   * @param questionText ist die Frage, die gestellt werden soll
   * @param id ist die eindeutige Identifikationsnummer des LinearScaleQuestions
   * @param fixed entscheidet, ob LinearScaleQuestion innerhalb eines Section-Elements eine feste Position hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(
    id: number, 
    name: string, 
    questionText: string, 
    displayName: string,
    numberOfChoices: number,
    leftLabel: string,
    rightLabel: string) {
    super(id, name, questionText, displayName);
    this._numberOfChoices = numberOfChoices;
    this._leftLabel = leftLabel;
    this._rightLabel = rightLabel;
    super.answer = -1;
  }
}
