import { TestBed } from "@angular/core/testing";
import { ExportToCsv } from "export-to-csv";
import { EMail } from "../../../User/EMail";
import { User } from "../../../User/User";
import { UserPermission } from "../../../User/UserPermission";
import { KeyData } from "../../KeyData";
import { MetaData } from "../../MetaData";
import { UserResultTuple } from "../../Result/UserResultTuple";
import { ShortDescription } from "../../ShortDescription";
import { TextQuestion } from "../../StudyObjects/Questions/TextQuestion";
import { StudyPrototype } from "../../StudyPrototype";
import { StudyStatus } from "../../StudyStatus";
import { CSVConverter } from "../csvconverter.service";

const headersParticipant = ["Vorname", "Nachname", "E-Mail"];
const headersResult = ["Name: Frage 1(1)", "Zeit in Millisekunden", "Marke", "Gerät", "Display", "Hardware", "Hersteller",
  "Model", "Produkt", "AndroidSDK", "Amplitude"];

let user = new User(3, "anne", "hermann", UserPermission.ADMINISTRATOR, new EMail("a"));
let userTwo = new User(3, "lukas", "peter", UserPermission.ADMINISTRATOR, new EMail("a"));

let metaData = new MetaData("1", "2", "3", "4", "5", "6", "7", 8, 9, true);
let metaDataNoAmplitude = new MetaData("1", "2", "3", "4", "5", "6", "7", 8, 9, false);

let keyData = new KeyData(1, user, StudyStatus.FINISHED, new ShortDescription("Kurz"), "Voll", false, "Test");

let study = new StudyPrototype(keyData);
study._studyObjects = [new TextQuestion(1, "Name: Frage 1", "QuestionText: Frage1", "DisplayName: Frage1")];

let answer1 = new TextQuestion(1, "Name: Frage 1", "QuestionText: Frage1", "DisplayName: Frage1");
answer1.answer = "Antwort 1"
let result = new UserResultTuple(user, [answer1], metaData);
let result2 = new UserResultTuple(userTwo, [answer1], metaData);
let resultNoAmplitude = new UserResultTuple(user, [answer1], metaDataNoAmplitude);

describe('CSVConverter.Service.TsService', () => {
  let service: CSVConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('giveResultCSV_giveUndefined', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersResult, study, "Ergebnisse"));
    expect(converter.giveResultCSV(study, [result])).toEqual(undefined);
  })
  it('giveParticipantCSV_giveUndefined', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersResult, study, "Teilnehmerliste"));
    expect(converter.giveParticipantsCSV(study, [result])).toEqual(undefined);
  })

  it('generateResultCSV_giveExpectedStuff', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersResult, study, "Ergebnisse"));
    let data = [{
      question1: 'Antwort 1', time: 9, brand: '1', device: '2', display: '3', hardware: '4',
      manufacturer: '5', model: '6', product: '7', androidsdk: 8, amplitude: 'Ja'
    }];
    expect(converter.generateResultCSV(study, [result], true)).toEqual(csv.generateCsv(data, true));
  });
  it('generateResultCSV_giveExpectedStuffNoAmplitude', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersResult, study, "Ergebnisse"));
    let data = [{
      question1: 'Antwort 1', time: 9, brand: '1', device: '2', display: '3',
      hardware: '4', manufacturer: '5', model: '6', product: '7', androidsdk: 8, amplitude: 'Nein'
    }];
    expect(converter.generateResultCSV(study, [resultNoAmplitude], true)).toEqual(csv.generateCsv(data, true));
  });
  it('generateParticipantCSV_giveExpectedStuff', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersParticipant, study, "Teilnehmerliste"));
    let data = [{ Vorname: 'anne', nachname: "hermann", email: 'a' }];
    expect(converter.generateParticipantsCSV(study, [result], true)).toEqual(csv.generateCsv(data, true));
  });
  it('generateParticipantCSV_giveExpectedManyParticipants', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersParticipant, study, "Teilnehmerliste"));

    expect(compareResults(converter.generateParticipantsCSV(study, [result, result2], true))).toEqual(true);
  });

  it('generateResultCSV_throwError', () => {
    const converter = new CSVConverter();
    const csv = new ExportToCsv(setOptions(headersParticipant, study, "Ergebnisse"));
    let data = [{ Vorname: 'anne', nachname: "hermann", email: 'a' }];
    expect(function () {
      converter.generateResultCSV(study, [result, new UserResultTuple(user, [], metaData)], true)
    }).toThrowError("Es wurden nicht alle Fragen beantwortet.");
  });
});

function compareResults(param1: any): boolean {
  const csv = new ExportToCsv(setOptions(headersParticipant, study, "Teilnehmerliste"));
  let data = [{ Vorname: 'anne', nachname: "hermann", email: 'a' },
  { Vorname: 'lukas', nachname: "peter", email: 'a' }];
  let data1 = [{ Vorname: 'lukas', nachname: "peter", email: 'a' },
  { Vorname: 'anne', nachname: "hermann", email: 'a' }];
  if (param1 == csv.generateCsv(data, true) || param1 == csv.generateCsv(data1, true)) {
    return true;
  }

  return false;
}

function setOptions(headers: string[], study: StudyPrototype, fileType: string): any { //TODO: nciht so schön
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