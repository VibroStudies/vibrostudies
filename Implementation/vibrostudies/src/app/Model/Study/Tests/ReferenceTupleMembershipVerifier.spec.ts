import { User } from "../../User/User";
import { UserPermission } from "../../User/UserPermission";
import { EMail } from "../../User/EMail";
import { Password } from "../../User/Password";
import { StudyStatus } from "../StudyStatus";
import { ShortDescription } from "../ShortDescription";
import { KeyData } from "../KeyData";
import { ReferenceTuple } from "../ReferenceTuple";
import { ReferenceTupleMembershipVerifier } from "../ReferenceTupleMembershipVerifier";
import { StudyPrototype } from "../StudyPrototype";
import { RandomizingStrategies } from "../../Randomizing/RandomizingStrategies";
import { AbstractStudyObject } from "../StudyObjects/AbstractStudyObject";
import { PauseElement } from "../StudyObjects/PauseElement";
import { DateQuestion } from "../StudyObjects/Questions/DateQuestion";
import { MultipleChoiceQuestion } from "../StudyObjects/Questions/MultipleChoiceQuestion";
import { Section } from "../StudyObjects/Section";
import { SectionElement } from "../StudyObjects/SectionElement";
import { VibrationElement } from "../StudyObjects/VibrationElement";
import { VibrationPattern } from "../StudyObjects/VibrationPattern";
import { TextBlock } from "../StudyObjects/TextBlock";
import { TextQuestion } from "../StudyObjects/Questions/TextQuestion";
import { LinearScaleQuestion } from "../StudyObjects/Questions/LinearScaleQuestion";
import { QualificationQuestion } from "../StudyObjects/Questions/QualificationQuestion";
import { Types } from "../Types";
import { instance, mock, when } from "ts-mockito";

const id = 1337;
const isFixed = true;
const amplitudeNecessary = true;
const studyStatus: StudyStatus = StudyStatus.CREATED;

const name = "Beste Studie";
const shortDescription = new ShortDescription("Das ist eine Beschreibung!");
const fullDescription = "Das ist mega lang.";
const author = new User(69, "Anne-Kathrin", "Hermann",
  UserPermission.CREATOR, new EMail("anne.ist.doof@adrianIstGod.com"));
const study = new StudyPrototype(new KeyData(id, author, studyStatus, shortDescription, fullDescription, amplitudeNecessary, name));

const vib1 = new VibrationElement(1000, 200);
const vib2 = new VibrationElement(500, 200);
const pause1 = new PauseElement(200);
const langeVibs = new VibrationPattern(10, "Lang");
langeVibs.vibrationPatternElements = [vib1, pause1, vib2];

const vib3 = new VibrationElement(100, 200);
const vib4 = new VibrationElement(300, 200);
const pause2 = new PauseElement(100);
const kurzeVibs = new VibrationPattern(17, "Kurz");
kurzeVibs.vibrationPatternElements = [vib3, pause2, vib4];

const date = new DateQuestion(11, "Datum", "Welcher Tag ist heute?", "Datum");
const mult = new MultipleChoiceQuestion(12, "Auswahl", "Wie ist das KIT?", "Auswahl", ["anstrengend", "cool", "langweilig", "einfach"], 2);
const text = new TextBlock(13, "Text", "Das ist ein Textblock!");
const textQuestion = new TextQuestion(14, "Textfrage", "Wie geht es dir?", "Textfrage");
const linearScale = new LinearScaleQuestion(15, "LinearScale", "Wie cool bist du?", "LinearScale", 5, "gar nicht", "Vin Diesel Style");
const quali = new QualificationQuestion(16, "Quali", "Bist du größer als 187?", "Quali", true);


const studyObjects: AbstractStudyObject[] = [date, mult, text, textQuestion, linearScale, quali, langeVibs, kurzeVibs];

const sec1 = new Section(1, "Einführung", true, false, RandomizingStrategies.NONE);
const sec2 = new Section(2, "Hauptteil", true, false, RandomizingStrategies.STANDARD);
const sec3 = new Section(3, "Schluss", true, false, RandomizingStrategies.NONE);

sec1.sectionElements = [new ReferenceTuple(7, true), new ReferenceTuple(8, true), new ReferenceTuple(6, true)];
sec2.sectionElements = [new ReferenceTuple(4, true), new ReferenceTuple(5, true), new ReferenceTuple(6, true)];
sec3.sectionElements = [new ReferenceTuple(9, true), new ReferenceTuple(4, true)];

const secEle1 = new SectionElement(4, "Lange Vibrationen", RandomizingStrategies.STANDARD);
const secEle2 = new SectionElement(5, "Kurze Vibrationen", RandomizingStrategies.STANDARD);
const secEle3 = new SectionElement(6, "Gemischte Vibrationen", RandomizingStrategies.STANDARD);
const secEle4 = new SectionElement(7, "Fragen", RandomizingStrategies.STANDARD);
const secEle5 = new SectionElement(8, "Text", RandomizingStrategies.NONE);
const secEle6 = new SectionElement(9, "Alles", RandomizingStrategies.NONE);

secEle1.studyObjects = [new ReferenceTuple(10, true)];
secEle2.studyObjects = [new ReferenceTuple(17, true)];
secEle3.studyObjects = [new ReferenceTuple(10, true), new ReferenceTuple(17, true)];
secEle4.studyObjects = [new ReferenceTuple(14, true), new ReferenceTuple(15, true)];
secEle5.studyObjects = [new ReferenceTuple(13, true)];
secEle6.studyObjects = [new ReferenceTuple(13, true), new ReferenceTuple(10, true), new ReferenceTuple(15, true)];

const sections: Section[] = [sec1, sec2, sec3];
const sectionElements: SectionElement[] = [secEle1, secEle2, secEle3, secEle4, secEle5, secEle6];

const refSections: ReferenceTuple[] = [new ReferenceTuple(1, true), new ReferenceTuple(2, true), new ReferenceTuple(3, true)];

study.sections = sections;
study.sectionElements = sectionElements;
study.studyObjects = studyObjects;
study.refSections = refSections;

let mockedRefSection = mock(ReferenceTuple);

let mockedStudy = mock(StudyPrototype)
when(mockedStudy.refSections).thenReturn([instance(mockedRefSection)]);


describe("ReferenceTupleMembershipVerifier", function () {
  it("getType_givesSectionElementType", function () {
    expect(createReferenceTupleMemberShipVerifier().getType(new ReferenceTuple(7, true))).toEqual(Types.SECTIONELEMENT);
  });
  it("getType_givesSectionType", function () {
    expect(createReferenceTupleMemberShipVerifier().getType(new ReferenceTuple(1, true))).toEqual(Types.SECTION);
  });
  it("getType_givesTextType", function () {
    expect(createReferenceTupleMemberShipVerifier().getType(new ReferenceTuple(13, true))).toEqual(Types.TEXT);
  });
  it("getType_givesQuestionType", function () {
    expect(createReferenceTupleMemberShipVerifier().getType(new ReferenceTuple(14, true))).toEqual(Types.QUESTION);
  });
  it("getType_givesVibrationPatternType", function () {
    expect(createReferenceTupleMemberShipVerifier().getType(new ReferenceTuple(17, true))).toEqual(Types.VIBRATIONPATTERN);
  });

  it("getObject_givesSectionElement", function () {
    expect(createReferenceTupleMemberShipVerifier().getObject(new ReferenceTuple(secEle4.id, true))).toEqual(secEle4);
  });
  it("getObject_givesSection", function () {
    expect(createReferenceTupleMemberShipVerifier().getObject(new ReferenceTuple(sec1.id, true))).toEqual(sec1);
  });
  it("getObject_givesText", function () {
    expect(createReferenceTupleMemberShipVerifier().getObject(new ReferenceTuple(text.id, true))).toEqual(text);
  });
  it("getObject_givesQuestion", function () {
    expect(createReferenceTupleMemberShipVerifier().getObject(new ReferenceTuple(mult.id, true))).toEqual(mult);
  });
  it("getObject_givesVibrationPattern", function () {
    expect(createReferenceTupleMemberShipVerifier().getObject(new ReferenceTuple(langeVibs.id, true))).toEqual(langeVibs);
  });

  it("getType_Error", function () {
    expect(function () { createReferenceTupleMemberShipVerifier().getType(new ReferenceTuple(-1, true)); })
    .toThrowError("Element mit der angegebenen ID befindet sich in keiner Liste.");
  });

  it("getObject_Error", function () {
    expect(function () { createReferenceTupleMemberShipVerifier().getObject(new ReferenceTuple(-1, true)); })
    .toThrowError("Element mit der angegebenen ID befindet sich in keiner Liste.");
  });
});


function createReferenceTupleMemberShipVerifier(): ReferenceTupleMembershipVerifier {
  const tuple = new ReferenceTupleMembershipVerifier(study);
  return tuple;
}
