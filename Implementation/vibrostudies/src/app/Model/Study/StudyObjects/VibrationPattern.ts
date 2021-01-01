import { ReferenceTuple } from "../ReferenceTuple";
import { AbstractStudyObject } from "./AbstractStudyObject";
import { AbstractVibrationPatternElement } from "./AbstractVibrationPatternElement";
import { PauseElement } from "./PauseElement";
import { VibrationElement } from "./VibrationElement";

/**
 * Ein VibrationPattern stellt ein Studienobjekt dar, mit dem benutzerdefinierte
 * Vibrationsmuster, bestehend aus einstellbaren Pause- und Vibrieren-Elementen, erstellt werden können.
 */
export class VibrationPattern extends AbstractStudyObject {
    objectType = "VibrationPattern";

    /**
     * Das Array enthält die Vibration und PauseElemente aus denen sich eine Vibration zusammensetzt.
     */
    private _vibrationPatternElements: AbstractVibrationPatternElement[];
    get vibrationPatternElements(): AbstractVibrationPatternElement[] {
        return this._vibrationPatternElements;
    }
    set vibrationPatternElements(vibrationPatternElements: AbstractVibrationPatternElement[]) {
        if (vibrationPatternElements == null) {
            throw new Error("Die Liste vibrationPatternElements konnte nicht gesetzt werden, da sie undefiniert ist.");
        }
        this._vibrationPatternElements = vibrationPatternElements;
    }

    /**
     * Ein Attribut, was nicht als Parameter übergeben wird, ist timings. Dieses ist eine Number-Liste, mit dem ein Vibrationsmuster
     * kodiert wird. Werte in dieser Liste stellen eine Zeitdauer in ms dar. Alle geraden Indizes in der Liste entsprechen
     * einem Pause-Element, wohingegen alle ungeraden Indizes in der Liste einem Vibrieren-Element entsprechen.
     *
     * Ein weiteres Attribut, was nicht als Parameter übergeben wird, ist amplitudes. Dieses bezeichnet eine Number-Liste,
     * das die Amplituden-Werte für die Pause- und Vibrieren-Elemente enthält. Hierbei entspricht der i-te Wert der pattern-Liste
     * dem i-ten Wert der amplitudes-Liste. In diesem Liste können Werte zwischen 0 und 255 vorkommen.
     *
     * @param id ist die eindeutige Identifikationsnummer des VibrationPatterns
     * @param fixed entscheidet, ob das VibrationPattern innerhalb eines Section-Elements eine feste Position hat oder die
     * Position von Studieninstanz zu Studieninstanz mit Hilfe von Randomisierung variiert
     */
    constructor(id: number, name: string, displayName: string) {
        super(id, name, displayName);
        this.vibrationPatternElements = [];
    }

}
