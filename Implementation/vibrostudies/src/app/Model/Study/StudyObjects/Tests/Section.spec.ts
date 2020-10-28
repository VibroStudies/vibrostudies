import { RandomizingStrategies } from "@src/app/Model/Randomizing/RandomizingStrategies";
import { EMail } from "@src/app/Model/User/EMail";
import { User } from "@src/app/Model/User/User";
import { UserPermission } from "@src/app/Model/User/UserPermission";
import { instance, mock, when } from "ts-mockito";
import { KeyData } from "../../KeyData";
import { ReferenceTuple } from "../../ReferenceTuple";
import { ReferenceTupleMembershipVerifier } from "../../ReferenceTupleMembershipVerifier";
import { ShortDescription } from "../../ShortDescription";
import { StudyPrototype } from "../../StudyPrototype";
import { StudyStatus } from "../../StudyStatus";
import { Section } from "../Section";

const id = 10;
const name = "Name";
const skippable = false;
const resultRelevant = true;
const randomStrategy = RandomizingStrategies.STANDARD;

let mockedReferenceTupleMembershipVerifier = mock(ReferenceTupleMembershipVerifier);
let mockedReferenceTuple = mock(ReferenceTuple);

describe('Section', () => {
    it('getSkippable_givesExpectedSkippable', () => {
        const object: Section = createSectionDefault();
        expect(object.skippable).toEqual(skippable);
    });
    it('getRandomStrategy_givesExpectedRandomStrategy', () => {
        const object: Section = createSectionDefault();
        expect(object.randomStrategy).toEqual(randomStrategy);
    });
    it('getResultRelevant_givesExpectedResultRelevant', () => {
        const object: Section = createSectionDefault();
        expect(object.resultRelevant).toEqual(resultRelevant);
    });

    it('setSkippable_setsExpectedSkippable', () => {
        const object: Section = createSectionDefault();
        object.skippable = true;
        expect(object.skippable).toEqual(true);
    });
    it('setRandomStrategy_setsExpectedRandomStrategy', () => {
        const object: Section = createSectionDefault();
        object.randomStrategy = RandomizingStrategies.NONE;
        expect(object.randomStrategy).toEqual(RandomizingStrategies.NONE);
    });
    it('setResultRelevant_setsExpectedResultRelevant', () => {
        const object: Section = createSectionDefault();
        object.resultRelevant = false;
        expect(object.resultRelevant).toEqual(false);
    });


    it('setRefTupleVerifier_setsExpectedRefTupleVerifier', () => {
        const object: Section = createSectionDefault();
        object.verifier = new ReferenceTupleMembershipVerifier(createStudyPrototype());
        expect(object.verifier).toEqual(new ReferenceTupleMembershipVerifier(createStudyPrototype()));
    });

    it('setRefTupleVerifier_setsExpectedMockedRefTupleVerifier', () => {
        const object: Section = createSectionDefault();
        object.verifier = instance(mockedReferenceTupleMembershipVerifier);
        expect(object.verifier).toEqual(instance(mockedReferenceTupleMembershipVerifier));
    });

    it('setSectionElements_setsExpectedSectionElements', () => {
        const object: Section = createSectionDefault();
        object.sectionElements = [new ReferenceTuple(1, true)];
        expect(object.sectionElements).toEqual([new ReferenceTuple(1, true)]);
    });

    it('setSectionElements_setsExpectedMockedSectionElements', () => {
        const object: Section = createSectionDefault();
        object.sectionElements = [instance(mockedReferenceTuple)];
        expect(object.sectionElements).toEqual([instance(mockedReferenceTuple)]);
    });

    it('setInvalidSkippable_Error', () => {
        const object: Section = createSectionDefault();
        expect(function () { object.skippable = null; })
        .toThrowError("Skippable darf nicht null sein.");
    });
    it('setInvalidRandomStrategy_Error', () => {
        const object: Section = createSectionDefault();
        expect(function () { object.randomStrategy = null; })
        .toThrowError("RandomStrategy darf nicht null sein.");
    });
    it('setInvalidResultRelevant_Error', () => {
        const object: Section = createSectionDefault();
        expect(function () { object.resultRelevant = null; })
        .toThrowError("ResultRelevant darf nicht null sein.");
    });
});

function createSectionDefault(): Section {
    const element: Section = new Section(id, name, skippable, resultRelevant, randomStrategy);
    return element;
}

function createStudyPrototype(): StudyPrototype {
    const study = new StudyPrototype(new KeyData(0, 
        new User(0, "Vorname", "Nachname", UserPermission.ADMINISTRATOR, new EMail("sdf@sdf.dce")),
        StudyStatus.CREATED, new ShortDescription("Beschreibung"), "Beschreibung", true, "Name"));
    return study;
}
