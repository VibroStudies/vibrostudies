import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
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
import { StudyObjectToolboxComponent } from '@src/app/studycreation/toolboxes/studyobject-toolbox/studyobject-toolbox.component';
import { ColorService } from '../../services/color/color.service';

describe('StudyObjectToolboxComponent', () => {
  let component: StudyObjectToolboxComponent = new StudyObjectToolboxComponent(new ColorService());

  it('initConnectedLists_initializeExpectedList', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.initConnectedLists(2);
    expect(component.connectedLists).toEqual(["studyObjectList0", "studyObjectList1"]);
  });
  it('ngOnInit_initializeExpectedList', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.playgroundCount = 3;
    component.ngOnInit()
    expect(component.connectedLists).toEqual(["studyObjectList0", "studyObjectList1", "studyObjectList2"]);
  });
  it('getObjectsPerType_DateQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    const date = new DateQuestion(11, "Datum", "Welcher Tag ist heute?", "Datum");
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("DateQuestion")).toEqual([date]);
  });
  it('getObjectsPerType_VibrationPattern', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
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
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("VibrationPattern")).toEqual([langeVibs, kurzeVibs]);
  });
  it('getObjectsPerType_TextBlock', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    const text = new TextBlock(13, "Text", "Das ist ein Textblock!");
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("TextBlock")).toEqual([text]);
  });
  it('getObjectsPerType_LinearScaleQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    const linearScale = new LinearScaleQuestion(15, "LinearScale", "Wie cool bist du?", "LinearScale", 5, "gar nicht", "Vin Diesel Style");
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("LinearScaleQuestion")).toEqual([linearScale]);
  });
  it('getObjectsPerType_MultipleChoiceQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    const mult = new MultipleChoiceQuestion(12, "Auswahl", "Wie ist das KIT?", "Auswahl", ["anstrengend", "cool", "langweilig", "einfach"], 2);
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("MultipleChoiceQuestion")).toEqual([mult]);
  });
  it('getObjectsPerType_TextQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    const textQuestion = new TextQuestion(14, "Textfrage", "Wie geht es dir?", "Textfrage");
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("TextQuestion")).toEqual([textQuestion]);
  });
  it('getObjectsPerType_SectionElement', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    const secEle1 = new SectionElement(4, "Lange Vibrationen", RandomizingStrategies.STANDARD);
    const secEle2 = new SectionElement(5, "Kurze Vibrationen", RandomizingStrategies.STANDARD);
    const secEle3 = new SectionElement(6, "Gemischte Vibrationen", RandomizingStrategies.STANDARD);
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("SectionElement")).toEqual([secEle1, secEle2, secEle3]);
  });
  it('getObjectsPerType_Section', () => {
    const sec1 = new Section(1, "Einführung", true, false, RandomizingStrategies.NONE);
    const sec2 = new Section(2, "Hauptteil", true, false, RandomizingStrategies.STANDARD);
    const sec3 = new Section(3, "Schluss", true, false, RandomizingStrategies.NONE);
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getObjectsPerType("Section")).toEqual([sec1, sec2, sec3]);
  });

  it('getAmount_DateQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("DateQuestion")).toEqual(1);
  });
  it('getAmount_VibrationPattern', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("VibrationPattern")).toEqual(2);
  });
  it('getAmount_TextBlock', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("TextBlock")).toEqual(1);
  });
  it('getAmount_LinearScaleQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("LinearScaleQuestion")).toEqual(1);
  });
  it('getAmount_MultipleChoiceQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("MultipleChoiceQuestion")).toEqual(1);
  });
  it('getAmount_TextQuestion', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("TextQuestion")).toEqual(1);
  });
  it('getAmount_SectionElement', () => {
    component = new StudyObjectToolboxComponent(new ColorService());
    component.toolbox = createStudyObjectList();
    expect(component.getAmount("SectionElement")).toEqual(3);
  });
  it('getAmount_Section', () => {
      component = new StudyObjectToolboxComponent(new ColorService());
      component.toolbox = createStudyObjectList();
      expect(component.getAmount("Section")).toEqual(3);
  });
});

function createStudyObjectList(): AbstractStudyObject[] {
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
  const sec1 = new Section(1, "Einführung", true, false, RandomizingStrategies.NONE);
  const sec2 = new Section(2, "Hauptteil", true, false, RandomizingStrategies.STANDARD);
  const sec3 = new Section(3, "Schluss", true, false, RandomizingStrategies.NONE);
  const secEle1 = new SectionElement(4, "Lange Vibrationen", RandomizingStrategies.STANDARD);
  const secEle2 = new SectionElement(5, "Kurze Vibrationen", RandomizingStrategies.STANDARD);
  const secEle3 = new SectionElement(6, "Gemischte Vibrationen", RandomizingStrategies.STANDARD);
  return [langeVibs, kurzeVibs, date, mult, text, textQuestion, linearScale, quali,
    sec1, sec2, sec3, secEle1, secEle2, secEle3];
}
