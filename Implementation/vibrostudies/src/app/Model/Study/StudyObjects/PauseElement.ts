import { AbstractVibrationPatternElement } from "./AbstractVibrationPatternElement";

export class PauseElement extends AbstractVibrationPatternElement {
  constructor(duration: number) {
    super(duration);
  }
}
