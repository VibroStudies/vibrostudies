import { TextBlock } from "../TextBlock";

const text = "Das ist ein Text";
const id = 42;
const name = "Name";

describe('TextBlock', () => {
    it('getText_givesExpectedText', () => {
        const textblock: TextBlock = createTextBlockDefault();
        expect(textblock.text).toEqual(text);
    });
    it('setText_setsExpectedText', () => {
        const textblock: TextBlock = createTextBlockDefault();
        textblock.text = "Das ist ein anderer Text!";
        expect(textblock.text).toEqual("Das ist ein anderer Text!");
    });
});

function createTextBlockDefault(): TextBlock {
    const element: TextBlock = new TextBlock(id, name, text);
    return element;
}
