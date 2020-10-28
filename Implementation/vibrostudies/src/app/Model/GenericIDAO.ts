/**
* Das Data Access Object Interface definiert eine abstrakte API,
* welche Methodenköpfe für die CRUD Operationen auf Objekte T festlegt.
* Sie entkoppelt die API der Domänenmodellschicht von der Persistenzschicht.
 */
export interface IDAO<T> {

    /**
 * get-Methode eines Objekts T
 * @param id ist die ID des Objekts T
 * @returns gesuchtes Objekt T
     */
    get(id: number): Promise<T>;

    /**
 * get-Methode der Liste aus Objekten T
 * @returns Liste aller Objekte T
     */
    getAll(): Promise<T[]>;

    /**
 * Speichert Objekt T in die Datenbank ab
 * @param object zu speicherndes Objekt T
     */
    save(object: T): Promise<void>;

    /**
 * Aktualisiert ein Objekt T
 * @param object zu aktualisierendes Objekt T
 * @param attributes ein String-Array mit den neuen Attributen
     */
    update(object: T, attributes: Array<String>): Promise<void>;

    /**
 * Löscht ein Objekt T aus der Datenbank
 * @param object zu löschendes Objekt T
     */
    delete(object: T): Promise<void>;
}
