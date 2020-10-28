
/**
 * Das public enum UserPermission definiert, welche Aktionen ein Benutzer ausführen darf.
 */
export enum UserPermission {
    /**
     * Ein PARTICIPANT kann an einer Studie teilnehmen.
     */
    PARTICIPANT,
    /**
     * Ein CREATOR kann an einer Studie teilnehmen, die nicht von ihm erstellt wurde und eigene Studien erstellen.
     */
    CREATOR,
    /**
     * Ein ADMINISTRATOR kann die Stufe eines Benutzers verändern. Außerdem kann er Studien erstellen und an ihnen teilnehmen.
     */
    ADMINISTRATOR
}

