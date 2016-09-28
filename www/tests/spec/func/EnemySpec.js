/************************************
 * Tests
 ************************************
 */
describe("Enemy", function () {

    beforeAll(function (done) {
        initDelay(done);
    });

    it("should have enemy data", function (done) {
        // Project
        clickOn($('a[href="#project/1"]'))
        .done(function () {
            // Enemy
            var hash = "#project/1/enemies";
            clickOn($('.navbar a[href="' + hash + '"]'))
            .done(function () {
                expect($('#contentPage').has('#general_settings').length > 0).toBe(true);
                expect($('#contentPage').has('#traits').length > 0).toBe(true);
                expect($('#contentPage').has('#note').length > 0).toBe(true);
                expect($('#contentPage').has('#rewards').length > 0).toBe(true);
                expect($('#contentPage').has('#drop_items').length > 0).toBe(true);
                expect($('#contentPage').has('#action_patterns').length > 0).toBe(true);

                expect($('#contentPage').has('#btnGenerateTags').length > 0).toBe(true);
                expect($('#contentPage').has('#txtOutput').length > 0).toBe(true);
                done();
            });
        });
    });

});

/************************************
 * Navigation Tests
 ************************************
 */
describe("Navigation", function () {

    beforeAll(function (done) {
        initDelay(done);
    });

    beforeEach(function (done) {
        goToDefaultPage(done);
    });

    it("should have the good title and navigation buttons", function (done) {
        // Project
        clickOn($('a[href="#project/1"]'))
        .done(function () {
            // Enemy
            var hash = "#project/1/enemies";
            clickOn($('.navbar a[href="' + hash + '"]'))
            .done(function () {
                expect($('.navbar li.active a').attr('href')).toBe(hash);
                done();
            });
        });
    });

});