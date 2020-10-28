import { PauseElement } from '@src/app/Model/Study/StudyObjects/PauseElement';
import { VibrationElement } from '@src/app/Model/Study/StudyObjects/VibrationElement';
import { VibrationPatternToolboxComponent } from '@src/app/studycreation/toolboxes/vibrationpattern-toolbox/vibrationpattern-toolbox.component';

describe('VibrationpatternToolboxComponent', () => {
  let component: VibrationPatternToolboxComponent;

  it('ngOnInit_initializeInitConnectedLists', () => {
    component = new VibrationPatternToolboxComponent();
    component.vibrationpatternCount = 3;
    component.ngOnInit();
    expect(component.connectedLists.length).toEqual(3);
  });
  it('isVibration_True', () => {
    component = new VibrationPatternToolboxComponent();
    expect(component.isVibration(new VibrationElement(10, 10))).toEqual(true);
  });
  it('isVibration_False', () => {
    component = new VibrationPatternToolboxComponent();
    expect(component.isVibration(new PauseElement(10))).toEqual(false);
  });
  it('isPause_True', () => {
    component = new VibrationPatternToolboxComponent();
    expect(component.isPause(new PauseElement(10))).toEqual(true);
  });
  it('isPause_False', () => {
    component = new VibrationPatternToolboxComponent();
    expect(component.isPause(new VibrationElement(10, 10))).toEqual(false);
  });

});
