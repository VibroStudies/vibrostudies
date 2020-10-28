import { Password } from "../Password";

const word = "123456qwertz";

describe('Password', () => {
    it('getPassword_getsExpectedPassword', () => {
        const password: Password = new Password(word);
        expect(password.password).toEqual(word);
    });
    it('setPassword_setsExpectedPassword', () => {
        const password: Password = new Password(word);
        password.password = "qwerty123456789";
        expect(password.password).toEqual("qwerty123456789");
    });
    it('createNullPassword_throwsError', () => {
        expect(function () { new Password(null); }).toThrowError("Password kann nicht null oder leer sein.");
    });
    it('createEmptyPassword_throwsError', () => {
        expect(function () { new Password(""); }).toThrowError("Password kann nicht null oder leer sein.");
    });
    it('setNullPassword_throwsError', () => {
        const password: Password = new Password("sdfh873h2jbfdu");
        expect(function () { password.password = null; }).toThrowError("Password kann nicht null oder leer sein.");
    });
});
