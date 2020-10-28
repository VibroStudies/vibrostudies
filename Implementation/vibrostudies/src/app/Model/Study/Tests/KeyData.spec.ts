import { User } from "../../User/User";
import { UserPermission } from "../../User/UserPermission";
import { EMail } from "../../User/EMail";
import { StudyStatus } from "../StudyStatus";
import { ShortDescription } from "../ShortDescription";
import { KeyData } from "../KeyData";
import { QualificationQuestion } from "../StudyObjects/Questions/QualificationQuestion";
import { mock } from "ts-mockito";

const amplitudeNecessary = true;
const studyStatus: StudyStatus = StudyStatus.CREATED;
const id = 1337;
const name = "Beste Studie";
const shortDescription = new ShortDescription("Das ist eine Beschreibung!");
const longDescription = "Das ist mega lang.";
const author = new User(69, "Anne-Kathrin", "Hermann",
  UserPermission.CREATOR, new EMail("anne.ist.doof@adrianIstGod.com"));

let mockedDescription = mock(ShortDescription);
let mockedUser = mock(User);
let mockedQuali = mock(QualificationQuestion);

describe("KeyData", function () {

  it("getAuthor_MockObject", function () {
    expect(createMockedKeyData().author).toEqual(mockedUser);
  });

  it("setAuthor_MockObject", function () {
    let mockedUser = mock(User);
    let keyData = createMockedKeyData();
    keyData.author = mockedUser;
    expect(keyData.author).toEqual(mockedUser);
  });

  it("getShortDescription_MockObject", function () {
    expect(createMockedKeyData().author).toEqual(mockedUser);
  });

  it("setShortDescription_MockObject", function () {
    let mockedDescription = mock(ShortDescription);
    let keyData = createMockedKeyData();
    keyData.shortDescription = mockedDescription;
    expect(keyData.shortDescription).toEqual(mockedDescription);
  });

  it("getQualificationQuestion_MockObject", function () {
    expect(createMockedKeyData().qualiQuestions).toEqual([mockedQuali]);
  });

  it("setQualificationQuestion_MockObject", function () {
    let mockedQuali = mock(QualificationQuestion);
    let keyData = createMockedKeyData();
    keyData.qualiQuestions = [mockedQuali];
    expect(keyData.qualiQuestions).toEqual([mockedQuali]);
  });

  it("isAmplitudeNecessary_givesExpectedAmplitudeNecessary.", function () {
    expect(createDefaultKeyData().amplitudeNecessary).toEqual(amplitudeNecessary);
  });
  it("getStudyStatus_givesExpectedStudyStatus", function () {
    expect(createDefaultKeyData().studyStatus).toEqual(studyStatus);
  });
  it("getID_givesExpectedID.", function () {
    expect(createDefaultKeyData().id).toEqual(id);
  });
  it("getName_givesExpectedName.", function () {
    expect(createDefaultKeyData().name).toEqual(name);
  });
  it("getAuthor_givesExpectedAuthor.", function () {
    expect(createDefaultKeyData().author).toEqual(author);
  });
  it("getQualificationQuestion_givesQualificationQuestion.", function () {
    const keyData = createDefaultKeyData();
    const qualiQuestion = [new QualificationQuestion(1, "Frage", "Bist du volljährig?", "Frage", true)];
    keyData.qualiQuestions = qualiQuestion;
    expect(keyData.qualiQuestions).toEqual(qualiQuestion);
  });
  it("getQualificationQuestion_givesQualificationQuestion.", function () {
    const keyData = createDefaultKeyData();
    const shortDescription = new ShortDescription("Das ist eine kurze Beschreibung");
    keyData.shortDescription = shortDescription;
    expect(keyData.shortDescription).toEqual(shortDescription);
  });
  it("getQualificationQuestion_givesQualificationQuestion.", function () {
    const keyData = createDefaultKeyData();
    const fullDescription = "Das ist eine komplette Beschreibung";
    keyData.fullDescription = fullDescription;
    expect(keyData.fullDescription).toEqual(fullDescription);
  });

  it("setAmplitudeNecessary_setsExpectedAmplitudeNecessary.", function () {
    const study: KeyData = createDefaultKeyData();
    study.amplitudeNecessary = false;
    expect(study.amplitudeNecessary).toEqual(false);
  });
  it("setStudyStatus_setsExpectedStudyStatus", function () {
    const study: KeyData = createDefaultKeyData();
    study.studyStatus = StudyStatus.PUBLISHED;
    expect(study.studyStatus).toEqual(StudyStatus.PUBLISHED);
  });
  it("setName_setsExpectedName.", function () {
    const study: KeyData = createDefaultKeyData();
    study.name = "AnneIstWirklichDoooooof!1!1!";
    expect(study.name).toEqual("AnneIstWirklichDoooooof!1!1!");
  });


  it("setNameNull_Error.", function () {
    const study: KeyData = createDefaultKeyData();
    expect(function () { study.name = null; }).toThrowError("Parameter darf nicht null sein!");
  });
  it("setAmplitudeNecessaryNull_ErrorNotNull.", function () {
    const study: KeyData = createDefaultKeyData();
    expect(function () { study.amplitudeNecessary = null; }).toThrowError("Parameter darf nicht null sein!");
  });
  it("setStudyStatusNull_ErrorNotNull", function () {
    const study: KeyData = createDefaultKeyData();
    expect(function () { study.studyStatus = null; }).toThrowError("Parameter darf nicht null sein!");
  });
});


function createDefaultKeyData(): KeyData {
  const keyData = new KeyData(id, author, studyStatus, shortDescription, longDescription, amplitudeNecessary, name);
  return keyData;
}

function createMockedKeyData(): KeyData {
  const keyData = new KeyData(1, mockedUser, StudyStatus.CREATED, mockedDescription, "Volle Beschreibung", true, "Name");
  keyData.qualiQuestions = [mockedQuali];
  return keyData;
}
