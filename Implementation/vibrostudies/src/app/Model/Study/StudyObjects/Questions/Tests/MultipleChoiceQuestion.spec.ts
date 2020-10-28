import { MultipleChoiceQuestion } from "../MultipleChoiceQuestion";

const maxChoices = 5;
const questionText = "Wie interessant sind die Harry Potter Bücher?";
const id = 1;
const displayName = "DisplayName";
const name = "Name";


describe('MultipleChoiceQuestion', () => {
    it('getMaxChoices_givesExpectedNumberOfChoices', () => {
        const question: MultipleChoiceQuestion = createMultipleChoiceQuestionDefault();
        expect(question.maxChoices).toEqual(5);
    });
    it('getAnswerOptions_givesExpectedAnswerOptions', () => {
        const question: MultipleChoiceQuestion = createMultipleChoiceQuestionDefault();
        expect(question.answerOptions).toEqual(createAnswerOptionList());
    });
    it('setMaxChoices_setsExpectedNumberOfChoices', () => {
        const question: MultipleChoiceQuestion = createMultipleChoiceQuestionDefault();
        question.maxChoices = 10;
        expect(question.maxChoices).toEqual(10);
    });
    it('setMaxChoicesInvalidParameter_Error', () => {
        const question: MultipleChoiceQuestion = createMultipleChoiceQuestionDefault();
        expect(function () { question.maxChoices = 0; })
        .toThrowError("Es muss mindestens eine Antwort angegeben werden können");
    })    
    it('setMaxChoicesInvalidParameter_Error', () => {
        const question: MultipleChoiceQuestion = createMultipleChoiceQuestionDefault();
        expect(function () { question.maxChoices = null; })
        .toThrowError("MaxChoices darf nicht null sein.");
    })    
});

function createMultipleChoiceQuestionDefault(): MultipleChoiceQuestion {
    const question: MultipleChoiceQuestion = new MultipleChoiceQuestion(id, name, questionText, displayName, [], maxChoices);
    question.answerOptions = createAnswerOptionList();
    return question;
}

function createAnswerOptionList(): string[] {
    const arr: string[] = ["Option 1", "Option 2", "Option 3", "Option 4"];
    return arr;
}
