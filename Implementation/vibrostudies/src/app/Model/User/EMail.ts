
/**
 *Die public class Email definiert eine E-Mail Adresse
 */
export class EMail {

    /**
     * Das Attribut repräsentiert eine EMail Adresse
     */
    private _email: string;

    /**
     * Hier wird eine neue E-Mail erstellt und ihre Gültigkeit sichergestellt.
     * @param email 
     */
    constructor(email: string) {
        if (this.ensureValidation(email)) {
            this._email = email;
        }
    }

    get email(): string {
        return this._email;
    }

    /**
     * Das Attribut email wird gesetzt und ihre Gültigkeit sichergestellt.
     * @param email 
     */
    set email(email: string) {
        if (this.ensureValidation(email)) {
            this._email = email;
        }

    }

    private ensureValidation(email: string): boolean {
        if (!email) {
            throw new Error("Email kann nicht null oder leer sein.");
        }
        return true;
    }

}
