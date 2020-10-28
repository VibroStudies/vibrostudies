/**
* Ist das Interface für das Strategie-Entwurfsmuster.
* Es enthält den Methodenkopf für eine randomize()-Methode.
*/
export interface IRandomizerStrategy {
    /**
     * Führt eine Randomisierung auf ein Array von Zahlen aus.
     * @param indeces number-Array in der die ursprünglichen Indizes sind
     * @param fixations boolean-Array in der die Fixierung der Indezes als boolean abgespeichert werden
     * @returns Array von number mit der randomisierten Indexfolge
     */
    randomize(indeces: Array<number>, fixations: Array<boolean>): Array<number>;
}
