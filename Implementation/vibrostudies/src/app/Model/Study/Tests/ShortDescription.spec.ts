import {ShortDescription} from "../ShortDescription";

const longText = "It is a period of civil war. \n " +
"Rebel spaceships, striking \n" +
"from a hidden base, have won \n" +
"their first victory against \n" +
"the evil Galactic Empire. \n \n" +
"During the battle, Rebel \n" +
"spies managed to steal secret \n" +
"plans to the Empire's \n" +
"ultimate weapon, the DEATH \n" +
"STAR, an armored space \n" +
"station with enough power to \n" +
"destroy an entire planet. \n \n" +
"Pursued by the Empire's \n" +
"sinister agents, Princess \n" +
"Leia races home aboard her \n" +
"starship, custodian of the \n" +
"stolen plans that can save \n" +
"her people and restore \n" +
"freedom to the galaxy.....";

describe("Short Description", function() {
    it("getText_givesExpectedText.", function() {
      expect(createDefaultShortDescription().text).toEqual("Beschreibung!");
    });
    it("setText_setValidText.", function() {
        const description: ShortDescription = createDefaultShortDescription();
        description.text = "Neue Beschreibung!";
        expect(description.text).toEqual("Neue Beschreibung!");
    });
});

function createDefaultShortDescription(): ShortDescription {
    return new ShortDescription("Beschreibung!");
}
