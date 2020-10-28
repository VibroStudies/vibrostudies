import { IRandomizerStrategy } from './IRandomizerStrategy';

/**
 * StandardRandomizer ist eine konkrete Strategie aus IRandomizerStrategy.
 * Sie implementiert eine Standardmethode für die Randomisierung.
 */
export class StandardRandomizer implements IRandomizerStrategy {
    /**
     * Erzeugt ein Array mit den Indizes der Listenelemente und randomisiert diese
     * nach dem Fisher-Yates (Knuth) Shuffle.
     * Die randomisierten Indizes gibt er wieder zurück, wobei er die fixierten Indizes auf der gleichen Positon lässt.
     * @param indices number-Array in der die ursprünglichen Indizes sind
     * @param fixations boolean-Array in der die Fixierung der Indezes als boolean abgespeichert werden
     * @returns Array von number mit der randomisierten Indexfolge
     */
    randomize(indices: Array<number>, fixations: Array<boolean>): Array<number> {
        const indicesLength = indices.length;
        const fixationsLength = fixations.length;

        if (this.ensureLengthValidation(indicesLength, fixationsLength)) {
            const totalFixations = fixations.filter(element => element === true).length;
            if (totalFixations >= fixationsLength - 1) {
                return indices;
            }
            if (totalFixations === 0) {
                return this.shuffle(indices);
            }
            return this.calculateReturningIndices(indices, fixations, fixationsLength);
        }
    }

    /**
     * Extrahiert die fixierten Indizes aus indices und shuffelt die übrigen Indizes mit shuffle.
     * Danach werden beide Indizes zusammengeführt.
     * @param indices number-Array in der die ursprünglichen Indizes sind
     * @param fixations boolean-Array in der die Fixierung der Indezes als boolean abgespeichert werden
     * @param length number für das neue 2D Array, welches indices und fixation zusammenführt
     * @returns Array von number mit der randomisierten Indexfolge
     */
    private calculateReturningIndices(indices: Array<number>, fixations: Array<boolean>, length: number): Array<number> {
        const combined = this.combineIndecesFixations(indices, fixations, length);
        const randomisedArray = this.shuffle(this.filterAsNonFixedArray(combined));
        return this.pasteRandomsInIndexArray(combined, randomisedArray);
    }

    /**
     * Filtert aus dem indexArray alle Einträge raus, die als fix gesetzt wurden und gibt
     * das kleiner gewordene gefilterte Array zurück.
     * @param combined 2D-Array bestehend aus [number, boolean] der Indizes
     * @returns number-Array mit den nicht-fixierten Einträgen
     */
    private filterAsNonFixedArray(combined: Array<[number, boolean]>): Array<number> {
        const nonFixedArray = combined.filter(tuple => {
            if (tuple[1] === false) {
                return tuple[0];
            }
        }).map(tuple => tuple[0]);
        return nonFixedArray;
    }

    /**
     * Führt den Fisher-Yates (Knuth) Shuffle auf ein Array aus.
     * @param orderedArr number-Array des zu vermischenden Arrays
     * @returns number-Array des vermischten Arrays
     */
    private shuffle(orderedArray: Array<number>): Array<number> {
        let temporaryValue: number;
        let randomIndex: number;
        let currentIndex = orderedArray.length;

        while (0 !== currentIndex) {
            /**
             * Wählt einen zufälligen Index. Pro Iteration wird der Zahlenbereich
             * aus dem der Index bestimmt wird, kleiner.
             */
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            /**
             * Austausch zweier Elemente aus dem zufällig generierten Index.
             */
            temporaryValue = orderedArray[currentIndex];
            orderedArray[currentIndex] = orderedArray[randomIndex];
            orderedArray[randomIndex] = temporaryValue;
        }
        return orderedArray;
    }

    /**
     * Schreibt die vermischten Indizes zusammen mit den fixen Indizes in ein neues
     * IndexArray rein.
     * @param combined 2D-Array bestehend aus [number, boolean] der Indizes
     * @param randomisedArray number-Array in der die vermischten Indizes ohne fixe Indezes sind
     * @returns number-Array mit den vermischten Indezes
     */
    private pasteRandomsInIndexArray(combined: Array<[number, boolean]>, randomisedArray: Array<number>): Array<number> {
        let randomisedCounter = 0;
        const randomIndices = combined.map(tuple => {
            if (tuple[1] === false) {
                return randomisedArray[randomisedCounter++];
            }
            return tuple[0];
        });
        return randomIndices;
    }

    /**
     * Fügt indeces und fixations in einem kombinierten Array zusammen.
     * @param indices number-Array in der die ursprünglichen Indizes sind
     * @param fixations boolean-Array in der die Fixierung der Indezes als boolean abgespeichert werden
     * @param length number für das neue 2D Array
     * @throws Error sobald ein Eintrag eines Arrays null aufweist
     */
    private combineIndecesFixations(indices: Array<number>, fixations: Array<boolean>, length: number): Array<[number, boolean]> {
        const combined = Array<[number, boolean]>(length);
        for (let index = 0; index < length; index++) {
            if ((indices[index] == null) || (fixations[index] == null)) {
                throw new Error("Indeces or fixations has a null or undefined entry.");
            }
            combined[index] = [indices[index], fixations[index]];
        }
        return combined;
    }

    /**
     * Überprüft, ob die Länge der Arrays übereinstimmt und nicht leer sind.
     * @param indicesLength number der indeces-Arraylänge
     * @param fixationsLength number der fixations-Arraylänge
     * @throws Error sobald einer der Arraylängen falsch ist
     */
    private ensureLengthValidation(indicesLength: number, fixationsLength: number): boolean {
        if (indicesLength === 0 || fixationsLength === 0) {
            throw new Error("Indeces or fixations can't be empty.");
        }
        if (indicesLength !== fixationsLength) {
            throw new Error("Indeces and fixations should be the same length.");
        }
        return true;
    }
}
