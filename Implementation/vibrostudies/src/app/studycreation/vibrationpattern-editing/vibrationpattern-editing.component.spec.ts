import { KeyData } from '@src/app/Model/Study/KeyData';
import { ShortDescription } from '@src/app/Model/Study/ShortDescription';
import { PauseElement } from '@src/app/Model/Study/StudyObjects/PauseElement';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { VibrationElement } from '@src/app/Model/Study/StudyObjects/VibrationElement';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { StudyPrototype } from '@src/app/Model/Study/StudyPrototype';
import { StudyStatus } from '@src/app/Model/Study/StudyStatus';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';
import { VibrationPatternEditingComponent } from '@src/app/studycreation/vibrationpattern-editing/vibrationpattern-editing.component';

describe('VibrationPatternEditingComponent', () => {
  let component: VibrationPatternEditingComponent;

  it('ngOnInit_pushVibrationPatternInList', () => {
    const vib1 = new VibrationElement(1000, 200);
    const vib2 = new VibrationElement(500, 200);
    const pause1 = new PauseElement(200);
    const langeVibs = new VibrationPattern(0, "Lang");
    langeVibs.vibrationPatternElements = [vib1, pause1, vib2];
    const vib3 = new VibrationElement(100, 200);
    const vib4 = new VibrationElement(300, 200);
    const pause2 = new PauseElement(100);
    const kurzeVibs = new VibrationPattern(1, "Kurz");
    kurzeVibs.vibrationPatternElements = [vib3, pause2, vib4];
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    component.ngOnInit();
    expect(component.vibrationpatterns).toEqual([kurzeVibs, langeVibs]);
  });
  it('onAddVibrationPattern_addsNewVibrationPattern', () => {
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    component.onAddVibrationPattern();
    expect(component.vibrationpatterns[0]).toEqual(new VibrationPattern(
      3, ""));
  });
  it('isVibration_givesExpectedTrue', () => {
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    expect(component.isVibration(new VibrationElement(10, 100))).toEqual(true);
  })
  it('isVibration_givesExpectedFalse', () => {
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    expect(component.isVibration(new PauseElement(10))).toEqual(false);
  })
  it('isPause_givesExpectedTrue', () => {
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    expect(component.isPause(new VibrationElement(10, 100))).toEqual(false);
  })
  it('isPause_givesExpectedFalse', () => {
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    expect(component.isPause(new PauseElement(10))).toEqual(true);
  })
  it('removeFromArray', () => {
      const wrapper = new StudyWrapperService();
      wrapper.study = createDefaultStudyPrototype();
      component = new VibrationPatternEditingComponent(wrapper);
      const arr = [1, 2, 3, 4, 5];
      component.removeFromArray(arr, 0);
      expect(arr[0]).toEqual(2);
  });
  
  it('removeFromStudy_removesItemFromVibrationpatternAndStudyObjectList', () => {
    const vib1 = new VibrationElement(1000, 200);
    const vib2 = new VibrationElement(500, 200);
    const pause1 = new PauseElement(200);
    const langeVibs = new VibrationPattern(0, "Lang");
    langeVibs.vibrationPatternElements = [vib1, pause1, vib2];
    const wrapper = new StudyWrapperService();
    wrapper.study = createDefaultStudyPrototype();
    component = new VibrationPatternEditingComponent(wrapper);
    component.ngOnInit();
    component.removeFromStudy(0, 1);
    expect(component.vibrationpatterns[0]).toEqual(langeVibs);
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
  const vib1 = new VibrationElement(1000, 200);
  const vib2 = new VibrationElement(500, 200);
  const pause1 = new PauseElement(200);
  const langeVibs = new VibrationPattern(0, "Lang");
  langeVibs.vibrationPatternElements = [vib1, pause1, vib2];
  const vib3 = new VibrationElement(100, 200);
  const vib4 = new VibrationElement(300, 200);
  const pause2 = new PauseElement(100);
  const kurzeVibs = new VibrationPattern(1, "Kurz");
  kurzeVibs.vibrationPatternElements = [vib3, pause2, vib4];
  const date = new DateQuestion(2, "Datum", "Welcher Tag ist heute?", "Datum");
  const study = new StudyPrototype(keyData);
  study.studyObjects = [date, langeVibs, kurzeVibs];
  return study;
}
