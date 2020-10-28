export class TextFieldProperties {

    /**
     * Der Wert des TextFieldProperties.
     */
    private _value: string;
    get value(): string {
        return this._value;
    }
    set value(value: string) {
        this._value = value;
    }


    /**
     * Die Information ob es sich um einen Fehler handelt.
     */
    private _error: boolean;
    get error(): boolean {
        return this._error;
    }
    set error(error: boolean) {
        this._error = error;
    }


    /**
     * Die Farbe, die das TextFieldPropertie erhält.
     */
    private _colour: string;
    get colour(): string {
        return this._colour;
    }
    set colour(colour: string) {
        this._colour = colour;
    }

    
    constructor(value: string, error: boolean, colour: string) {
        this.value = value;
        this.error = error;
        this.colour = colour;
    }
}