import { TextQuestion } from "../TextQuestion";

const questionText = "Wie interessant sind die Harry Potter Bücher?";
const id = 1;
const name = "TextFrage";
const displayName = "Frage 1";
const length = 300;

describe('TextQuestion', () => {
    it('getLength_givesExpectedLength', () => {
        const question: TextQuestion = createLinearScaleQuestionDefault();
        expect(question.length).toEqual(length);
    });
    it('setLength_setsExpectedLength', () => {
        const question: TextQuestion = createLinearScaleQuestionDefault();
        question.length = 1500;
        expect(question.length).toEqual(1500);
    });
});

function createLinearScaleQuestionDefault(): TextQuestion {
    const question: TextQuestion = new TextQuestion(id, name, questionText, displayName, length);
    return question;
}
