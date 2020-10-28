import { Component, OnInit } from '@angular/core';
import { User } from '@src/app/Model/User/User';
import { UserDao } from '@src/app/Model/User/UserDao.service';
import { AlertService } from '@src/app/services/alert/alert.service';
import { ConfirmDialogService } from '@src/app/services/dialogs/confirmDialog.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
/**
 * Die ProfileComponent befähigt den Nutzer dazu alle Accountdaten zu verwalten,
 * die er momentan in der Datenbank abgespeichert hat. Dafür wird dem Nutzer
 * die Profil-Ansicht angeboten.
 */
export class ProfileComponent implements OnInit {

    /**
     * User-Objekt des aktuell eingeloggten Nutzers.
     */
    user: User;

    oldPassword = "";
    newPassword = "";
    newPasswordRepeat = "";

    constructor(private authService: AuthService, private userService: UserDao, private alertService: AlertService, private confirmDialogService: ConfirmDialogService) { }

    /**
     * Initialisiert die ProfileComponent.
     */
    async ngOnInit() {
        this.user = this.authService.getUser();
    }

    /**
     * Speichert den neuen Nutzer innerhalb der Datenbank und dem lokalen Speicher ab.
     */
    async saveUser() {
        await this.userService.checkPassword(this.user.id, this.oldPassword).then(async isValid => {
            if (isValid) {
                await this.userService.save(this.user, this.oldPassword, this.oldPassword).then(result => {
                    if (result) {
                        this.alertService.alert("Accountdaten erfolgreich gespeichert!");
                        this.authService.setUser(this.user);
                        this.oldPassword = "";
                    } else {
                        this.alertService.alert("Das vorherige Passwort ist nicht korrekt. Accountdaten wurden nicht geändert.");
                    }
                });
            }
        });
    }

    /**
     * Entfernt den Nutzer aus der Datenbank und loggt ihn aus der Anwendung aus.
     */
    async deleteUser() {
        this.confirmDialogService.openDialog("Hiermit werden alle deine Daten, inklusive deiner erstellten Studien, unwiderruflich gelöscht!").then(async isConfirmed => {
            if (isConfirmed) {
                await this.userService.delete(this.user).then(response => {
                    if (response) {
                        this.alertService.alert("Account erfolgreich gelöscht!");
                    }
                });
                this.authService.logout();
            }
        });
    }

    /**
     * Speichert das neue Passwort ab.
     */
    async savePassword() {
        if (this.newPassword == this.newPasswordRepeat) {
            await this.userService.save(this.user, this.oldPassword, this.newPassword).then(async result => {
                if (result) {
                    await this.authService.login(this.user.email.email, this.newPassword);
                    this.newPassword = "";
                    this.newPasswordRepeat = "";
                    this.oldPassword = "";
                    this.alertService.alert("Passwort erfolgreich geändert!");
                } else {
                    this.alertService.alert("Das vorherige Passwort ist nicht korrekt. Das Passwort wurde nicht geändert.");
                }
            });
        }
    }
}

