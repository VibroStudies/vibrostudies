
import { PauseElement } from "../PauseElement";



describe('PauseElement', () => {
    it('getDuration_givesExpectedDuration', () => {
        const pause: PauseElement = createPauseElementDefault();
        expect(pause.duration).toEqual(1000);
    });
    it('setDuration_setsExpectedDuration', () => {
        const pause: PauseElement = createPauseElementDefault();
        pause.duration = 1000;
        expect(pause.duration).toEqual(1000);
    });
    it('setNegativeDuration_Error', () => {
        const pause: PauseElement = createPauseElementDefault();
        expect(function () { pause.duration = -4; })
        .toThrowError("Es sind nur positive long Werte, also Werte zwischen 0 und 2^(64) - 1, akzeptiert.");
    });
    it('setOutOfRangeDuration_Error', () => {
        const pause: PauseElement = createPauseElementDefault();
        expect(function () { pause.duration = Math.pow(2, 65); })
        .toThrowError("Es sind nur positive long Werte, also Werte zwischen 0 und 2^(64) - 1, akzeptiert.");
    });
    it('setNullDuration_Error', () => {
        const pause: PauseElement = createPauseElementDefault();
        expect(function () { pause.duration = null; })
        .toThrowError("Duration darf nicht null sein.");
    });
});

function createPauseElementDefault(): PauseElement {
    const element: PauseElement = new PauseElement(1000);
    return element;
}
