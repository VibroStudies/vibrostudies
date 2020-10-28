import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '@src/app/app-settings';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { AlertService } from '../alert/alert.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
/**
 * Der AuthService verwaltet die Authentifizierung, Registrierung und
 * Abmeldung des Nutzers in der Anwendung.
 */
export class AuthService {
    /**
     * Konstruktor des AuthService. Darin werden sämtliche Services initialisert,
     * die für eine Authentifizierung des Nutzers gebraucht werden.
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     * @param http HttpClient der zurückgi
     * @param storageService StorageService, zum Ablegen des authentifizierten Nutzers in den lokalen Speicher
     * @param alertService
     */
    constructor(private http: HttpClient, private router: Router, private storageService: StorageService, private alertService: AlertService) { }

    /**
     * Löscht den registrierten Nutzer aus dem lokalen Speicher.
     */
    clear(): void {
        this.storageService.clear();
    }

    /**
     * Überprüft ob ein gegebener User in der Datenbank existiert
     * und auch autehntifiziert werden kann.
     * @returns Promise<boolean>, je nachdem ob der Nutzer existiert oder nicht
     */
    async isAuthenticated(): Promise<boolean> {
        let result = false;
        if (!this.isTokenExpired()) {
            if (this.getUser() && this.getAuthToken()) {
                await this.userIsValid(this.getUser().id, this.getAuthToken()).then(response => {
                    if (response) {
                        result = true;
                    } else {
                        this.alertService.alert("Login-Session abgelaufen. Bitte erneut anmelden!");
                    }
                });
            }
        }
        return result;
    }

    /**
     * Checkt ob ein Nutzer valide ist.
     * @param id number des User-Objekts vom Nutzer
     * @param token string Token des Nutzers
     */
    async userIsValid(id: number, token: string): Promise<boolean> {
        let isValid = false;
        await this.http.post(AppSettings.baseURL + "VerifyUser/", { id: id, token: token }).toPromise().then(result => {
            if (result) {
                isValid = true;
            }
        });
        return isValid;
    }

    /**
     * Checkt ob ein Token für die Sitzung mit dem Nutzer schon abgelaufen ist oder nicht.
     * @returns boolean ob Token abgelaufen ist oder nicht
     */
    isTokenExpired(): boolean {
        try {
            this.storageService.get("userToken");
        } catch (err) {
            return true;
        }
        return false;
    }

    /**
     * Loggt einen Nutzer in die Anwendung ein, indem das User-Objekt aus der Datenbank geholt wird
     * und anschließend in den lokalen Speicher reingeladen wird, falls das eingegebene Passwort
     * mit dem des Nutzers in der Datenbank übereinstimmt.
     * @param email string für die E-Mail Adresse des Nutzers
     * @param password string für das Passwort des Nutzers
     * @throws Error, wenn kein solcher Nutzer in der Datenbank enthalten ist
     */
    async login(email: string, password: string): Promise<boolean> {

        let user: User;
        await this.http.post(AppSettings.baseURL + "Login/", {
            email: email,
            password: password,
        }).toPromise().then(data => {
            if ((data as any).id) {
                user = new User((data as any).id, (data as any).firstName, (data as any).lastName,
                    (data as any).permission, new EMail((data as any).email));
                this.setUser(user);
                this.setAuthToken((data as any).token);
            } else {

                throw new Error("No such user found in database.");
            }
        });
        return user != undefined;
    }

    /**
     * Setzt ein Authentifizierungstoken im lokalen Speicher.
     * @param token string des Tokens
     */
    setAuthToken(token: string) {
        this.storageService.set("token", token);
    }

    /**
     * Holt den Authentifizierungstoke aus dem lokalen Speicher.
     */
    getAuthToken(): string {
        return this.storageService.get("token");
    }

    /**
     * Generiert einen Standardnutzer welcher durch den Nutzer, der im userToken spezifiziert wurde, überschrieben
     * wird. Dieser wird dann anschließend als registrierter Nutzer zurückgeschrieben.
     * @returns User-Objekt des aktuell registrierten Nutzers
     * @throws Error, wenn kein Nutzer im lokalen Speicher enthalten ist
     */
    getUser(): User {
        let user: User;
        if (this.storageService.get("userToken") != undefined) {
            let userToken = JSON.parse(this.storageService.get("userToken"));
            user = new User(userToken._id, userToken._firstName, userToken._lastName, userToken._permission,
                new EMail(userToken._email._email));
        }
        return user;
    }

    /**
     * Setzt einen Nutzer in den lokalen Speicher, indem sein User-Objekt
     * zu eiem JSON konvertiert und anschließend abgespeichert wird.
     * Hierbei wird im lokalen Speicher genau ein Nutzer abgelegt.
     * @param user User-Objekt des Nutzers, der in den lokalen Speicher gesetzt werden soll
     * @throws Error, wenn der Nutzer auf null oder undefined gesetzt wird
     */
    setUser(user: User) {
        if (user == null) {
            throw new Error("Setting the User to null or undefined is not allowed.");
        }
        this.storageService.set("userToken", JSON.stringify(user));
    }

    /**
     * Entfernt den registrieten Nutzer aus dem lokalen Speicher und navigiert zur Login-Ansicht.
     */
    logout(): void {
        this.clear();
        this.router.navigate(["login"], { replaceUrl: true });
    }
}
