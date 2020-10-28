
/**
 * Eine abstrakte Oberklasse für alle Elemente, die eine Studie beinhaltet.
 */
export abstract class AbstractStudyObject {

  /**
   * Die id ist innerhalb einer Studie ein eindeutiger Identifizierer für Objekte.
   */
  private _id: number;
  get id(): number {
    return this._id;
  }
  set id(id: number) {
    if (id == null) {
      throw new Error("Id darf nicht null sein.");
    }
    this._id = id;
  }

   /**
   * Der Name eines Objekts ist ein Differenzierungsmerkmal, mit dem einem Objekt eine Bedeutung zugewiesen werden kann.
   */
  private _name: string;
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }


  /**
   * @param id ist die eindeutige Identifikationsnummer des Studienobjekts
   * @param fixed entscheidet, ob das Studienobjekt innerhalb eines Section-Elements eine feste Position hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(id: number, name: string) {
    if (id == null) {
      throw new Error("Id darf nicht null sein.");
    }
    this._id = id;
    this._name = name;
  }
}
