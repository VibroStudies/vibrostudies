import { EMail } from "../EMail";

const mail = "annehe@online.de";

describe('EMail', () => {
    it('getEMail_getsExpectedEMail', () => {
        const email: EMail = createEMailDefault();
        expect(email.email).toEqual(mail);
    });
    it('setEMail_setsExpectedEMail', () => {
        const email: EMail = createEMailDefault();
        email.email = "adrian.furrer1999@gmail.com";
        expect(email.email).toEqual("adrian.furrer1999@gmail.com");
    });
    it('createInvalidEMail_throwsError', () => {
        expect(function () { new EMail(null); }).toThrowError("Email kann nicht null oder leer sein.");
    });
    it('setInvalidEMail_throwsError', () => {
        const email: EMail = createEMailDefault();
        expect(function () { email.email = null; }).toThrowError("Email kann nicht null oder leer sein.");
    });
});

function createEMailDefault(): EMail {
    return new EMail(mail);
}
