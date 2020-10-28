import { StudyPrototype } from "../StudyPrototype";
import { Section } from "../StudyObjects/Section";
import { SectionElement } from "../StudyObjects/SectionElement";
import { AbstractStudyObject } from "../StudyObjects/AbstractStudyObject";

import { User } from "../../User/User";
import { UserPermission } from "../../User/UserPermission";
import { EMail } from "../../User/EMail";
import { Password } from "../../User/Password";
import { StudyStatus } from "../StudyStatus";
import { MetaData } from "../MetaData";
import { ShortDescription } from "../ShortDescription";
import { KeyData } from "../KeyData";
import { DateQuestion } from "../StudyObjects/Questions/DateQuestion";
import { MultipleChoiceQuestion } from "../StudyObjects/Questions/MultipleChoiceQuestion";
import { VibrationPattern } from "../StudyObjects/VibrationPattern";
import { VibrationElement } from "../StudyObjects/VibrationElement";
import { PauseElement } from "../StudyObjects/PauseElement";
import { RandomizingStrategies } from "../../Randomizing/RandomizingStrategies";
import { ReferenceTuple } from "../ReferenceTuple";
import { instance, mock, when } from "ts-mockito";
import { AbstractQuestion } from "../StudyObjects/Questions/AbstractQuestion";

const amplitudeNecessary = true;
const studyStatus: StudyStatus = StudyStatus.CREATED;
const id = 1337;
const name = "Beste Studie";
const metaDataOfDevice = null;
const shortDescription = new ShortDescription("Das ist eine Beschreibung!");
const fullDescription = "Das ist mega lang.";
const author = new User(69, "Anne-Kathrin", "Hermann",
  UserPermission.CREATOR, new EMail("anne.ist.doof@adrianIstGod.com"));
const keyData = new KeyData(id, author, studyStatus, shortDescription, fullDescription, amplitudeNecessary, name);

const vib1 = new VibrationElement(1000, 200);
const vib2 = new VibrationElement(500, 200);
const pause1 = new PauseElement(200);
const pattern = new VibrationPattern(12, "Lang");
pattern.vibrationPatternElements = [vib1, pause1, vib2];


const studyObjects: AbstractStudyObject[] = [new DateQuestion(10, "Datum", "Welcher Tag ist heute?", "Datum"),
new MultipleChoiceQuestion(11, "Auswahl", "Wie ist das KIT?", "Auswahl",
  ["anstrengend", "cool", "langweilig", "einfach"], 2),
  pattern];

const sections: Section[] = [new Section(2, "Einführung", true, false, RandomizingStrategies.NONE)];
const sectionElements: SectionElement[] = [new SectionElement(3, "Lange Vibrationen", RandomizingStrategies.NONE)];
const refSections: ReferenceTuple[] = [new ReferenceTuple(2, true)];

let mockedKeyData = mock(KeyData);
let mockedStudyObject = mock(AbstractStudyObject);
let mockedSection = mock(Section);
let mockedSectionElement = mock(SectionElement);
let mockedRefSection = mock(ReferenceTuple);

describe("Study Prototype", function () {

  it("getKeyData_MockObject", function () {
    expect(createMockedStudy().keyData).toEqual(mockedKeyData);
  });
  it("getStudyObjects_MockObject", function () {
    expect(createMockedStudy().studyObjects).toEqual([mockedStudyObject]);
  });
  it("getSections_MockObject", function () {
    expect(createMockedStudy().sections).toEqual([mockedSection]);
  });
  it("getSectionElements_MockObject", function () {
    expect(createMockedStudy()._sectionElements).toEqual([mockedSectionElement]);
  });
  it("getRefSections_MockObject", function () {
    expect(createMockedStudy().refSections).toEqual([mockedRefSection]);
  });

  it("setKeyData_MockObject", function () {
    let mockedKeyData = mock(KeyData);
    let study = createMockedStudy();
    study.keyData = mockedKeyData;
    expect(study.keyData).toEqual(mockedKeyData);
  });
  it("setStudyObjects_MockObject", function () {
    let mockedStudyObject = mock(AbstractStudyObject);
    let study = createMockedStudy();
    study.studyObjects = [mockedStudyObject];
    expect(study.studyObjects).toEqual([mockedStudyObject]);
  });
  it("setSections_MockObject", function () {
    let mockedSection = mock(Section);
    let study = createMockedStudy();
    study.sections = [mockedSection];
    expect(study.sections).toEqual([mockedSection]);
  });
  it("setSectionElements_MockObject", function () {
    let mockedSectionElement = mock(SectionElement);
    let study = createMockedStudy();
    study.sectionElements = [mockedSectionElement];
    expect(study._sectionElements).toEqual([mockedSectionElement]);
  });
  it("setRefSections_MockObject", function () {
    let mockedRefSection = mock(ReferenceTuple);
    let study = createMockedStudy();
    study.refSections = [mockedRefSection];
    expect(study.refSections).toEqual([mockedRefSection]);
  });

  it("getKeyData_givesExpectedKeyData", function () {
    expect(createStudyPrototype().keyData).toEqual(keyData);
  });
  it("getAbstractStudyObjects_givesExpectedStudyObjects", function () {
    expect(createStudyPrototype().studyObjects).toEqual(studyObjects);
  });
  it("getSections_givesExpectedSections", function () {
    expect(createStudyPrototype().sections).toEqual(sections);
  });
  it("getSectionElements_givesExpectedSectionElements", function () {
    expect(createStudyPrototype().sectionElements).toEqual(sectionElements);
  });
  it("getSectionElements_givesExpectedSectionElements", function () {
    expect(createStudyPrototype().refSections).toEqual(refSections);
  });


  it("setKeyData_setsExpectedKeyData", function () {
    const study = createStudyPrototype();
    const keyData1 = keyData;
    keyData1.fullDescription = "osajgndföosjdnfgöosdjkfngöojksdfngöojnsdfgöojndfgv";
    study.keyData = keyData1;
    expect(study.keyData).toEqual(keyData1);
  });
  it("setAbstractStudyObjects_setsExpectedStudyObjects", function () {
    const studyObjects1: AbstractStudyObject[] = [new DateQuestion(100, "Datum", "Welcher Tag ist heute?", "Datum")];
    const study = createStudyPrototype();
    study.studyObjects = studyObjects1;
    expect(study.studyObjects).toEqual(studyObjects1);
  });
  it("setSections_setsExpectedSections", function () {
    const section1: Section[] = [new Section(2, "Einführung", true, false, RandomizingStrategies.NONE),
    new Section(3, "Hauptteil", false, true, RandomizingStrategies.STANDARD)];
    const study = createStudyPrototype();
    study.sections = section1;
    expect(study.sections).toEqual(section1);
  });
  it("setSectionElements_setsExpectedSectionElements", function () {
    const sectionElements1: SectionElement[] = [new SectionElement(3, "Lange Vibrationen", RandomizingStrategies.NONE),
    new SectionElement(4, "Kurze Vibrationen", RandomizingStrategies.STANDARD)];
    const study = createStudyPrototype();
    study.sectionElements = sectionElements1;
    expect(createStudyPrototype().sectionElements).toEqual(sectionElements);
  });
  it("setRefSections_setsExpectedRefSections", function () {
    const refSections1: ReferenceTuple[] = [new ReferenceTuple(1, false), new ReferenceTuple(2, true)];
    const study = createStudyPrototype();
    study.refSections = refSections1;
    expect(study.refSections).toEqual(refSections1);
  });
  it("setRandomStrategy_setsExpectedRandomStrategy", function () {
    const study = createStudyPrototype();
    study.randomStrategy = RandomizingStrategies.STANDARD;
    expect(study.randomStrategy).toEqual(RandomizingStrategies.STANDARD);
  });
  it("setMetaDataOfDevice_setsExpectedMetaDataOfDevice", function () {
    const study = createStudyPrototype();
    study.metaDataOfDevice = new MetaData("", "", "", "", "", "", "", 1337, 42, true);
    expect(study.metaDataOfDevice).toEqual(new MetaData("", "", "", "", "", "", "", 1337, 42, true));
  });

  it("setAbstractStudyObjects_Error", function () {
    expect(function () { createStudyPrototype().studyObjects = null; }).toThrowError("StudyObjects darf nicht null sein!");
  });
  it("setSections_Error", function () {
    expect(function () { createStudyPrototype().sections = null; }).toThrowError("Sections darf nicht null sein!");
  });
  it("setSectionElements_Error", function () {
    expect(function () { createStudyPrototype().sectionElements = null; }).toThrowError("SectionElements darf nicht null sein!");
  });
  it("setRefSections_Error", function () {
    expect(function () { createStudyPrototype().refSections = null; }).toThrowError("RefSections darf nicht null sein!");
  });
  it("setMetaDataOfDevice_Error", function () {
    expect(function () { createStudyPrototype().metaDataOfDevice = null; }).toThrowError("Parameter darf nicht null sein!");
  });


  it("clone", function () {
    const study = createStudyPrototype();
    expect(study.clone()).toEqual(createStudyPrototype());
  });
});

function createStudyPrototype(): StudyPrototype {
  const study = new StudyPrototype(keyData);
  study.studyObjects = studyObjects;
  study.sections = sections;
  study.sectionElements = sectionElements;
  study.refSections = refSections;
  return study;
}

function createMockedStudy(): StudyPrototype {
  const study = new StudyPrototype(mockedKeyData);
  study._studyObjects = [mockedStudyObject];
  study.sections = [mockedSection];
  study.sectionElements = [mockedSectionElement];
  study.refSections = [mockedRefSection];
  return study;
}
