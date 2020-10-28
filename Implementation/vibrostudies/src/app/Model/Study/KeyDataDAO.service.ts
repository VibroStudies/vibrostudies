
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeyData } from "./KeyData";
import { ShortDescription } from "./ShortDescription";
import { User } from "../User/User";
import { EMail } from "../User/EMail";
import { AppSettings } from "@src/app/app-settings";
import { UserPermission } from "../User/UserPermission";
import { AuthService } from "@src/app/services/auth/auth.service";

@Injectable({
    providedIn: "root"
})
/**
 * Das KeyDataDAO ist für den Zugriff auf die KeyData Objekte in der Datenbank verantwortlich.
 */
export class KeyDataDao {
    studyURL: string = AppSettings.baseURL + "Study/";
    qualiQuestionURL: string = AppSettings.baseURL + "QualificationQuestion/";
    userURL: string = AppSettings.baseURL + "User/";

    constructor(private http: HttpClient, private authService: AuthService) { }

    /**
     * Die Methode gibt asynchron ein KeyData Objekt zurück, welches eindeutig durch die id identifiziert wird.
     * @param userId number ist die ID der KeyData, die aus der Datenbank geholt werden soll
     */
    async getFromUserId(userId: number): Promise<KeyData[]> {
        let keyData: KeyData[] = [];

        await this.http.post(AppSettings.baseURL + "MyStudies/" + userId 
        + "/", { token: this.authService.getAuthToken() })
        .toPromise()
        .then(studiesResult => {
            for (let element of studiesResult as any) {
                keyData.push(new KeyData(element.id, this.authService.getUser(), element.studyStatus, 
                new ShortDescription(element.shortDescription), element.fullDescription, element.isAmplitudeNecessary, element.name));
            }
        });

        return keyData;
    }

    /**
     * Liefert alle Studien an denen der Benutzer mit der id userId bereits teilgenommen hat.
     * @param userId number des Users
     */
    async getParticipated(userId: number): Promise<KeyData[]> {
        let result: KeyData[] = [];

        await this.http.post(AppSettings.baseURL + "ParticipatedStudies/" + 
        userId + "/", { token: this.authService.getAuthToken() })
        .toPromise()
        .then(keyDatas => {
            for (let element of keyDatas as any) {
                result.push(new KeyData(element.id, 
                    new User(0, element.author.firstName, element.author.lastName, UserPermission.CREATOR, 
                        new EMail(element.author.email)), element.studyStatus, new ShortDescription(element.shortDescription), 
                        element.fullDescription, element.isAmplitudeNecessary, element.name));
            }
        });

        return result;
    }

    /**
     * Die Methode gibt asynchron eine Liste aller KeyData Objekte zurück, die für einen Benutzer verfügbar sind.
     * @param userId number des Users der die Studien anfordert
     * @param hasAmplitude boolean Info ob der Nutzer eine Amplitudenunterstützung braucht.
     */
    async getAvailableStudies(userId: number, hasAmplitude: boolean): Promise<KeyData[]> {
        let result = [];
        await this.http.post(AppSettings.baseURL + "AvailableStudies/?userId=" + userId + 
        "&hasAmplitude=" + hasAmplitude, { token: this.authService.getAuthToken() }).toPromise().then(availableResult => {
            for (let study of availableResult as any) {
                result.push(new KeyData(study.id, 
                    new User(0, study.author.firstName, study.author.lastName, UserPermission.CREATOR, 
                        new EMail(study.author.email)), study.studyStatus, study.shortDescription, study.fullDescription, study.amplitudeNecessary, study.name));
            }
        });
        return result;
    }

    /**
     * Die Methode aktualisiert den Status einer Studie
     * @param id number ist die Id der Studie deren Status aktualisiert wird
     * @param state number ist der Status auf den aktualisiert wird
     */
    async updateStudyState(id: number, state: number): Promise<boolean> {
        let result = false;
        await this.http.post(AppSettings.baseURL + "UpdateStudyState/" + id + 
        "/", { token: this.authService.getAuthToken(), state: state }).toPromise().then(response => {
            if (response) {
                result = true;
            }
        });
        return result;
    }

    /**
     * Löscht das KeyData Objekt object aus der Datenbank.
     * @param id number sind die Schlüsselinformationen, die gelöscht werden sollen
     */
    async delete(id: number): Promise<boolean> {
        let success = false;
        await this.http.post(AppSettings.baseURL + "DeleteStudy/" + id 
        + "/", { token: this.authService.getAuthToken(), id: id }).toPromise().then(result => {
            if (result) {
                success = true;
            }
        });
        return success;
    }
}
