import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { SequenceEditingComponent } from '@src/app/studycreation/sequence-editing/sequence-editing.component';

describe('SequenceEditingComponent', () => {
  let component: SequenceEditingComponent;

  it('ngOnInit_pushSectionsOfStudyInToolblox', () => {
    component = new SequenceEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype();
    component.ngOnInit();
    const sec1 = new Section(1, "Name", true, false, RandomizingStrategies.NONE);
    expect(component.toolbox).toEqual([sec1]);
  });
  it('findSectionById_givesExpectedSection', () => {
    component = new SequenceEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype();
    const sec1 = new Section(1, "Name", true, false, RandomizingStrategies.NONE);   
    const sec2 = new Section(2, "Name", true, false, RandomizingStrategies.NONE);
    component.studywrapper.study.sections.push(sec2);
    expect(component.findSectionById(2)).toEqual(sec2);
  });
  it('removeFromArray_removesExpectedElement', () => {
    component = new SequenceEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype();
    const arr = [0, 1, 2, 3, 4, 5, 6];
    component.removeFromArray(arr, 3);
    expect(arr.length).toEqual(6);
    expect(arr[3]).toEqual(4);
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
  const sec1 = new Section(1, "Name", true, false, RandomizingStrategies.NONE);
  const study = new StudyPrototype(keyData);
  study.sections = [sec1];
  return study;
}
