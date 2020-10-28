import { LinearScaleQuestion } from "../LinearScaleQuestion";


const numberOfChoices = 5;
const leftLabel = "interessant";
const rightLabel = "langweilig";
const questionText = "Wie interessant sind die Harry Potter Bücher?";
const id = 1;
const name = "Name";
const displayName = "DisplayName";

describe('LinearScaleQuestion', () => {
    it('getNumberOfChoices_givesExpectedNumberOfChoices', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        expect(question.numberOfChoices).toEqual(numberOfChoices);
    });
    it('getLeftLabel_givesExpectedLabel', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        expect(question.leftLabel).toEqual(leftLabel);
    });
    it('getRightLabel_givesExpectedLabel', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        expect(question.rightLabel).toEqual(rightLabel);
    });
    it('setNumberOfChoices_setsExpectedNumberOfChoices', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        question.numberOfChoices = 10;
        expect(question.numberOfChoices).toEqual(10);
    });
    it('setLeftLabel_setsExpectedLabel', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        question.leftLabel = "spannend";
        expect(question.leftLabel).toEqual("spannend");
    });
    it('setRightLabel_setsExpectedLabel', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        question.rightLabel = "Überaus spannend";
        expect(question.rightLabel).toEqual("Überaus spannend");
    });
    it('setInvalidNumberOfChoices_Error', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        expect(function() {question.numberOfChoices = null; })
        .toThrowError("NumberOfChoices darf nicht null sein.");
    });
    it('setInvalidNumberOfChoices_Error', () => {
        const question: LinearScaleQuestion = createLinearScaleQuestionDefault();
        expect(function() {question.numberOfChoices = 1; })
        .toThrowError("NumberOfChoices muss mindestens 2 sein.");
    });
});

function createLinearScaleQuestionDefault(): LinearScaleQuestion {
    const question: LinearScaleQuestion = new LinearScaleQuestion(id, name, questionText, displayName, numberOfChoices,
        leftLabel, rightLabel);
    return question;
}
