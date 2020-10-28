import { ReferenceTuple } from "../Study/ReferenceTuple";
import { IRandomizerStrategy } from "./IRandomizerStrategy";


export module IRandomizerStrategyAdapter {
    /**
     * Die Methode randomize passt die Darstellung der Daten in ReferenceTuplen die randomisiert werden 
     * an eine allgemeinere Darstellung in numbers und booleans an und randomisiert mit der mittels der 
     * mitgegebenen Strategie über die Daten und gibt die Ausgabe für den Aufrufer passend in ReferenceTuplen zurück.
     * @param randomizer IRandomizerStrategy ist die Randomisierung, die für das ReferenceTuple-Array verwendet wird
     * @param refArray refArray Array<ReferenceTuple> ist das ReferenceTuple-Array, was randomisiert werden soll
     */
    export function randomize(randomizer: IRandomizerStrategy, refArray: ReferenceTuple[]): ReferenceTuple[] {
        let indices = [];
        let fixations = [];
        let returnArray: ReferenceTuple[] = [];
        if (refArray.length > 0) {
            for (let element of refArray) {
                indices.push(element.ID);
                fixations.push(element.isFixed);
            }
            let newIndices = randomizer.randomize(indices, fixations);
            for (let indice of newIndices) {
                for (let element of refArray) {
                    if (indice == element.ID) {
                        returnArray.push(element);
                        break;
                    }
                }
            }
        }
        return returnArray;
    }
}