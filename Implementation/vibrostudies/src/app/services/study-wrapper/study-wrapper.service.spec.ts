import { TestBed } from '@angular/core/testing';
import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { ReferenceTuple } from '@src/app/Model/Study/ReferenceTuple';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { AbstractStudyObject } from '@src/app/Model/Study/StudyObjects/AbstractStudyObject';
import { PauseElement } from '@src/app/Model/Study/StudyObjects/PauseElement';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { QualificationQuestion } from '@src/app/Model/Study/StudyObjects/Questions/QualificationQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { SectionElement } from '@src/app/Model/Study/StudyObjects/SectionElement';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { VibrationElement } from '@src/app/Model/Study/StudyObjects/VibrationElement';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from './study-wrapper.service';

describe('StudyWrapperService', () => {
  let service: StudyWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyWrapperService);
  });

  it('StudyWrapperService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('StudyWrapperService_getStudy', () => {
    service.study = createDefaultStudyPrototype();
    expect(service.study).toEqual(createDefaultStudyPrototype());
  });

  it('StudyWrapperService_getLastID_EmptyStudy', () => {
    service.study = createDefaultStudyPrototype();
    expect(service.lastID).toEqual(1);
  });

  it('StudyWrapperService_getLastID_FilledStudy', () => {
    service.study = createFilledStudyPrototype();
    expect(service.lastID).toEqual(19);
  });

  it('StudyWrapperService_setLastIDToNullOrUndefinedError', () => {
    expect(function () {service.lastID = null}).toThrowError('Setting the last ID to null or undefined is not allowed.');
    expect(function () {service.lastID = undefined}).toThrowError('Setting the last ID to null or undefined is not allowed.');
  });

  it('StudyWrapperService_getRandomizerName', () => {
    expect(service.getRandomizerName(0)).toEqual('Keine');
    expect(service.getRandomizerName(1)).toEqual('Einfacher Zufall');
    expect(service.getRandomizerName(2)).toBeUndefined();
  });
});

function createDefaultStudyPrototype(): StudyPrototype {
  const amplitudeNecessary = true;
  const studyStatus: StudyStatus = StudyStatus.CREATED;
  const id = 1337;
  const name = "Beste Studie";
  const shortDescription = new ShortDescription("Das ist eine Beschreibung!");
  const fullDescription = "Das ist mega lang.";
  const author = new User(69, "Anne-Kathrin", "Hermann",
    UserPermission.CREATOR, new EMail("anne.ist.doof@adrianIstGod.com"));
  const keyData = new KeyData(id, author, studyStatus, shortDescription, fullDescription, amplitudeNecessary, name);
  return new StudyPrototype(keyData);
}

function createFilledStudyPrototype(): StudyPrototype {
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
  const quali2 = new QualificationQuestion(18, "Quali", "Bist du potent?", "Quali", true);


  const studyObjects: AbstractStudyObject[] = [kurzeVibs, textQuestion, date, mult, text, linearScale, langeVibs];

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

  const sections: Section[] = [sec3, sec1, sec2];
  const sectionElements: SectionElement[] = [secEle6, secEle1, secEle2, secEle3, secEle4, secEle5];

  const refSections: ReferenceTuple[] = [new ReferenceTuple(1, true), new ReferenceTuple(2, true), new ReferenceTuple(3, true)];

  study.sections = sections;
  study.sectionElements = sectionElements;
  study.studyObjects = studyObjects;
  study.refSections = refSections;
  study.keyData.qualiQuestions = [quali, quali2];

  return study;
}
