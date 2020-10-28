/**
* Das Interface für das Prototype-Muster.
* Es enthält den Methodenkopf für die clone-Methode.
 */
export interface IPrototype<T> {

    /**
 * Erstellt ein Klon von Objekt T
 *@returns object zu klonendes Objekt T
     */
    clone(): T;
}

