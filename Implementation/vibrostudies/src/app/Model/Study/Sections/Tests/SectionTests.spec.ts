import { Section } from "../../StudyObjects/Section";
import { SectionElement } from "../../StudyObjects/SectionElement";
import { ReferenceTuple } from "../../ReferenceTuple";
import { RandomizingStrategies } from "@src/app/Model/Randomizing/RandomizingStrategies";


const skippable = true;
const name = "Hauptteil";
const resultRelevant = true;
/*const element1: SectionElement = new SectionElement(1, "Einfuerung");
const element2: SectionElement = new SectionElement(2, "Playground");
const element3: SectionElement = new SectionElement(3, "Test");
const element4: SectionElement = new SectionElement(4, "Schluss");*/

describe('Section', () => {
    it('isSkippable_givesExpectedSkippable', () => {
        expect(createSectionDefault().skippable).toEqual(true);
    });
    it('isResultRelevant_givesExpectedResultRelevant', () => {
        expect(createSectionDefault().resultRelevant).toEqual(true);
    });
    it('getName_givesExpectedname', () => {
        expect(createSectionDefault().name).toEqual("Hauptteil");
    });
    it('setSkippable_setsExpectedSkippable', () => {
        const section: Section = createSectionDefault();
        section.skippable = false;
        expect(section.skippable).toEqual(false);
    });
    it('setResultRelevant_setsExpectedResultRelevant', () => {
        const section: Section = createSectionDefault();
        section.resultRelevant = false;
        expect(section.resultRelevant).toEqual(false);
    });
    it('setName_setsExpectedName', () => {
        const section: Section = createSectionDefault();
        section.name = "Test Name";
        expect(section.name).toEqual("Test Name");
    });

    it('getAllSectionElements_givesExpectedSectionsElementsList', () => {
        expect(createSectionDefault().sectionElements).toEqual(createStudyObjectsList());
    });
    /*
    it('getSectionElement_givesExpectedSectionElement', () => {
        const section: Section = createSectionDefault();
        expect(section.getSectionElementAtIndex(1)).toEqual(element2);
    });
    it('addSectionElement_addsExpectedSectionElement', () => {
        const section: Section = createSectionDefault();
        section.addSectionElement(element1);
        expect(section.getSectionElementAtIndex(4)).toEqual(element1);
    });
    */
    it('setAllSectionElements_setsExpectedSectionElementsLists', () => {
        const section: Section = createSectionDefault();
        section.sectionElements = createStudyObjectsList();
        expect(createSectionDefault().sectionElements).toEqual(createStudyObjectsList());
    });
    /*
    it('removeSectionElement_removesExpectedSectionElement', () => {
        const section: Section = createSectionDefault();
        section.removeSectionElementAtIndex(0);
        expect(section.getSectionElementAtIndex(0)).toEqual(element2);
    });
    it('removeSectionElementOutOfList_throwsException', () => {
        const section: Section = createSectionDefault();
        expect(function () { section.removeSectionElementAtIndex(10); })
        .toThrowError("Section-Element konnte nicht entfernt werden, da der Index außerhalb der Liste liegt.");
    });

    it('getSectionElementOutOfList_throwsException', () => {
        const section: Section = createSectionDefault();
        expect(function () { section.getSectionElementAtIndex(10); })
        .toThrowError("Section-Element konnte nicht zurückgegeben werden, da der Index außerhalb der Liste liegt.");
    });
    it('addUndefinedSectionElement_throwsException', () => {
        const section: Section = createSectionDefault();
        expect(function () { section.addSectionElement(undefined); })
        .toThrowError("Section-Element konnte nicht hinzugefügt werden, da es undefiniert oder null ist.");
    });
    */
});

function createSectionDefault(): Section {
    const section: Section = new Section(0, name, skippable, resultRelevant, RandomizingStrategies.NONE);
    section.sectionElements = createStudyObjectsList();
    return section;
}
function createStudyObjectsList(): ReferenceTuple[] {
    const sectionElements: ReferenceTuple[] = ReferenceTuple[4];
    return sectionElements;
}
