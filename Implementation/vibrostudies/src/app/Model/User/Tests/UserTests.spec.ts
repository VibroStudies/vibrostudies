import { UserPermission } from "../UserPermission";
import { Password } from "../Password";
import { EMail } from "../EMail";
import { User } from "../User";


const id = 111;
const firstName = "Anne";
const lastName = "Hermann";
const permission = UserPermission.PARTICIPANT;
const password = new Password("AnneIstMegaSuperDuperUndAdrianIstBlöd");
const email = new EMail("annehe@online.de");

describe('user', () => {
    it('getID_givesExpectedID', () => {
        expect(createUserDefault().id).toEqual(111);
    });
    it('getfirstName_givesExpectedfirstName', () => {
        expect(createUserDefault().firstName).toEqual("Anne");
    });
    it('getlastName_givesExpectedlastName', () => {
        expect(createUserDefault().lastName).toEqual("Hermann");
    });
    it('getUserPermission_givesExpectedUserPermission', () => {
        expect(createUserDefault().permission).toEqual(permission);
    });
    it('getEMail_givesExpectedEMail', () => {
        expect(createUserDefault().email).toEqual(new EMail("annehe@online.de"));
    });
    it('setValidEmail_setsExpectedEmail', () => {
        const user: User = createUserDefault();
        user.email = new EMail("annehermann@gmx.de");
        expect(user.email).toEqual(new EMail("annehermann@gmx.de"));
    });
    it('setInvalidEmail_throwsError', () => {
        const user: User = createUserDefault();
        expect(function () { user.email = new EMail(""); }).toThrowError("Email kann nicht null oder leer sein.");
    });
    it('setValidFirstName_setsExpectedFirstName', () => {
        const user: User = createUserDefault();
        user.firstName = "Anne-Kathrin";
        expect(user.firstName).toEqual("Anne-Kathrin");
    });
    it('setInvalidFirstName_throwsError', () => {
        const user: User = createUserDefault();
        expect(function () { user.firstName = ""; }).toThrowError("Name kann nicht null oder leer sein.");
    });
    it('setValidLastName_setsExpectedLastName', () => {
        const user: User = createUserDefault();
        user.lastName = "Ciccopiedi";
        expect(user.lastName).toEqual("Ciccopiedi");
    });
    it('setInvalidLastName_throwsError', () => {
        const user: User = createUserDefault();
        expect(function () { user.lastName = ""; }).toThrowError("Name kann nicht null oder leer sein.");
    });
    it('setUserPermission_setsExpectedPermission', () => {
        const user: User = createUserDefault();
        user.permission = permission;
        expect(user.permission).toEqual(permission);
    });
});

function createUserDefault(): User {
    return new User(id, firstName, lastName, permission, email);
}


