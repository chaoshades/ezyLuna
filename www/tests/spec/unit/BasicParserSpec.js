/************************************
 * Tests
 ************************************
 */
describe("Basic Parser", function () {

    it("should parse simple tag", function (done) {
        var notetags = "<hp: 3243>";

        var parser = new BasicParser();
        expect(parser.parse("hp", notetags)).toEqual(new NoteTag("hp", 3243));
    });

});