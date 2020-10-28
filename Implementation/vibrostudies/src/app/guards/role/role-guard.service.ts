import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
/**
 * Der RoleGuardService ist ein Guard, also für die Navigation der Route innerhalb der Anwendung zuständig.
 * Dieser Guard ist für die Identifikation der Rolle des Nutzers zuständig (CREATOR, PARTICIPANT, ADMIN).
 * Dazu verwendet es das CanActivate Interface, welches von jedem anderen Guard verwendet wird.
 * Nur wenn alle Guards wahr sind, kann auf die gewünschte Ansicht navigiert werden, sonst nicht.
 */
export class RoleGuardService implements CanActivate {

    /**
     * Konstruktor des RoleGuardService. Darin werden sämtliche Services initialisert,
     * die für den RoleGuardService gebraucht werden.
     * @param authService AuthService Singleton, ist für das Aufrufen des registrierten Nutzers zuständig
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     */
    constructor(private router: Router, private authService: AuthService) { }

    /**
     * Die vom Interface zu implementierende Methode, welche den Guard aktiviert oder deaktiviert.
     * @param route ActivatedRouteSnapshot ist der aktuellen Zustand der aktivierten Route 
     * @param state RouterSnapshot ist der aktuelle Zustand des Routers
     * @returns Promise<boolean>, je nachdem ob der Nutzer die benötigte Rolle für das Aufrufen der Ansicht besitzt oder nicht.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.authService.getUser().permission >= route.data.expectedRole) {
            this.router.navigate(["login"], { replaceUrl: true });
            return false;
        }
        return true;
    }
}
