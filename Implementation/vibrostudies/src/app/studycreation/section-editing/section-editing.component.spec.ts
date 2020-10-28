import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { AbstractStudyObject } from '@src/app/Model/Study/StudyObjects/AbstractStudyObject';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { SectionElement } from '@src/app/Model/Study/StudyObjects/SectionElement';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { SectionElementEditingComponent } from '@src/app/studycreation/sectionelement-editing/sectionelement-editing.component';

describe('SectionElementEditingComponent', () => {
  let component: SectionElementEditingComponent = new SectionElementEditingComponent(new StudyWrapperService(), null);

  it('ngOnInit_pushSectionElementsAndStudyObjectsInArrayInClass', () => {
    component = new SectionElementEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype(); 
    const s1 = new SectionElement(0, "Lange Vibrationen", RandomizingStrategies.NONE);
    const s2 = new SectionElement(1, "Kurze Vibrationen", RandomizingStrategies.NONE);
    const q1 = new DateQuestion(2, "Datum", "Welcher Tag ist heute?", "Datum");
    const q2 = new MultipleChoiceQuestion(3, "Auswahl", "Wie ist das KIT?", "Auswahl",
    ["anstrengend", "cool", "langweilig", "einfach"], 2);
    const studyObjects: AbstractStudyObject[] = [q1, q2];
    const sectionElements: SectionElement[] = [s1, s2];
    component.studywrapper.study._studyObjects = studyObjects;
    component.studywrapper.study.sectionElements = sectionElements;
    component.ngOnInit();
    expect(component.sectionelements).toEqual(sectionElements);
    expect(component.toolbox).toEqual(studyObjects)
  });
  it('removeFromArray_removesExpectedElement', () => {
    component = new SectionElementEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype();
    const arr = [0, 1, 2, 3, 4, 5, 6];
    component.removeFromArray(arr, 3);
    expect(arr.length).toEqual(6);
    expect(arr[3]).toEqual(4);
  });
  it('findStudyObjectById_givesExpectedStudyObject', () => {
    component = new SectionElementEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype();
    const q1 = new DateQuestion(2, "Datum", "Welcher Tag ist heute?", "Datum");
    const q2 = new MultipleChoiceQuestion(3, "Auswahl", "Wie ist das KIT?", "Auswahl",
    ["anstrengend", "cool", "langweilig", "einfach"], 2);
    const studyObjects: AbstractStudyObject[] = [q1, q2];
    component.studywrapper.study._studyObjects = studyObjects;
    expect(component.findStudyObjectById(3)).toEqual(q2);
  });
  it('findStudyObjectById_ErrorInvalidIndex', () => {
    component = new SectionElementEditingComponent(new StudyWrapperService(), null);
    component.studywrapper.study = createDefaultStudyPrototype();
    expect(function () { component.findStudyObjectById(3) }).toThrowError("AbstractStudyObject mit der id 3 gibt es nicht.")
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
