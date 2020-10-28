
/**
 *Die public class Password definiert ein Passwort.
 */
export class Password {

    /**
     * Das Attribut repräsentiert ein Passwort.
     */
    private _password: string;

    /**
     * Ein neues Password wird erstellt und die Gültigkeit wird sichergestellt.
     * @param password 
     */
    constructor(password: string) {
        if (this.ensureValidation(password)) {
            this.password = password;
        }

    }

    get password(): string {
        return this._password;
    }

    /**
     * Das Atrribut password wird gesetzt und die Gültigkeit sichergestellt.
     * @param password 
     */

    set password(password: string) {
        if (this.ensureValidation(password)) {
            this._password = password;
        }
    }

    private ensureValidation(password: string): boolean {
        if (!password) {
            throw new Error("Password kann nicht null oder leer sein.");
        }
        return true;
    }
}
