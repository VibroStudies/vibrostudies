import { VibrationElement } from "../VibrationElement";



describe('VibrationElement', () => {
    it('getAmplitude_givesExpectedAmplitude', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        expect(vibration.amplitude).toEqual(10);
    });
    it('setAmplitude_setsExpectedAmplitude', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        vibration.amplitude = 100;
        expect(vibration.amplitude).toEqual(100);
    });
    it('setAmplitudeNull_Error', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        expect(function () { vibration.amplitude = null; })
        .toThrowError("Amplitude konnte nicht gesetzt werden, da sie undefiniert ist.");
    });
    it('setAmplitudeNoInteger_Error', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        expect(function () { vibration.amplitude = 3.14; }).toThrowError("Es sind nur Ganzzahlen erlaubt.");
    });
    it('setAmplitudeOtOfRange_Error', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        expect(function () { vibration.amplitude = -4; }).toThrowError("Es sind nur Werte zwischen 1 und 255 erlaubt.");
    });
    it('setAmplitudeOtOfRange_Error', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        expect(function () { vibration.amplitude = 400; }).toThrowError("Es sind nur Werte zwischen 1 und 255 erlaubt.");
    });
    it('setDurationOutOfRange_Error', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        expect(function () { vibration.duration = -100; })
        .toThrowError("Es sind nur positive long Werte, also Werte zwischen 0 und 2^(64) - 1, akzeptiert.");
    });
    it('setDuration_setsExpectedDuration', () => {
        const vibration: VibrationElement = createVibrationElementDefault();
        vibration.duration = 100;
        expect(vibration.duration).toEqual(100);
    });
});

function createVibrationElementDefault(): VibrationElement {
    const element: VibrationElement = new VibrationElement(10, 10);
    return element;
}
