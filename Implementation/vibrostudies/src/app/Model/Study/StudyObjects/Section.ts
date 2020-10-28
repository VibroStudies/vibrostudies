import { ReferenceTuple } from "../ReferenceTuple";
import { ReferenceTupleMembershipVerifier } from "../ReferenceTupleMembershipVerifier";
import { Types } from "../Types";
import { RandomizingStrategies } from "../../Randomizing/RandomizingStrategies";
import { AbstractStudyObject } from "./AbstractStudyObject";

/**
 * Eine Section stellt einen logischen Abschnitt einer Studie dar, das nur Section-Elemente, also
 * nur Objekte der Klasse AbstractSectionElement, enthalten darf.
 */
export class Section extends AbstractStudyObject{

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
   * Das Attribut gibt an, ob eine Section für den Studienteilnehmer überspringbar sein soll.
   */
  private _skippable: boolean;
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
   * Das Attribut gibt an, ob eine Section in die Ergebnisauswertung miteinbezogen wird.
   */
  private _resultRelevant: boolean;
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
   * In dem Attribut sind mittels ID Referenzen auf jene Elemente gespeichert, die innerhalb einer Section liegen.
   */
  private _sectionElements: ReferenceTuple[] = [];
  get sectionElements(): ReferenceTuple[] {
    return this._sectionElements;
  }
  set sectionElements(sectionElements: ReferenceTuple[]) {

    this._sectionElements = sectionElements;
  }

  /**
   * Ein Attribut, was nicht als Parameter übergeben wird, ist sectionElements.
   * Dieses ist eine AbstractSectionElement-Liste, das die Section-Elemente
   * enthält, die der Studienleiter zu einer Section hinzufügt
   *
   * @param skippable erlaubt das Überspringen der Section innerhalb der Studie
   * @param name bezeichnet den Namen der Section
   * @param resultRelevant entscheidet, ob Ergebnisse der Section ins Endergebnis einer Studie mit
   * einfließen, z.B. ist eine Einführungs-Section mit einem Tutorial, um sich mit der Umgebung
   * vertraut zu machen, nicht von Bedeutung
   */
  constructor(id: number, name: string, skippable: boolean, resultRelevant: boolean, randomStrategy: RandomizingStrategies) {
    super(id, name);
    this._skippable = skippable;
    this._resultRelevant = resultRelevant;
    this._randomStrategy = randomStrategy;
  }

  /**
   * Fügt entweder einen Test oder einen Playground hinzu.
   *
   * @param studyObject ist die Referenz auf das StudyObject, das hinzugefügt werden soll.
   * @param index ist die Stelle, an die das Objekt hinzugefügt werden soll. Bei null wird es am Ende der Liste hinzugefügt.
   * @throws Error, falls es kein Test oder Playground ist.
   */
  addStudyObject(studyObject: ReferenceTuple, index?: number): void {

    const typeOfReferenceTuple = this.verifier.getType(studyObject);

    if (!(typeOfReferenceTuple === Types.SECTIONELEMENT)) {
      throw new Error("In eine Section können nur SectionElements eingefügt werden.");
    }

    if (index == null) {
      this.sectionElements.push(studyObject);
    } else {
      this.sectionElements.splice(index, 0, studyObject);
    }
  }
}
