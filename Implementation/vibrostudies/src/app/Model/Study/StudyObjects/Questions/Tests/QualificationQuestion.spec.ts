
import { QualificationQuestion } from "../QualificationQuestion";


const questionText = "Bist du größer als 187?";
const id = 1;
const name = "Name";
const displayName = "DisplayName";
const answer = false;

describe('QualificationQuestion', () => {
    it('getRequiredAnswer_givesExpectedAnswer', () => {
        const question: QualificationQuestion = createQualificationQuestionDefault();
        expect(question.requiredAnswer).toEqual(answer);
    });
    it('setRequiredAnswer_setsExpectedAnswer', () => {
        const question: QualificationQuestion = createQualificationQuestionDefault();
        question.requiredAnswer = true;
        expect(question.requiredAnswer).toEqual(true);
    });
    it('setInvalidRequiredAnswer_Error', () => {
        const question: QualificationQuestion = createQualificationQuestionDefault();
        expect(function () { question.requiredAnswer = null; })
        .toThrowError("RequiredAnswer darf nicht null sein.");
    });
});

function createQualificationQuestionDefault(): QualificationQuestion {
    const question: QualificationQuestion = new QualificationQuestion(id, name, questionText, displayName, answer);
    return question;
}
