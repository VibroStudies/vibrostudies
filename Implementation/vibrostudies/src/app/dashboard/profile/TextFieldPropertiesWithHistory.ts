import { TextFieldProperties } from "./TextFieldProperties";

export class TextFieldPropertiesWithHistory extends TextFieldProperties {
    /**
     * Der erste Wert der TextFieldPropertie.
     */
    private _initialValue: string;
    get initialValue(): string {
        return this._initialValue;
    }
    set initialValue(initialValue: string) {
        this._initialValue = initialValue;
    }

    constructor(initialValue: string, currentValue: string, error: boolean, colour: string) {
        super(currentValue, error, colour);
        this.initialValue = initialValue;
    }

}