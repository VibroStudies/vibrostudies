import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { PauseElement } from '@src/app/Model/Study/StudyObjects/PauseElement';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { SectionElement } from '@src/app/Model/Study/StudyObjects/SectionElement';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService = new ColorService();

  it('getStudyObjectType_givesExpectedVibrationPattern', () => {
    expect(service.getStudyObjectType(new VibrationPattern(0, "1"))).toEqual("VibrationPattern");
  });
  it('getStudyObjectType_givesExpectedTextBlock', () => {
    expect(service.getStudyObjectType(new TextBlock(0, "Name", "Text"))).toEqual("TextBlock");
  });
  it('getStudyObjectType_givesExpectedDateQuestion', () => {
    expect(service.getStudyObjectType(new DateQuestion(0, "Name", "Frage", "Name"))).toEqual("DateQuestion");
  });
  it('getStudyObjectType_givesExpectedLinearScaleQuestion', () => {
    expect(service.getStudyObjectType(new LinearScaleQuestion(0, "Name", "Frage", "Name", 5, "Links", "Rechts"))).toEqual("LinearScaleQuestion");
  });
  it('getStudyObjectType_givesExpectedMultipleChoiceQuestion', () => {
    expect(service.getStudyObjectType(new MultipleChoiceQuestion(0, "Name", "Frage", "Name", ["A", "B", "C"], 1))).toEqual("MultipleChoiceQuestion");
  });
  it('getStudyObjectType_givesExpectedTextQuestion', () => {
    expect(service.getStudyObjectType(new TextQuestion(0, "Name", "Frage", "Name"))).toEqual("TextQuestion");
  });
  it('getStudyObjectType_givesExpectedSectionElement', () => {
    expect(service.getStudyObjectType(new SectionElement(0, "Name", RandomizingStrategies.NONE))).toEqual("SectionElement");
  });
  it('getStudyObjectType_givesExpectedSection', () => {
    expect(service.getStudyObjectType(new Section(0, "Name", true, true, RandomizingStrategies.NONE,))).toEqual("Section");
  });
  it('getStudyObjectType_givesExpectedSectionElement', () => {
    expect(service.getStudyObjectType(new PauseElement(10))).toEqual("undefined");
  });


  it('getStudyObjectColor_givesExpectedVibrationPatternColor', () => {
    expect(service.getStudyObjectColor(new VibrationPattern(0, "1"))).toEqual("#6D0000");
  });
  it('getStudyObjectColor_givesExpectedTextBlockColor', () => {
    expect(service.getStudyObjectColor(new TextBlock(0, "Name", "Text"))).toEqual("#3e753b");
  });
  it('getStudyObjectColor_givesExpectedDateQuestionColor', () => {
    expect(service.getStudyObjectColor(new DateQuestion(0, "Name", "Frage", "Name"))).toEqual("#4c2f27");
  });
  it('getStudyObjectColor_givesExpectedLinearScaleQuestionColor', () => {
    expect(service.getStudyObjectColor(new LinearScaleQuestion(0, "Name", "Frage", "Name", 5, "Links", "Rechts"))).toEqual("#1b5583");
  });
  it('getStudyObjectColor_givesExpectedMultipleChoiceQuestionColor', () => {
    expect(service.getStudyObjectColor(new MultipleChoiceQuestion(0, "Name", "Frage", "Name", ["A", "B", "C"], 1))).toEqual("#79553d");
  });
  it('getStudyObjectColor_givesExpectedTextQuestionColor', () => {
    expect(service.getStudyObjectColor(new TextQuestion(0, "Name", "Frage", "Name"))).toEqual("#374447");
  });
  it('getStudyObjectColor_givesExpectedSectionElementColor', () => {
    expect(service.getStudyObjectColor(new SectionElement(0, "Name", RandomizingStrategies.NONE))).toEqual("#669ad2");
  });
  it('getStudyObjectColor_givesExpectedSectionColor', () => {
    expect(service.getStudyObjectColor(new Section(0, "Name", true, true, RandomizingStrategies.NONE,))).toEqual("#c8708e");
  });
  it('getStudyObjectColor_givesExpectedSectionElementColor', () => {
    expect(service.getStudyObjectColor(new PauseElement(10))).toEqual("");
  });

});
