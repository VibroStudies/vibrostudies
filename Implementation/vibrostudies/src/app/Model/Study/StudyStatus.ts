export enum StudyStatus {
    /**
     * Die Studie wurde erstellt und ist noch in Bearbeitung also nicht veröffentlicht
     */
    CREATED,

    /**
     * Die Studie wurde veröffentlicht und Studienteilnehmer können an der Studie teilnehmen
     */
    PUBLISHED,

    /**
     * Es ist nicht mehr möglich an der Studie teilzunehmen.
     * Der Studienleiter kann nun die Ergebnisse auswerten
     */
    FINISHED
}
