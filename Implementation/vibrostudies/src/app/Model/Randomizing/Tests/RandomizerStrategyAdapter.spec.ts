import { ReferenceTuple } from '../../Study/ReferenceTuple';
import { NoneRandomizer } from '../NoneRandomizer';
import { IRandomizerStrategyAdapter } from '../IRandomizerStrategyAdapter';
import { RandomizingStrategies } from '../RandomizingStrategies';
import { StandardRandomizer } from '../StandardRandomizer';

const noneRandomizer = new NoneRandomizer();
const tuple = [new ReferenceTuple(1, false), 
    new ReferenceTuple(2, false),
    new ReferenceTuple(3, true),
    new ReferenceTuple(4, false),
    new ReferenceTuple(5, true),]

describe('randomizerStrategyAdapter', () => {
    it('randomize_None', () => {
        const newTuple = IRandomizerStrategyAdapter.randomize(new NoneRandomizer(), tuple);
        expect(newTuple).toEqual(tuple);
    });
    it('randomize_Standard', () => {
        const newTuple = IRandomizerStrategyAdapter.randomize(new StandardRandomizer(), tuple);
        expect(newTuple[4]).toEqual(tuple[4]);
        expect(newTuple[2]).toEqual(tuple[2]);
    });

});
