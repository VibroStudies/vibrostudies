import { DateQuestion } from "../DateQuestion";

const questionText = "Wie interessant sind die Harry Potter Bücher?";
const id = 1;
const name = "TextFrage";
const displayName = "Frage 1"

describe('DateQuestion', () => {
    it('setStart_setsExpectedStart', () => {
        const question: DateQuestion = createDateQuestionDefault();
        question.start = new Date("02.04.1999");
        expect(question.start).toEqual(new Date("02.04.1999"));
    });
    it('setEnd_setsExpectedEnd', () => {
        const question: DateQuestion = createDateQuestionDefault();
        question.end = new Date("03.14.1592");
        expect(question.end).toEqual(new Date("03.14.1592"));
    });
});

function createDateQuestionDefault(): DateQuestion {
    const question: DateQuestion = new DateQuestion(id, name, questionText, displayName);
    return question;
}
