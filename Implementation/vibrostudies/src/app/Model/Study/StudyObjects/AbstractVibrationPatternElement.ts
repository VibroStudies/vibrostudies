import { AbstractStudyObject } from "./AbstractStudyObject";

/**
 * Ein AbstractVibrationPatternElement ist ein abstraktes Element, aus dem Vibrationen
 * erstellt werden können. Die Klasse spezialisiert sich in Pause und VibrationElemente.
 */
export abstract class AbstractVibrationPatternElement {

  /**
   * Duration gibt an wie lange in Millisekunden der Effekt der ausgeführt wird.
   */
  private _duration: number;
  get duration(): number {
    return this._duration;
  }
  // 2^64 weil long. Long weil es gecastet werden muss
  set duration(duration: number) {
    this.ensure64BitNumber(duration);
    this._duration = duration;
  }

  /**
   * Dieser Konstruktor prüft, bevor es ein AbstractVibrationPatternElement erstellt, den Paramter duration, da
   * dieser nur Werte zwischen 0 und 2^(64) - 1 annehmen darf.
   * @param duration beschreibt die Dauer in ms
   */
  constructor(duration: number) {
    this.duration = duration;
  }

  private ensure64BitNumber(duration: number): void {
    if (duration == null) {
      throw new Error("Duration darf nicht null sein.");
    }
    if (!(duration >= 0 && duration < Math.pow(2, 64))) {
      throw new Error("Es sind nur positive long Werte, also Werte zwischen 0 und 2^(64) - 1, akzeptiert.");
    }
  }
}
