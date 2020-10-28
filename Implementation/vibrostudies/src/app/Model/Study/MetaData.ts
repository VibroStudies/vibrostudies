/**
 * Die Klasse MetaDaten beinhaltet wichtige Informationen über das Gerät auf dem eine Studie ausgeführt wird.
 */
export class MetaData {

    /**
     * Die Marke des Geräts auf den die Studie ausgeführt wurde.
     */
    private _brand: string;
    get brand(): string {
        return this._brand;
    }
    set brand(brand: string) {
        this._brand = brand;
    }

    /**
     * Die Gerätebezeichnung des Geräts auf dem die Studie ausgeführt wird.
     */
    private _device: string;
    get device(): string {
        return this._device;
    }
    set device(device: string) {
        this._device = device;
    }

    /**
     * Der Displaytyp des Geräts.
     */
    private _display: string;
    get display(): string {
        return this._display;
    }
    set display(display: string) {
        this._display = display;
    }

    /**
     * Die Hardwaredetails des Geräts. 
     */
    private _hardware: string;
    get hardware(): string {
        return this._hardware;
    }
    set hardware(hardware: string) {
        this._hardware = hardware;
    }

    /**
     * Hersteller des Geräts.
     */
    private _manufacturer: string;
    get manufacturer(): string {
        return this._manufacturer;
    }
    set manufacturer(manufacturer: string) {
        this._manufacturer = manufacturer;
    }

    /**
     * Modell das Geräts 
     */
    private _model: string;
    get model(): string {
        return this._model;
    }
    set model(model: string) {
        this._model = model;
    }

    /**
     * Produktlinie des Geräts
     */
    private _product: string;
    get product(): string {
        return this._product;
    }
    set product(product: string) {
        this._product = product;
    }

    /**
     * Versionsnummer des AndroidSDK
     */
    private _androidsdk: number;
    get androidsdk(): number {
        return this._androidsdk;
    }
    set androidsdk(androidsdk: number) {
        this._androidsdk = androidsdk;
    }

    /**
     * Zeit in Millisekunden die für die Durchführung einer Nutzerstudie benötigt wurde.
     */
    private _timeInMs: number;
    get timeInMs(): number {
        return this._timeInMs;
    }
    set timeInMs(time: number) {
        this._timeInMs = time;
    }

    /**
     * Speichert, ob das Gerät eine Unterstützung für die Amplitude von Vibrationen hat.
     */
    private _hasAmplitude: boolean;
    get hasAmplitude(): boolean {
        return this._hasAmplitude;
    }
    set hasAmplitude(hasAmplitude: boolean) {
        this._hasAmplitude = hasAmplitude;
    }

    constructor(brand: string,
        device: string,
        display: string,
        hardware: string,
        manufacturer: string,
        model: string,
        product: string,
        androidsdk: number,
        timeInMs: number, hasAmplitude: boolean) {
        this._brand = brand;
        this._device = device;
        this._display = display;
        this._hardware = hardware;
        this._manufacturer = manufacturer;
        this._model = model;
        this._product = product;
        this._androidsdk = androidsdk;
        this._timeInMs = timeInMs;
        this._hasAmplitude = hasAmplitude;
    }
}
