import { Component, OnInit } from '@angular/core';
import { User } from '@src/app/Model/User/User';
import { UserDao } from '@src/app/Model/User/UserDao.service';
import { AuthService } from '../../services/auth/auth.service';
import { EMail } from '@src/app/Model/User/EMail';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { Dialogs, TextField } from '@nativescript/core';
import { SideDrawerService } from '../services/side-drawer/side-drawer.service';
import { TextFieldProperties } from './TextFieldProperties';
import { TextFieldPropertiesWithHistory } from './TextFieldPropertiesWithHistory';

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
    user: User = new User(0, "Lade Daten...", "Lade Daten...", UserPermission.PARTICIPANT, new EMail("Lade Daten..."));

    txtFieldFirstName = new TextFieldPropertiesWithHistory("", "", false, "white");
    txtFieldLastName = new TextFieldPropertiesWithHistory("", "", false, "white");
    txtFieldEMail = new TextFieldPropertiesWithHistory("", "", false, "white");
    txtFieldPassword = new TextFieldProperties("", false, "white");
    isButtonEnabledAccountInfo = false;

    txtFieldOldPassword = new TextFieldProperties("", false, "white");
    txtFieldNewPassword = new TextFieldProperties("", false, "white");
    txtFieldNewPasswordRepeat = new TextFieldProperties("", false, "white");
    isButtonEnabledChangePassword = false;

    private eMailPattern = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    private passwordPattern = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){6,}$/);

    /**
     * Konstruktor der ProfileComponent. Darin werden sämtliche Services initialisert,
     * die für die "Meine Studien"-Ansicht gebraucht werden.
     * @param authService AuthService Singleton, ist für die Authentifizierung des Nutzers zuständig
     * @param userService UserDao Singleton, ist die Schnittstelle um die User-Objekte aus der Datenbank anzusprechen
     * @param sideDrawer SideDrawerService Singleotn, ist für das Aufrufen der Seitenliste zuständig
     */
    constructor(private authService: AuthService, private userService: UserDao, public sideDrawer: SideDrawerService) { }

    /**
     * Initialisiert die ProfileComponent.
     */
    ngOnInit() {
        this.sideDrawer.title = "Profil"
        this.user = this.authService.getUser();
        this.setCurrentAccountInfoAsStandard();
    }

    /**
     * Speichert den neuen Nutzer innerhalb der Datenbank und dem lokalen Speicher ab.
     */
    async saveUser() {
        this.revertErrorState(this.txtFieldEMail);
        this.revertErrorState(this.txtFieldPassword);

        if (this.eMailPattern.test(this.txtFieldEMail.value)) {
            await this.userService.save(this.user, this.txtFieldPassword.value, this.txtFieldPassword.value).then(result => {
                if (result) {
                    this.authService.setUser(this.user);
                    this.txtFieldPassword.value = "";
                    this.isButtonEnabledAccountInfo = false;
                    this.setCurrentAccountInfoAsStandard();
                    this.revertErrorState(this.txtFieldEMail);
                    this.revertErrorState(this.txtFieldPassword);
                    this.dialogBoxAlert("Deine Daten wurden gespeichert!");
                } else {
                    this.txtFieldPassword.value = "";
                    this.setErrorState(this.txtFieldPassword);
                }
            });
        } else {
            this.setErrorState(this.txtFieldEMail);
        }
    }

    /**
     * Entfernt den Nutzer aus der Datenbank und loggt ihn aus der Anwendung aus.
     */
    async deleteUser() {
        this.dialogBoxConfirm("Hiermit werden alle deine Daten, inklusive deiner erstellten Studien, unwiderruflich gelöscht!").then(async result => {
            if (result) {
                await this.userService.delete(this.user);
                this.authService.logout();
            }
        });
    }

    async savePassword() {

        this.checkIfCorrectPassword();
        this.checkIfNewPasswordValid();
        this.checkIfSamePassword();

        if (!this.txtFieldOldPassword.error && !this.txtFieldNewPassword.error && !this.txtFieldNewPasswordRepeat.error) {
            this.dialogBoxConfirm("Tippe auf 'Bestätigen', um dein Passwort jetzt zu ändern.").then(async result => {
                if (result) {
                    await this.userService.save(this.user, this.txtFieldOldPassword.value, this.txtFieldNewPassword.value);
                    await this.authService.login(this.user.email.email, this.txtFieldNewPassword.value);
                    this.txtFieldOldPassword.value = this.txtFieldNewPassword.value = this.txtFieldNewPasswordRepeat.value = "";
                    this.isButtonEnabledChangePassword = false;
                    this.dialogBoxAlert("Dein Passwort wurde geändert.");
                }
            });
        }
    }
    

    /**
     * EventListener für die Accountinformationen.
     * @param args any Eingabeargumente des Nutzers
     * @param textFieldType number für den Textfeldtypen
     */
    onChangeAccountInfo(args, textFieldType: number): void {
        let textField = <TextField>args.object;
        switch (textFieldType) {
            case 1: {
                this.txtFieldFirstName.value = textField.text;
                break;
            }
            case 2: {
                this.txtFieldLastName.value = textField.text;
                break;
            }
            case 3: {
                this.txtFieldEMail.value = textField.text;
                break;
            }
            case 4: {
                this.txtFieldPassword.value = textField.text;
                break;
            }
            default: {
                break;
            }
        }
        this.checkForChangesAccountInfo();
    }

    /**
     * Überprüft ob in der Profil-Ansicht Properties verändert wurden und setzt je nachdem
     * Wahrheitswerte.
     */
    checkForChangesAccountInfo(): void {
        if (this.txtFieldFirstName.value == "" || this.txtFieldLastName.value == "" || this.txtFieldEMail.value == "" || this.txtFieldPassword.value == "") {
            this.isButtonEnabledAccountInfo = false;
        } else if (this.txtFieldFirstName.initialValue == this.txtFieldFirstName.value
            && this.txtFieldLastName.initialValue == this.txtFieldLastName.value
            && this.txtFieldEMail.initialValue == this.txtFieldEMail.value) {
            this.isButtonEnabledAccountInfo = false;
        } else {
            this.isButtonEnabledAccountInfo = true;
        }
    }

    /**
     * Eventlistener für das Passworteingabefeld
     * @param args any Eingabeargumente des Nutzers
     * @param textFieldType number für den Textfeldtypen
     */
    onChangePassword(args, textFieldType: number): void {
        let textField = <TextField>args.object;
        switch (textFieldType) {
            case 1: {
                this.txtFieldOldPassword.value = textField.text;
                break;
            }
            case 2: {
                this.txtFieldNewPassword.value = textField.text;
                break;
            }
            case 3: {
                this.txtFieldNewPasswordRepeat.value = textField.text;
                break;
            }
            default: {
                break;
            }
        }
        this.checkForChangesPassword();
    }

    /**
     * Prüft ob ein Passwort in den Passwortfeldern verändert wurde.
     */
    checkForChangesPassword(): void {
        if (this.txtFieldOldPassword.value == "" || this.txtFieldNewPassword.value == "" || this.txtFieldNewPasswordRepeat.value == "") {
            this.isButtonEnabledChangePassword = false;
        } else {
            this.isButtonEnabledChangePassword = true;
        }
    }

    async checkIfCorrectPassword(): Promise<void> {
        await this.userService.checkPassword(this.user.id, this.txtFieldOldPassword.value).then(correct => {
            if (!correct) {
                this.setErrorState(this.txtFieldOldPassword);
            } else {
                this.revertErrorState(this.txtFieldOldPassword);
            }
        });
    }

    /**
     * Checkt ob das neue Passwort valide ist.
     */
    checkIfNewPasswordValid(): void {
        if (!this.passwordPattern.test(this.txtFieldNewPassword.value)) {
            this.setErrorState(this.txtFieldNewPassword);
        } else {
            this.revertErrorState(this.txtFieldNewPassword);
        }
    }

    /**
     * Handelt den Fehlerstatus bei der Passwortüberprüfung.
     */
    checkIfSamePassword(): void {
        if (this.txtFieldNewPassword.value != this.txtFieldNewPasswordRepeat.value) {
            this.setErrorState(this.txtFieldNewPasswordRepeat);
        } else {
            this.revertErrorState(this.txtFieldNewPasswordRepeat);
        }
    }

    /**
     * Übernimmt die in den Textfeldern eingegebenen Account Daten als Standard für den Nutzer.
     */
    setCurrentAccountInfoAsStandard() {
        this.txtFieldFirstName.initialValue = this.user.firstName;
        this.txtFieldLastName.initialValue = this.user.lastName;
        this.txtFieldEMail.initialValue = this.user.email.email;
    }

    /**
     * Markiert das eingegebene txtField rot, um einen Fehler anzuzeigen.
     * @param txtField zu markierendes Feld
     */
    setErrorState(txtField: TextFieldProperties): void {
        txtField.error = true;
        txtField.colour = "#6D0000";
    }

    /**
     * Entfernt den Fehlerstatus vom eingegebenen txtField.
     * @param txtField Feld dessen Fehlermarkierung entfernt wird
     */
    revertErrorState(txtField: TextFieldProperties): void {
        txtField.error = false;
        txtField.colour = "white";
    }

    /**
     * Erzeugt eine DialogBox, die in der App mit dem Text aus msg aufploppt.
     * @param msg Text der in der DialogBox steht
     */
    dialogBoxAlert(msg: string): void {
        Dialogs.alert({
            title: "Erfolg!",
            message: msg,
            okButtonText: "Ok"
        });
    }

    /**
     * Erzeugt eine DialogBox, die bei der Durchführung der aktuellen Aktion auf die 
     * Konsequenzen hinweißt und eine extra Bestätigung erfordert.
     * @param msg Nachricht an den Nutzer
     */
    dialogBoxConfirm(msg: string): Promise<boolean> {
        return Dialogs.confirm({
            title: "Bist du dir sicher?",
            message: msg,
            okButtonText: "Bestätigen",
            cancelButtonText: "Abbrechen",
        })
    }
}
