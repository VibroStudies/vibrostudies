import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppSettings } from "@src/app/app-settings";
import { AuthService } from "@src/app/services/auth/auth.service";
import { EMail } from "../../User/EMail";
import { User } from "../../User/User";
import { UserPermission } from "../../User/UserPermission";
import { StudyPrototype } from "../StudyPrototype";
import { StudyPrototypeDAO } from "../StudyPrototypeDAO.service";
import { UserResultTuple } from "./UserResultTuple";
import * as _ from "lodash";

@Injectable({
    providedIn: "root"
})
export class UserResultTupleDAO {

    constructor(private http: HttpClient, private studyService: StudyPrototypeDAO, private authService: AuthService) { }

    /**
     * Die Methode gibt asynchron ein UserResultTuple zurück, welches eindeutig durch die id identifiziert wird.
     * @param studyId number ist die ID des UserResultTuple, der aus der Datenbank geholt werden soll
     */
    async get(studyId: number): Promise<UserResultTuple[]> {
        let userResult: UserResultTuple[] = [];
        let study: StudyPrototype;
        await this.studyService.get(studyId).then(studyResult => {
            study = studyResult;
        });

        await this.http.post(AppSettings.baseURL + "Result/" + studyId + "/", 
        { token: this.authService.getAuthToken() })
        .toPromise().then(result => {
            for (let element of result as any) {
                let answers = [];
                let index = 0;
                for (let questionAnswer of element.answers) {
                    for (let studyObject of study.studyObjects) {
                        if (studyObject.id == questionAnswer.objectId) {
                            let copied = _.cloneDeep(studyObject);
                            copied.id = index++;
                            copied.answer = questionAnswer.answer;
                            answers.push(copied);
                        }
                    }
                }
                userResult.push(new UserResultTuple(new User(0, element.participant.firstName, element.participant.lastName, UserPermission.PARTICIPANT, 
                    new EMail(element.participant.email)), answers, element.metaData));
            }
        });

        return userResult;
    }

    /**
     * Die Methode speichert asynchron ein UserResultTuple in einer Datenbank, welches nachdem 
     * es gespeichert wurde wieder mit get aufgerufen werden kann.
     * @param studyId number Id der Studie
     * @param idUser number Id des Users der an der Studie teilgenomment hat
     * @param object UserResultTuple ist der UserResultTuple, der gespeichert werden soll
     * @param participantId number Id die der User innerhalb der Studie zugewiesen bekommen hat
     */
    async save(studyId: number, idUser: number, object: UserResultTuple, participantId: number): Promise<boolean> {
        let success = false;
        await this.http.post(AppSettings.baseURL + "SaveResult/", {
            participantId: participantId,
            studyId: studyId,
            userId: idUser,
            metaData: object.metaData,
            answeredQuestions: object.answeredQuestions,
            token: this.authService.getAuthToken(),
        }).toPromise().then(result => {
            if (result) {
                success = true;
            }
        });
        return success;
    }

    /**
     * Startet die Ausführung einer bestimmten Studie für einen Nutzer
     * @param studyId number id der Studie die gestartet wird
     * @param userId number id des Users der an der Studie teilnimmt
     */
    async startStudy(studyId: number, userId: Number): Promise<number> {
        let returnId: number = -1;
        await this.http.post(AppSettings.baseURL + "StartStudy/", {studyId: studyId, userId: userId, 
            token: this.authService.getAuthToken()})
            .toPromise().then(result => {
            if (result != -1) {
                returnId = result as any;
            }
        });
        return returnId;
    }
}
