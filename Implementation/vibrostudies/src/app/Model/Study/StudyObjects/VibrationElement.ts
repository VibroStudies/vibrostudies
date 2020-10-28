import { AbstractVibrationPatternElement } from "./AbstractVibrationPatternElement";

export class VibrationElement extends AbstractVibrationPatternElement {

  /**
   * Amplitude gibt an wie stark die Vibration die ausgeführt werden soll ist.
   */
  private _amplitude: number;
  get amplitude(): number {
    return this._amplitude;
  }
  set amplitude(amplitude: number) {
    if (amplitude == null) {
      throw new Error("Amplitude konnte nicht gesetzt werden, da sie undefiniert ist.");
    }
    const temp = Number(amplitude);
    this.ensure8bitNumber(temp);
    this._amplitude = temp;
  }

  constructor(duration: number, amplitude: number) {
    super(duration);
    this.ensure8bitNumber(amplitude);
    this._amplitude = amplitude;
  }

  // Stellt sicher, dass der Parameter im erlaubten Bereich von 0 bis 255 liegt
  private ensure8bitNumber(amplitude: number) {
    if (!Number.isInteger(amplitude)) {
      throw new Error("Es sind nur Ganzzahlen erlaubt.");
    }
    if (!(amplitude > 0 && amplitude <= 255)) {
      throw new Error("Es sind nur Werte zwischen 1 und 255 erlaubt.");
    }
  }
}
