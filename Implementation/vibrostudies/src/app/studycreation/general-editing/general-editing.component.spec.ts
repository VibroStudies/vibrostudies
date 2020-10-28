import { KeyData } from '@src/app/Model/Study/KeyData';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { QualificationQuestion } from '@src/app/Model/Study/StudyObjects/Questions/QualificationQuestion';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { GeneralEditingComponent } from '@src/app/studycreation/general-editing/general-editing.component';

describe('GeneralEditingComponent', () => {
  let component: GeneralEditingComponent = new GeneralEditingComponent(new StudyWrapperService());

  it('onAddQualificationQuestion_AddDefaultObjectInQualificationQuestionArray', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.studywrapper.study.keyData.qualiQuestions.length).toEqual(0);
    component.onAddQualificationQuestion();
    expect(component.studywrapper.study.keyData.qualiQuestions.length).toEqual(1);
    expect(component.studywrapper.study.keyData.qualiQuestions[0]).toEqual(
      new QualificationQuestion(component.studywrapper.lastID - 1, 
        "", "", "", false));
  })
  it('removeFromArray_removesTheFirstElementOfAList', () => {
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(component.studywrapper.study.keyData.qualiQuestions.length).toEqual(0);
    component.onAddQualificationQuestion();
    component.onAddQualificationQuestion();
    expect(component.studywrapper.study.keyData.qualiQuestions.length).toEqual(2);
    component.removeFromArray(component.studywrapper.study.keyData.qualiQuestions, 0)
    expect(component.studywrapper.study.keyData.qualiQuestions.length).toEqual(1);
    expect(component.studywrapper.study.keyData.qualiQuestions[0]).toEqual(
      new QualificationQuestion(component.studywrapper.lastID - 1, 
        "", "", "", false));
  })
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
