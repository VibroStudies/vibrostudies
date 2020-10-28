import { UserPermission } from "./UserPermission";
import { EMail } from "./EMail";

/**
 * Die Klasse User stellt einen Benutzer da.
 */
export class User {

    /**
     * Die eindeutige ID eines Benutzers.
     */
    private _id: number;
    get id(): number {
        return this._id;
    }
    set id(id: number ){
        this._id = id;
    }

    /**
     * Der Vorname des Benutzers
     */
    private _firstName: string;
    get firstName(): string {
        return this._firstName;
    } 
    set firstName(firstName: string) {
        if (this.ensureNameValidation(firstName)) {
            this._firstName = firstName;
        }
    }

    /**
     * Der Nachname des Benutzers.
     */
    private _lastName: string;
    get lastName(): string {
        return this._lastName;
    } 
    set lastName(lastName: string) {
        if (this.ensureNameValidation(lastName)) {
            this._lastName = lastName;
        }
    }

    /**
     * Die Rechte, die ein Benutzer innerhalb der Vibrostudies Anwendung hat.
     */
    private _permission: UserPermission;
    get permission(): UserPermission {
        return this._permission;
    }
    set permission(permission: UserPermission) {
        if (this.ensurePermissionValidation(permission)) {
            this._permission = permission;
        }
    }

    /**
     * Die EMail Adresse, die der Benutzer angegeben hat.
     */
    private _email: EMail;
    get email(): EMail {
        return this._email;
    }
    set email(email: EMail) {
        this._email = email;
    }

    /**
     * Ein neuer Benutzer wird erstellt und dabei wird sichergestellt, dass die Parameter gültig sind.
     * @param id 
     * @param firstName 
     * @param lastName 
     * @param permission sagt aus, welche Aktionen ein Benuter durchführen kann
     * @param password 
     * @param email 
     */
    constructor(id: number, firstName: string, lastName: string, permission: UserPermission, email: EMail) {

        this.id = id;

        if (this.ensureNameValidation(firstName)) {
            this.firstName = firstName;
        }

        if (this.ensureNameValidation(lastName)) {
            this.lastName = lastName;
        }

        if (this.ensurePermissionValidation(permission)) {
            this.permission = permission;
        }

        this.email = email;
    }

    private ensureNameValidation(toValidate: string): boolean {
        if (!toValidate) {
            throw new Error("Name kann nicht null oder leer sein.");
        }
        return true;
    }

    private ensurePermissionValidation(permission: UserPermission): boolean {
        if (permission == undefined) {
            throw new Error("Userpermission kann nicht null oder leer sein.");
        }
        return true;
    }

    /**
     * Überprüft, ob der angegebene User toCompare mit dem aktuellen User übereinstimmt.
     * @param toCompare 
     */
    equals(toCompare: User): boolean {
        if (this.firstName == toCompare.firstName && this.id == toCompare.id && 
            this.lastName == toCompare.lastName && this.permission == toCompare.permission) {
            return true;
        }
        return false;
    }
}
