import { SectionElement } from "../../StudyObjects/SectionElement";
import { ReferenceTuple } from "../../ReferenceTuple";
import { StudyPrototype } from "../../StudyPrototype";
import { User } from "@src/app/Model/User/User";
import { UserPermission } from "@src/app/Model/User/UserPermission";
import { Password } from "@src/app/Model/User/Password";
import { EMail } from "@src/app/Model/User/EMail";
import { StudyStatus } from "../../StudyStatus";
import { ReferenceTupleMembershipVerifier } from "../../ReferenceTupleMembershipVerifier";
import { TextBlock } from "../../StudyObjects/TextBlock";
import { VibrationPattern } from "../../StudyObjects/VibrationPattern";
import { KeyData } from "../../KeyData";
import { RandomizingStrategies } from "@src/app/Model/Randomizing/RandomizingStrategies";
import { ShortDescription } from "../../ShortDescription";


describe('SectionElement', () => {

    it('getName_getsExpectedName', () => {
        const element: SectionElement = createSectionElementDefault();
        expect(element.name).toEqual("Hauptteil");
    });
    it('setName_setsExpectedName', () => {
        const element: SectionElement = createSectionElementDefault();
        element.name = "Star Wars";
        expect(element.name).toEqual("Star Wars");
    });
    it('getAllStudyObjects_getsExpectedStudyObjects', () => {
        const element: SectionElement = createSectionElementDefault();
        const tupel: ReferenceTuple[] = [];
        expect(element.studyObjects).toEqual(tupel);
    });
    it('setAllStudyObjects_setsExpectedStudyObjects', () => {
        const element: SectionElement = createSectionElementDefault();
        const list: ReferenceTuple[] = [new ReferenceTuple(42, true)];
        element.studyObjects = list;
        expect(element.studyObjects).toEqual(list);
    });

    it('addStudyObjectWithoutIndex', () => {
        const sectionElement = createSectionElementDefault();
        const refTuple = createReferenceTupleDefault();
        sectionElement.addStudyObject(refTuple, null);
        const length = sectionElement.studyObjects.length;
        expect(sectionElement.studyObjects[length - 1]).toEqual(refTuple);
    });
    it('addStudyObjectWithInvalidIndex_Error', () => {
        const sectionElement = createSectionElementDefault();
        const refTuple = createReferenceTupleDefault();
        expect(function () { sectionElement.addStudyObject(refTuple, 3); }).toThrowError("Index des Section Elements fehlerhaft!");
    });
    it('addStudyObjectWithIndex', () => {
        const sectionElement = createSectionElementDefault();
        const refTuple = createReferenceTupleDefault();
        sectionElement.addStudyObject(refTuple, 0);
        expect(sectionElement.studyObjects[0]).toEqual(refTuple);
    });

    it('removeStudyObject', () => {
        const sectionElement = createSectionElementDefault();
        const refTuple = createReferenceTupleDefault();
        sectionElement.addStudyObject(refTuple, null);
        expect(sectionElement.studyObjects.includes(refTuple)).toEqual(true);
        sectionElement.removeStudyObject(666);
        expect(sectionElement.studyObjects.includes(refTuple)).toEqual(false);
    });

    it('swapStudyObject', () => {
        let sectionElement = createSectionElementDefault();
        const refTuple = createReferenceTupleDefault();
        sectionElement = fillStudyObjectsArray();
        sectionElement.swapStudyObject(0, 1);
        expect(sectionElement.studyObjects[0]).toEqual(new ReferenceTuple(42, false));
        expect(sectionElement.studyObjects[1]).toEqual(refTuple);
    });
});

function createSectionElementDefault(): SectionElement {
    const element: SectionElement = new SectionElement(1, "Hauptteil", RandomizingStrategies.NONE);
    element.verifier = new ReferenceTupleMembershipVerifier(createStudy());
    return element;
}

function createStudy(): StudyPrototype {
    const keyData = new KeyData(1,
        new User(0, "Max", "Mustermann", UserPermission.PARTICIPANT, new EMail("max.mustermann@hurensohn.com")),
        StudyStatus.PUBLISHED, new ShortDescription("Kurze Beschreibung"), "Volle Beschreibung", false, "Neue Studie");

    const study = new StudyPrototype(keyData);
    const text: TextBlock = new TextBlock(666, "Das ist ein cooler Textblock", "Dies ist ein cooler Text");
    const pattern: VibrationPattern = new VibrationPattern(42, "Cooles Vibrationsmuster");
    study.studyObjects = [text, pattern];
    return study;
}

function createReferenceTupleDefault(): ReferenceTuple {
    return new ReferenceTuple(666, true);
}

function fillStudyObjectsArray(): SectionElement {
    const element = createSectionElementDefault();
    element.addStudyObject(createReferenceTupleDefault());
    element.addStudyObject(new ReferenceTuple(42, false));
    return element;
}

