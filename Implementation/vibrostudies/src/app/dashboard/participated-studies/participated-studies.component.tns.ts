import { Component, OnInit } from '@angular/core';
import { ObservableArray } from '@nativescript/core';
import { KeyData } from '@src/app/Model/Study/KeyData';
import { KeyDataDao } from '@src/app/Model/Study/KeyDataDAO.service';
import { AuthService } from '@src/app/services/auth/auth.service';
import { SideDrawerService } from '../services/side-drawer/side-drawer.service';


@Component({
    selector: 'app-participated-studies',
    templateUrl: './participated-studies.component.tns.html',
    styleUrls: ['./participated-studies.component.css']
})
/**
 * Die ParticipatedStudiesComponent zeigt dem Nuter alle Studien an, die er absolviert hat.
 * Dazu bietet sie eine "Teilgenommene Studien"-Ansicht an.
 */
export class ParticipatedStudiesComponent implements OnInit {

    /**
     * ObservableArray<KeyData>, welches die teilgenommenen Studien enthält.
     */
    studies: ObservableArray<KeyData> = new ObservableArray<KeyData>();

    /**
     * Initialisiert die ParticipatedStudiesComponent.
     */
    ngOnInit() {
        this.sideDrawer.title = "Teilgenommene Studien";
        this.getStudies();
    }

    /**
     * Konstruktor der ParticipatedStudiesComponent. Darin werden sämtliche Services initialisert,
     * die für die "Teilgenommene Studien"-Ansicht gebraucht werden.
     * @param keyDataService KeyDataDao Singleton, um auf die Schlüsselinformationen aller verfügbaren Studien zuzugreifen
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param sideDrawer SideDrawerService Singleotn, ist für das Aufrufen der Seitenliste zuständig
     */
    constructor(private keyDataService: KeyDataDao, private authService: AuthService, private sideDrawer: SideDrawerService) { }

    /**
     * Holt die teilgenommenen Studien aus der Datenbank.
     */
    async getStudies() {
        await this.keyDataService.getParticipated(this.authService.getUser().id).then(keyDataResults => {
            if (keyDataResults.length > 0) {
                this.studies = new ObservableArray(keyDataResults);
            }
        });
    }

}

