import { KeyData } from '@src/app/Model/Study/KeyData';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { TextBlockEditingComponent } from '@src/app/studycreation/textblock-editing/textblock-editing.component';

describe('TextBlockEditingComponent', () => {
  let component: TextBlockEditingComponent;

  it('ngOnInit_writesExpectedTextBlocksInArray', () => {
    const text1 = new TextBlock(0, "Text", "Sehr langer Text");
    const text2 = new TextBlock(1, "Text", "Sehr kurzer Text");
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new TextBlockEditingComponent(wrapper);
    component.ngOnInit();
    expect(component.textblocks).toEqual([text2, text1]);
  });
  it('onAddTextBlock_addsNewDefaultTextBlock', () => {
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new TextBlockEditingComponent(wrapper);
    component.onAddTextBlock();
    expect(component.textblocks[0]).toEqual(new TextBlock(3, "", ""));
  });
  it('removeFromStudy_removesItemFromVibrationpatternAndStudyObjectList', () => {
    const text1 = new TextBlock(0, "Text", "Sehr langer Text");
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new TextBlockEditingComponent(wrapper);
    component.ngOnInit();
    component.removeFromStudy(0, 0);
    expect(component.textblocks[0]).toEqual(text1);
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
  const text1 = new TextBlock(0, "Text", "Sehr langer Text");
  const text2 = new TextBlock(1, "Text", "Sehr kurzer Text");
  const date = new DateQuestion(2, "Datum", "Welcher Tag ist heute?", "Datum");
  const study = new StudyPrototype(keyData);
  study.studyObjects = [text1, text2, date];
  return study;
}
