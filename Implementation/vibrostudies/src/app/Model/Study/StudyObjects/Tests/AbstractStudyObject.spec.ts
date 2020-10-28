import { AbstractStudyObject } from "../AbstractStudyObject";
import { TextBlock } from "../TextBlock";

const id = 10;
const name = "Name";

describe('PauseElement', () => {
    it('getId_givesExpectedId', () => {
        const object: AbstractStudyObject = createStudyObjectDefault();
        expect(object.id).toEqual(id);
    });
    it('getName_givesExpectedName', () => {
        const object: AbstractStudyObject = createStudyObjectDefault();
        expect(object.name).toEqual(name);
    });
    it('setId_setsExpectedId', () => {
        const object: AbstractStudyObject = createStudyObjectDefault();
        object.id = 4;
        expect(object.id).toEqual(4);
    });
    it('setName_setsExpectedName', () => {
        const object: AbstractStudyObject = createStudyObjectDefault();
        object.name = "New Name";
        expect(object.name).toEqual("New Name");
    });
    it('setInvalidId_Error', () => {
        const object: AbstractStudyObject = createStudyObjectDefault();
        expect(function () { object.id = null; })
        .toThrowError("Id darf nicht null sein.");
    });
});

function createStudyObjectDefault(): AbstractStudyObject {
    const element: AbstractStudyObject = new TextBlock(id, name, "Müll");
    return element;
}
