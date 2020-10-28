import { VibrationPattern } from "../VibrationPattern";
import { VibrationElement } from "../VibrationElement";
import { PauseElement } from "../PauseElement";
import { AbstractVibrationPatternElement } from "../AbstractVibrationPatternElement";
import { mock } from "ts-mockito";

const id = 2;
const name = "Name";
const mockedVibrationPatternElement = mock(AbstractVibrationPatternElement);

describe('VibrationPattern', () => {

    it("getVibrationPatternElements_MockObject", function () {
        expect(createMockedVibrationPattern().vibrationPatternElements).toEqual([mockedVibrationPatternElement]);
    });

    it("setVibrationPatternElements_MockObject", function () {
        const mockedVibrationPatternElement = mock(AbstractVibrationPatternElement);
        let pattern = createMockedVibrationPattern();
        pattern.vibrationPatternElements = [mockedVibrationPatternElement];
        expect(pattern.vibrationPatternElements).toEqual([mockedVibrationPatternElement]);
    });

    it('getVibrationPatternElements_givesExpectedVibrationPatternElements', () => {
        const pattern: VibrationPattern = createVibrationPatternDefault();
        expect(pattern.vibrationPatternElements).toEqual(createVibrationPatternElements());
    });
    it('setVibrationPatternElement_addsExpectedVibrationPatternElement', () => {
        const pattern: VibrationPattern = createVibrationPatternDefault();
        expect(pattern.vibrationPatternElements = createAlternativeVibrationPatternElements())
            .toEqual(createAlternativeVibrationPatternElements());
    });
    it('addVibrationPatternElementNull_Error', () => {
        const pattern: VibrationPattern = createVibrationPatternDefault();
        expect(function () { pattern.vibrationPatternElements = null; })
            .toThrowError("Die Liste vibrationPatternElements konnte nicht gesetzt werden, da sie undefiniert ist.");
    });
});


function createVibrationPatternDefault(): VibrationPattern {
    const element: VibrationPattern = new VibrationPattern(id, name);
    element.vibrationPatternElements = createVibrationPatternElements();
    return element;
}

function createVibrationPatternElements(): AbstractVibrationPatternElement[] {
    const list: AbstractVibrationPatternElement[] = [];
    const pause1: PauseElement = new PauseElement(200);
    const vibration1: VibrationElement = new VibrationElement(300, 30);
    list.push(pause1);
    list.push(vibration1);
    return list;
}

function createAlternativeVibrationPatternElements(): AbstractVibrationPatternElement[] {
    const list: AbstractVibrationPatternElement[] = [];
    const pause1: PauseElement = new PauseElement(15);
    const vibration1: VibrationElement = new VibrationElement(16, 100);
    const pause2: PauseElement = new PauseElement(100);
    const vibration2: VibrationElement = new VibrationElement(90, 10);
    list.push(pause1);
    list.push(vibration1);
    list.push(pause2);
    list.push(vibration2);
    return list;
}

function createMockedVibrationPattern(): VibrationPattern {
    const pattern = new VibrationPattern(1, "Name");
    pattern.vibrationPatternElements = [mockedVibrationPatternElement];
    return pattern;
}
