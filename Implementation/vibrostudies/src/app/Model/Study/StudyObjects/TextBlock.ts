import { AbstractStudyObject } from "./AbstractStudyObject";

/**
 * Ein TextBlock stellt ein Studienobjekt dar, das nur einen unformatierten
 * Text enthält.
 */
export class TextBlock extends AbstractStudyObject {
  objectType = "TextBlock";

  /**
   * Text der in der Studie angezeigt wird.
   */
  private _text: string;
  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }

  /**
   * @param text ist der Inhalt, also der Text des TextBlocks
   * @param id ist die eindeutige Identifikationsnummer des TextBlocks
   * @param fixed entscheidet, ob der TextBlock innerhalb eines Section-Elements eine feste Position hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(id: number, name: string, displayName: string, text: string) {
    super(id, name, displayName);
    this.text = text;
  }
}
