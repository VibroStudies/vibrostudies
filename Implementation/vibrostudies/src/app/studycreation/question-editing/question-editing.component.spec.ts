import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { QuestionEditingComponent } from '@src/app/studycreation/question-editing/question-editing.component';

describe('QuestionEditingComponent', () => {
  let component: QuestionEditingComponent = new QuestionEditingComponent(new StudyWrapperService(), null);

  it('onAddAnswerChoice_addedNewExpectedAnswerOption', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    const question = new MultipleChoiceQuestion(1, "Mult", "Frage", "Frage", ["A", "B", "C"], 1);
    component.onAddAnswerChoice(question);
    expect(question.answerOptions[3]).toEqual("");
  });
  it('removeFromStudy_removesExpectedElementWithIdFromStudy', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    const q1 = new TextQuestion(0, "Name", "Text", "Frage");
    const q2 = new TextQuestion(1, "Name", "Text", "Frage");
    const q3 = new TextQuestion(2, "Name", "Text", "Frage");
    component.questions = [q1, q2, q3];
    component.studywrapper.study.studyObjects = [q1, q2, q3];
    component.removeFromStudy(1, 1);
    expect(component.questions[1]).toEqual(q3);
    expect(component.studywrapper.study._studyObjects[1]).toEqual(q3);
  });
  it('getStudyObjectTypeName_getVibrationPatternStringOfObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new VibrationPattern(1, "Name"))).toEqual("VibrationPattern");
  });
  it('getStudyObjectTypeName_getTextBlockStringOfObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new TextBlock(1, "Name", "Text"))).toEqual("TextBlock");
  });
  it('getStudyObjectTypeName_getDateQuestionStringOfObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new DateQuestion(1, "Name", "Frage", "Frage"))).toEqual("Datum");
  });
  it('getStudyObjectTypeName_getLinearScaleQuestionStringOfObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new LinearScaleQuestion(1, "Name", "Frage", "Frage", 5, "klein", "groß"))).toEqual("Lineare Skala");
  });
  it('getStudyObjectTypeName_getMultipleChoiceQuestionStringOfObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new MultipleChoiceQuestion(1, "Name", "Frage", "Frage", ["A", "B", "C"], 1))).toEqual("Multiple Choice");
  });
  it('getStudyObjectTypeName_getTextQuestionStringOfObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new TextQuestion(1, "Name", "Frage", "Frage"))).toEqual("Freitext");
  });
  it('getStudyObjectTypeName_ErrorNotExpectedObject', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.getStudyObjectTypeName(new Section(1, "name", true, false, RandomizingStrategies.NONE))).toEqual("undefined");
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
