import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@src/app/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
/**
 * Der AuthGuardService ist ein Guard, also für die Navigation der Route innerhalb der Anwendung zuständig.
 * Dieser Guard ist für die Authentifizierung des Nutzers zuständig.
 * Dazu verwendet es das CanActivate Interface, welches von jedem anderen Guard verwendet wird.
 * Nur wenn alle Guards wahr sind, kann auf die gewünschte Ansicht navigiert werden, sonst nicht.
 */
export class AuthGuardService implements CanActivate {

    /**
     * Konstruktor des AuthGuardService. Darin werden sämtliche Services initialisert,
     * die für den AuthGuardService gebraucht werden.
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param router Router Singleton, zum Routen des Pfads nach Eintritt eines Ereignisses
     */
    constructor(private authService: AuthService, private router: Router) { }
    
    /**
     * Die vom Interface zu implementierende Methode, welche den Guard aktiviert oder deaktiviert.
     * @param route ActivatedRouteSnapshot ist der aktuellen Zustand der aktivierten Route 
     * @param state RouterSnapshot ist der aktuelle Zustand des Routers
     * @returns Promise<boolean>, je nachdem ob der Nutzer authentifizierbar ist oder nicht
     */
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let isAuthenticated = false;
        await this.authService.isAuthenticated().then(result => isAuthenticated = result);
        if (!isAuthenticated) {
            this.router.navigate(["login"], { replaceUrl: true });
            this.authService.clear();
            return isAuthenticated;
        } else {
            return isAuthenticated;
        }
    }
}
