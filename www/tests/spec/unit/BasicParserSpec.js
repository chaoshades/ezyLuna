define(["parser/BasicParser"], function (BasicParser) {

    /************************************
     * Tests
     ************************************
     */
    describe("Basic Parser", function () {

        it("should parse simple tag", function () {
            var notetags = "<hp: 3243>",
                expected = new NoteTag("hp", "3243");

            var parser = new BasicParser(),
                result = parser.parse("hp", notetags);

            expect(result).toEqual(expected);
        });

    });
});