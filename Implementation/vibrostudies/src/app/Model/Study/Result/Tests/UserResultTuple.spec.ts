import { EMail } from "@src/app/Model/User/EMail";
import { Password } from "@src/app/Model/User/Password";
import { User } from "@src/app/Model/User/User";
import { UserPermission } from "@src/app/Model/User/UserPermission";
import { MetaData } from "../../MetaData";
import { AbstractQuestion } from "../../StudyObjects/Questions/AbstractQuestion";
import { DateQuestion } from "../../StudyObjects/Questions/DateQuestion";
import { TextQuestion } from "../../StudyObjects/Questions/TextQuestion";
import { UserResultTuple } from "../UserResultTuple";

const user = new User(1, "A", "F", UserPermission.ADMINISTRATOR, new EMail("a.f@gmx.com"));
const results: AbstractQuestion[] = [new TextQuestion(1, "F", "r", "age")];
const metaData = new MetaData("M", "e", "t", "a", "D", "a", "t", 97, 33, true);

describe('TextQuestion', () => {
    it('getUser_givesExpectedUser', () => {
        const result = createUserResultTupleDefault();
        expect(result.user).toEqual(user);
    });
    it('getResults_givesExpectedResults', () => {
        const result = createUserResultTupleDefault();
        expect(result.results).toEqual(results);
    });
    it('getMetaData_givesExpectedMetaData', () => {
        const result = createUserResultTupleDefault();
        expect(result.metaData).toEqual(metaData);
    });

    it('setUser_setsExpectedUser', () => {
        const result = createUserResultTupleDefault();
        const participant = new User(69, "Anne-Kathrin", "Hermann", UserPermission.CREATOR, new EMail("anne.ist.doof@adrianIstGod.com"));
        result.user = participant;
        expect(result.user).toEqual(participant);
    });
    it('setResults_setsExpectedResults', () => {
        const result = createUserResultTupleDefault();
        result.results = [new DateQuestion(1, "N", "e", "u")];
        expect(result.results).toEqual([new DateQuestion(1, "N", "e", "u")]);
    });
    it('setMetaData_setsExpectedMetaData', () => {
        const result = createUserResultTupleDefault();
        result.metaData = new MetaData("", "", "", "", "", "", "", 1337, 42, true);
        expect(result.metaData).toEqual(new MetaData("", "", "", "", "", "", "", 1337, 42, true));
    });
});

function createUserResultTupleDefault(): UserResultTuple {
    const resultTuple: UserResultTuple = new UserResultTuple(user, results, metaData);
    return resultTuple;
}
