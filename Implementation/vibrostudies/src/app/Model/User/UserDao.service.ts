import { User } from "./User";
import { HttpClient } from "@angular/common/http";
import { EMail } from "./EMail";
import { Injectable } from "@angular/core";
import { AppSettings } from "@src/app/app-settings";
import { AuthService } from "@src/app/services/auth/auth.service";

@Injectable({
    providedIn: "root"
})
/**
 * Das UserDAO ist für den Zugriff auf die User Objekte in der Datenbank verantwortlich.
 */
export class UserDao {
    userURL: string = AppSettings.baseURL + "User/";

    constructor(private http: HttpClient, private authService: AuthService) { }

    /**
     * Die Methode gibt asynchron ein User Objekt zurück, welches eindeutig durch die id identifiziert wird.
     * @param id number ist die ID des Users, der aus der Datenbank geholt werden soll
     */
    async get(id: number): Promise<User> {
        let user: User;

        await this.http.post(this.userURL + id + "/", { token: this.authService.getAuthToken() }).toPromise().then(data => {
            user = new User((data as any).id, (data as any).firstName, (data as any).lastName,
                (data as any).userPermission, new EMail((data as any).email));
        });

        return user;
    }

    /**
     * Prüft, ob das gegebene Passwort zum Passwort des User in der Datenbank passt
     * @param userId number ID des User 
     * @param password string Passwort das zu prüfen ist
     */
    async checkPassword(userId: number, password: string): Promise<boolean> {
        let result = false;
        await this.http.post(AppSettings.baseURL + "CheckPassword/", {
            id: userId,
            password: password,
            token: this.authService.getAuthToken(),
        }).toPromise().then(response => {
            if (response) {
                result = true;
            }
        });
        return result;
    }

    /**
     * Die Methode speichert asynchron object in einer Datenbank, welches nachdem es gespeichert wurde wieder mit get aufgerufen werden kann.
     * @param object User ist der Nutzer, der gespeichert werden soll
     * @param oldPassword string altes Passwort des User
     * @param newPassword string neues Passwort des User
     */
    async save(object: User, oldPassword: string, newPassword: string): Promise<boolean> {
        let result = false;
        await this.http.post(AppSettings.baseURL + "SaveUser/", {
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            oldPassword: oldPassword,
            newPassword: newPassword,
            email: object.email.email,
        }).toPromise().then(data => {
            if (data) {
                result = true;
            }
        });
        return result;
    }

    /**
     * Löscht das User Objekt object aus der Datenbank.
     * @param object User ist der Nutzer, der gelöscht werden soll
     */
    async delete(object: User): Promise<boolean> {
        let success = false;
        await this.http.post(AppSettings.baseURL + "DeleteUser/" + object.id + "/", 
        { token: this.authService.getAuthToken() }).toPromise().then(data => {
            if (data) {
                success = true;
            }
        });
        return success;
    }
}
