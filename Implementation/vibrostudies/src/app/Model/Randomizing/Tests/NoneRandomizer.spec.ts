import { NoneRandomizer } from '../NoneRandomizer';


const noneRandomizer = new NoneRandomizer();
const indices = [1, 2, 3, 4];
const fixations = [false, false, true, false];

describe('noneRandomizer', () => {
    it('randomize_nothingHappen', () => {
        const randomizedIndexArray = randomizeIndexArray();
        expect(randomizedIndexArray[0]).toEqual(1);
        expect(randomizedIndexArray[1]).toEqual(2);
        expect(randomizedIndexArray[2]).toEqual(3);
        expect(randomizedIndexArray[3]).toEqual(4);
    });

});

function randomizeIndexArray(): Array<number> {
    return noneRandomizer.randomize(indices, fixations);
}
