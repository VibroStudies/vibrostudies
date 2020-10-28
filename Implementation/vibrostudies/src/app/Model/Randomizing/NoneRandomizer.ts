import { IRandomizerStrategy } from "./IRandomizerStrategy";

/**
 * NoneRandomizer ist eine konkrete IRandomizerStrategy die alle Daten unverändert wieder zurück gibt.
 */
export class NoneRandomizer implements IRandomizerStrategy {
    /**
     * Das Eingabearray Indizes wird unverändert wieder zurückgegeben.
     * @param indeces 
     * @param fixations 
     */
    randomize(indeces: number[], fixations: boolean[]): number[] {
        return indeces;
    }

}