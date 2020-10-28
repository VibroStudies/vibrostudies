import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StudyWrapperService } from '../services/study-wrapper/study-wrapper.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
/**
 * Die DashboardComponent enthält die Seitenansicht in der Anwendung.
 * Darin sind alle Dienste festgehalten, die invariant zu jeder anderen Sicht (außer der Studienerstellung und -teilnahme) sind.
 */
export class DashboardComponent implements OnInit {
    /**
     * Konstruktor der AvailableStudiesComponent. Darin werden sämtliche Services initialisert,
     * die für die "Verfügbare Studien"-Ansicht gebraucht werden.
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param route ActivatedRoute ist die aktivierte Route
     */
    constructor(private studywrapper: StudyWrapperService, public authService: AuthService, public route: ActivatedRoute) { }

    /**
     * Initialisiert die DashboardComponent.
     */
    async ngOnInit() {
        this.studywrapper.study = undefined;
    }

    /**
     * Loggt den Nutzer aus der Anwendung aus und navigiert ihn zurück zur Login-Ansicht.
     */
    logout() {
        this.authService.logout();
    }
}
