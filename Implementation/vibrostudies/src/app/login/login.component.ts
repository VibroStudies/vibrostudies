import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/**
 * Die LoginComponent ist zum Anmelden des Users zuständig. Falls der Nutzer noch nicht
 * registriert ist, wird er durch die LoginComponent in die Registrier-Ansicht navigiert.
 * Falls er bereits authentifiziert wurde, gelangt er durch Anmeldung automatisch in die Anwendung.
 */
export class LoginComponent implements OnInit {
    /**
     * Das Attribut enthält die E-Mail Adresse des Users der sich einloggen will.
     */
    email = "";
    /**
     * Das Attribut enthält das Passwort zur zugehörigen E-Mail Adresse.
     */
    password = "";

    /**
     * Konstruktor der LoginComponent. Darin werden sämtliche Services initialisert,
     * die für das Anmelden gebraucht werden.
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     */
    constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

    /**
     * Navigiert zum Dashboard wenn ein User authentifiziert wurde.
     */
    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.toDashboard();
        }
        this.email = "";
        this.password = "";
    }

    /**
     * Loggt einen User mit den Klassenattributen ein.
     */
    async login() {
        if (this.email != "" && this.password != "" && this.email != undefined && this.password != undefined) {
            await this.authService.login(this.email, this.password).then(result => {
                if (result) {
                    this.toDashboard();
                } else {
                    this.alertService.alert("Anmeldung fehlgeschlagen. Überprüfe die eingegebene E-Mail und das Passwort.");
                }
            });
        }
    }

    /**
     * Navigiert den User zur Registrierungsansicht.
     */
    toRegister() {
        this.router.navigate(["register"], { replaceUrl: true });
    }

    private toDashboard() {
        this.router.navigate(["dashboard"], { replaceUrl: true });
    }

}
