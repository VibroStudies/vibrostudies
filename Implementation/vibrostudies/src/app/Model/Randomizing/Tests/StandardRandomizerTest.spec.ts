import { StandardRandomizer } from '../StandardRandomizer';

const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const fixations = [false, false, true, false, false, true, false, true, false, false];
const shortIndices = [1, 2, 3, 4, 5];
const shortFixations = [false, false, false, true];
const nullIndices = [1, 2, null, 4, 5, 6, 7, 8, 9, 10];
const nullFixations = [false, false, null, false, true, false, true, false, false, true];
const undefinedIndices = [1, 2, 3, 4, 5, 6, undefined, 8, 9, 10];
const undefinedFixations = [false, false, undefined, false, true, false, true, false, false, true];
const everyFixation = [true, true, true, true, true, true, true, true, true, true];
const onlyOneNotFixed = [true, true, true, true, false, true, true, true, true, true];
const emptyIndices = Array<number>();
const emptyFixations = Array<boolean>();
const standardRandomizer = new StandardRandomizer();

describe('standardRandomizer', () => {
    it('randomize_keepsIndexFixed', () => {
        const randomizedIndexArray = randomizeIndexArray();
        expect(randomizedIndexArray[2]).toEqual(3);
        expect(randomizedIndexArray[5]).toEqual(6);
        expect(randomizedIndexArray[7]).toEqual(8);
    });
    it('randomize_keepsSameOrderInArray', () => {
        expect(standardRandomizer.randomize(indices, everyFixation)).toEqual(indices);
        expect(standardRandomizer.randomize(indices, onlyOneNotFixed)).toEqual(indices);
    });
    it('randomize_throwsLengthError', () => {
        expect(function () {standardRandomizer.randomize(shortIndices, fixations); })
        .toThrowError("Indeces and fixations should be the same length.");
        expect(function () {standardRandomizer.randomize(indices, shortFixations); })
        .toThrowError("Indeces and fixations should be the same length.");
    });
    it('randomize_throwsEmptyError', () => {
        expect(function () {standardRandomizer.randomize(emptyIndices, fixations); })
        .toThrowError("Indeces or fixations can't be empty.");
        expect(function () {standardRandomizer.randomize(indices, emptyFixations); })
        .toThrowError("Indeces or fixations can't be empty.");
        expect(function () {standardRandomizer.randomize(emptyIndices, emptyFixations); })
        .toThrowError("Indeces or fixations can't be empty.");
    });
    it('randomize_throwsNullOrUndefinedError', () => {
        expect(function () {standardRandomizer.randomize(nullIndices, fixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(indices, nullFixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(nullIndices, nullFixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(undefinedIndices, fixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(indices, undefinedFixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(undefinedIndices, undefinedFixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(undefinedIndices, nullFixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
        expect(function () {standardRandomizer.randomize(nullIndices, undefinedFixations); })
        .toThrowError("Indeces or fixations has a null or undefined entry.");
    });
});

function randomizeIndexArray(): Array<number> {
    return standardRandomizer.randomize(indices, fixations);
}

