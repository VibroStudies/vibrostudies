import { TextQuestion } from "../TextQuestion";
import { AbstractQuestion } from "../AbstractQuestion";

const questionText = "Wie interessant sind die Harry Potter Bücher?";
const id = 1;
const name = "TextFrage";
const displayName = "Frage 1";

describe('TextQuestion', () => {
    it('getQuestionText_givesExpectedQuestionText', () => {
        const question: AbstractQuestion = createAbstractQuestionDefault();
        expect(question.questionText).toEqual(questionText);
    });
    it('getDisplayName_givesExpectedDisplayName', () => {
        const question: AbstractQuestion = createAbstractQuestionDefault();
        expect(question.displayName).toEqual(displayName);
    });
    it('setAnswer_setsExpectedAnswer', () => {
        const question: AbstractQuestion = createAbstractQuestionDefault();
        question.answer = "Antwort";
        expect(question.answer).toEqual("Antwort");
    });
    it('setQuestionText_setsExpectedQuestionText', () => {
        const question: AbstractQuestion = createAbstractQuestionDefault();
        question.questionText = "Neue Frage";
        expect(question.questionText).toEqual("Neue Frage");
    });
    it('setDisplayName_setsExpectedDisplayName', () => {
        const question: AbstractQuestion = createAbstractQuestionDefault();
        question.displayName = "Neuer DisplayName"
        expect(question.displayName).toEqual("Neuer DisplayName");
    });
    it('setInvalidAnswer_Error', () => {
        const question: AbstractQuestion = createAbstractQuestionDefault();
        expect(function() {question.answer = null; })
        .toThrowError("Answer darf nicht null sein.");
    });
});

function createAbstractQuestionDefault(): AbstractQuestion {
    const question: AbstractQuestion = new TextQuestion(id, name, questionText, displayName, 0);
    return question;
}
