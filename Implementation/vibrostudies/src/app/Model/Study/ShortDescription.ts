/**
 * Die Konstante definiert, wie lang in Zeichen der String einer ShortDescription sein darf
 */
const maxLength = 200;

/**
 * ShortDescription enthält die Kurzbeschreibung, die in der Studienübersicht angezeigt wird
 */
export class ShortDescription {

    /**
     * Der Text der Kurzbeschreibung.
     */
    private _text: string;
    get text(): string {
        return this._text;
    }
    /**
     * Setzt den Text der Kurzbeschreibung und prüft ob die Beschreibung kürzer als die maximal erlaubte Länge ist
     * @param text Text der Kurzbeschreibung
     */
    set text(text: string) {
        if (this.ensureTextValidation(text)) {
            this._text = text;
        }
    }

    /**
     * Erzeugt eine Kurzbeschreibung dabei kann wahlweise direkt der Text mitgegeben werden,
     * der in der Kurzbeschreibung stehen soll.
     * @param text
     */
    constructor(text?: string) {
        if (this.ensureTextValidation(text)) {
            this._text = text;
        }
    }

    private ensureTextValidation(toValidate: string): boolean {
        if (toValidate.length > maxLength) {
            return false;
        }
        return true;
    }
}
