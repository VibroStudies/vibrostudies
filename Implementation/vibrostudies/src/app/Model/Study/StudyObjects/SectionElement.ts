import { ReferenceTuple } from "../ReferenceTuple";
import { ReferenceTupleMembershipVerifier } from "../ReferenceTupleMembershipVerifier";
import { RandomizingStrategies } from "../../Randomizing/RandomizingStrategies";
import { AbstractStudyObject } from "./AbstractStudyObject";

/**
 * Ein SectionElement bezeichnet einen allgemeinen Container, in den man,
 * abhängig von der konkreten Unterklasse, nur bestimmte Studienobjekte einfügen kann.
 */
export class SectionElement extends AbstractStudyObject{

  /**
   * Der verifier wird verwendet um Objekte anhand ihrer id ihren ContainerObjekten zuzuordnen.
   */
  private _verifier: ReferenceTupleMembershipVerifier;
  get verifier(): ReferenceTupleMembershipVerifier {
    return this._verifier;
  }
  set verifier(verifier: ReferenceTupleMembershipVerifier) {
    this._verifier = verifier;
  }

  /**
   * Das Attribut gibt an, ob ein SectionElement für den Studienteilnehmer überspringbar sein soll.
   */
  private _skippable = false;
  get skippable(): boolean {
    return this._skippable;
  }
  set skippable(skippable: boolean) {
    if (skippable == null) {
      throw new Error("Skippable darf nicht null sein.");
    }
    this._skippable = skippable;
  }

  /**
   * In dem Attribut sind mittels ID Referenzen auf jene Elemente gespeichert, die innerhalb eines SectionElements liegen.
   */
  private _studyObjects: ReferenceTuple[] = [];
  get studyObjects(): ReferenceTuple[] {
    return this._studyObjects;
  }
  set studyObjects(studyObjects: ReferenceTuple[]) {
    this._studyObjects = studyObjects;
  }

  /**
   * Das Attribut gibt an, welcher Algorithmus für die Randomisierung über die Elemente, die in einer Section liegen verwendet wird
   */
  private _randomStrategy: RandomizingStrategies;
  get randomStrategy(): RandomizingStrategies {
    return this._randomStrategy;
  }
  set randomStrategy(randomStrategy: RandomizingStrategies) {
    if (randomStrategy == null) {
      throw new Error("RandomStrategy darf nicht null sein.");
    }
    this._randomStrategy = randomStrategy;
  }

  /**
   * Das Attribut gibt an, ob ein SectionElement in die Ergebnisauswertung miteinbezogen wird.
   */
  private _resultRelevant = true;
  get resultRelevant (): boolean {
    return this._resultRelevant;
  }
  set resultRelevant(resultRelevant: boolean) {
    if (resultRelevant == null) {
      throw new Error("ResultRelevant darf nicht null sein.");
    }
    this._resultRelevant = resultRelevant;
  }

  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist studyObjects. Dieses ist eine
   * AbstractStudyObjectProduct-Liste, das die vom Studienleiter in das Section-Element eingefügten Studienobjekte enthält
   *
   * @param name ist der Name des Section-Elements
   * @param fixed entscheidet, ob das Section-Element eine feste Position in einer Section hat oder die
   * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
   */
  constructor(id: number, name: string, randomStrategy: RandomizingStrategies, studyObjects?: ReferenceTuple[],
    verifier?: ReferenceTupleMembershipVerifier) {
    super(id, name);
    if (studyObjects == null) {
      this._studyObjects = [];
    } else {
      this._studyObjects = studyObjects;
    }
    this._verifier = verifier;
    this._randomStrategy = randomStrategy;
  }

  /**
   * Die Methode tauscht ein StudyObject an den angegebenen Index.
   * @Deprecated
   * @param oldIndex ist der Index, an dem das StudyObject liegt.
   * @param newIndex ist der gewünschte Index, an dem das StudyObject liegen soll.
   * @throws RangeError, wenn der Index außerhalb des Bereiches der Liste war.
   */
  swapStudyObject(oldIndex: number, newIndex: number): void {
    const highestIndex = (this.studyObjects.length - 1);

    if (oldIndex > highestIndex || newIndex > highestIndex
      || oldIndex < 0 || newIndex < 0) {
      throw new RangeError("Index liegt außerhalb des Bereich.");
    }

    const temp = this._studyObjects[oldIndex];
    this._studyObjects[oldIndex] = this._studyObjects[newIndex];
    this._studyObjects[newIndex] = temp;
  }

/**
 * Löscht ein StudyObject.
 * @Deprecated
 * @param id ist die ID des zu löschenden Objektes.
 */
  removeStudyObject(id: number): void {
    this.studyObjects = this.studyObjects.filter(element => element.ID !== id);
  }

  /**
   * Fügt ein StudyObject hinzu.
   * @Deprecated
   * @param studyObject ist die Referenz auf das StudyObject, das hinzugefügt werden soll.
   * @param index ist die Stelle, an die das Objekt hinzugefügt werden soll. Bei null wird es am Ende der Liste hinzugefügt.
   */
  addStudyObject(studyObject: ReferenceTuple, index?: number): void {
    if (index == null) {
      this.studyObjects.push(studyObject);
    } else if (this.studyObjects == null && index === 0) {
      this.studyObjects.push(studyObject);
    } else if (this.studyObjects == null && index !== 0) {
      throw new Error("Index des Section Elements fehlerhaft!");
    } else if (0 <= index && index <= this.studyObjects.length) {
      this.studyObjects.splice(index, 0, studyObject);
    } else {
      throw new Error("Index des Section Elements fehlerhaft!");
    }
  }
}
