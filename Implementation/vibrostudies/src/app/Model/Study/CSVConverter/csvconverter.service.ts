import { Injectable } from '@angular/core';
import { UserResultTuple } from '../Result/UserResultTuple';
import { StudyPrototype } from '../StudyPrototype';
import { ExportToCsv } from 'export-to-csv';
import { AbstractQuestion } from '../StudyObjects/Questions/AbstractQuestion';
import { ICSVObject } from './csvObject';
import { MetaData } from '../MetaData';
import { User } from '../../User/User';

@Injectable({
    providedIn: 'root'
})
export class CSVConverter {
    private metaDataHeaders = ["Zeit in Millisekunden", "Marke", "Gerät", "Display", "Hardware", "Hersteller", "Model", "Produkt", "AndroidSDK", "Amplitude"];

    constructor() { }


    generateResultCSV(study: StudyPrototype, results: UserResultTuple[], download: boolean): ExportToCsv {
        let data = []; 
        const headers = this.generateHeaders(results[0].results);
        const numberOfQuestions = headers.length - this.metaDataHeaders.length;

        data = this.convertAllResultsToData(results, numberOfQuestions, data);

        const csvExporter = new ExportToCsv(this.setOptions(headers, study, "Ergebnisse"));
        return csvExporter.generateCsv(data, download);
    }

    giveResultCSV(study: StudyPrototype, results: UserResultTuple[]): ExportToCsv {
        return this.generateResultCSV(study, results, false);
    }

    generateParticipantsCSV(study: StudyPrototype, results: UserResultTuple[], download: boolean) {
        const headers = ["Vorname", "Nachname", "E-Mail"];
        let data = [];
        let participants: User[] = [];

        results.forEach(triple => { participants.push(triple.user); });

        const shuffeldUser = participants.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);

        data = this.convertParticipantsToData(shuffeldUser, data);

        const csvExporter = new ExportToCsv(this.setOptions(headers, study, "Teilnehmerliste"));
        return csvExporter.generateCsv(data, download);
    }

    giveParticipantsCSV(study: StudyPrototype, results: UserResultTuple[]) {
        return this.generateParticipantsCSV(study, results, false);
    }


    private convertParticipantsToData(participants: User[], data: any): any {

        participants.forEach(participant => {
            data.push({ firstName: participant.firstName, lastName: participant.lastName, email: participant.email.email });
        });

        return data;
    }

    private setOptions(headers: string[], study: StudyPrototype, fileType: string): any { //TODO: nciht so schön
        const studyKeyData = study.keyData;
        const options = {
            fieldSeparator: ';',
            filename: studyKeyData.name + " - " + fileType,
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: fileType + ' ' + studyKeyData.name,
            useBom: true,
            noDownload: true,
            headers: headers,
            nullToEmptyString: true,
        };
        return options;
    }

    private generateHeaders(questions: AbstractQuestion[]): string[] {
        let headers: string[] = [];
        const sortedQuestions = this.sortQuestionsByID(questions);

        sortedQuestions.forEach(question => {
            headers.push(question.name + "(" + question.id + ")");
        });

        headers = headers.concat(this.metaDataHeaders);

        return headers;
    }

    private sortQuestionsByID(questions: AbstractQuestion[]): AbstractQuestion[] {
        return questions.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }

    private convertAllResultsToData(results: UserResultTuple[], numberOfQuestions: number, data : any) {
        results.forEach(tuple => {
            const answeredQuestions = tuple.results;
            if (answeredQuestions.length !== numberOfQuestions) {
                throw new Error("Es wurden nicht alle Fragen beantwortet.");
            }
            data = this.convertResultToData(answeredQuestions, tuple.metaData, data);
        });
        return data;
    }

    private convertResultToData(result: AbstractQuestion[], metaData: MetaData, data : any) {
        const sortedAnsweredQuestions = this.sortQuestionsByID(result);
        let csvObj: ICSVObject = {};

        sortedAnsweredQuestions.forEach(question => {
            const nameOfProp = "question" + question.id;
            csvObj[nameOfProp] = question.answer;
        });

        csvObj = this.insertMetaData(csvObj, metaData);

        data.push(csvObj);
        return data;
    }

    private insertMetaData(csvObject: ICSVObject, metaData: MetaData): ICSVObject {
        csvObject["time"] = metaData.timeInMs;
        csvObject["brand"] = metaData.brand;
        csvObject["device"] = metaData.device;
        csvObject["display"] = metaData.display;
        csvObject["hardware"] = metaData.hardware;
        csvObject["manufacturer"] = metaData.manufacturer;
        csvObject["model"] = metaData.model;
        csvObject["product"] = metaData.product;
        csvObject["androidsdk"] = metaData.androidsdk;
        csvObject["amplitude"] = this.booleanToReadableString(metaData.hasAmplitude);

        return csvObject;
    }

    private booleanToReadableString(bool: boolean): string { //TODO: dafür gibt es bestimmt schon was
        if (bool) {
            return "Ja";
        }
        return "Nein";
    }
}
