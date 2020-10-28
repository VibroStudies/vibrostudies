/**
 * Ein ReferenceTuple liegt in einer Container Objekt und speichert die ID des Elements,
 * welches dem Container zugeordnet werden soll, sowie die Information, ob das entspechende 
 * Objekt bei einer Randomisierung des Containers seine Position behalten soll.
 */
export class ReferenceTuple {
    /**
     * ID des Objekts, dass dem Container zugeordnet wird.
     */
    private _ID: number;
    get ID(): number {
        return this._ID;
    }
    set ID(ID: number) {
        this._ID = ID;
    }

    /**
     * Information, ob Objekt bei Randomisierung des Containers seine Position behaöten soll.
     */
    private _isFixed: boolean;
    get isFixed(): boolean {
        return this._isFixed;
    }
    set isFixed(isFixed: boolean) {
        this._isFixed = isFixed;
    }

    constructor(ID: number, isFixed: boolean) {
        this._ID = ID;
        this._isFixed = isFixed;
    }
}
