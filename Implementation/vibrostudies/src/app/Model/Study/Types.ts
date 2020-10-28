export enum Types {
    /**
     * Ein SectionElement welches ein Container Objekt für die meisten StudyObjects ist und welches dem Container Section zugeordnet wird
     */
    SECTIONELEMENT,

    /**
     * Dieser Typ bezieht sich auf die Klasse VibrationPattern, aus der direkt eine Vibration generiert wird.
     */
    VIBRATIONPATTERN,

    /**
     * Allgemeiner Typ für alle Arten von Fragen
     */
    QUESTION,

    /**
     * Eine Section ist ein Container Objekt für SectionElements
     */
    SECTION,

    /**
     * Texte beziehen sich auf die Klasse TextBlock, in welchen nur Texte gespeichert werden
     */
    TEXT
}
