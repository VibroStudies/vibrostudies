import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMail } from '../Model/User/EMail';
import { User } from '../Model/User/User';
import { UserDao } from '../Model/User/UserDao.service';
import { UserPermission } from '../Model/User/UserPermission';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
/**
 * Die Registrierungskomponente ist für die Registrierung von Nutzern zuständig,
 * die noch nicht in der Datenbank stehen.
 */
export class RegisterComponent implements OnInit {
    /**
     * Das Feld, in das der Vorname eingetragen wird.
     */
    firstName = "";
    /**
     * Das Feld, in das der Nachname eingetragen wird.
     */
    lastName = "";
    /**
     * Das Feld, in das die EMail Adresse eingetragen wird.
     */
    email = "";
    /**
     * Das Feld, in das das Passwort eingetragen wird.
     */
    password = "";
    /**
     * Das Feld, in dem das Passwort wiederholt wird.
     */
    confirmPassword = "";

    /**
     * Konstruktor der RegisterComponent. Darin werden sämtliche Services initialisert,
     * die für das Registrieren gebraucht werden.
     * @param router router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     * @param authService authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param userService
     */
    constructor(private router: Router, private authService: AuthService,
        private userService: UserDao, private alertService: AlertService) { }

    /**
     * Navigiert zum Dashboard wenn ein User authentifiziert wurde.
     */
    async ngOnInit(): Promise<void> {
        await this.authService.isAuthenticated().then(result => {
            if (result) {
                this.router.navigate(["dashboard"], { replaceUrl: true });
            }
        });
    }

    /**
     * Registriert für den Nutzer einen User in der Datenbank, falls er alle Eingabefelde
     * korrekt eingetragen hat.
     */
    async register() {
        if (this.firstName != "" && this.lastName != "" && this.email != ""
            && this.password != "" && this.password == this.confirmPassword) {
            let user = new User(0, this.firstName, this.lastName, UserPermission.CREATOR, new EMail(this.email));
            await this.userService.save(user, "", this.password).then(result => {
                if (result) {
                    this.router.navigate(["login"], { replaceUrl: true });
                } else {
                    this.alertService.alert("Registration fehlgeschlagen. Vermutlich existiert bereits ein Account unter dieser E-Mail.");
                }
            });
        }
    }

}
