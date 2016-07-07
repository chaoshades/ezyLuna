define(function (require) {

    "use strict";

    var SignedParser = require("parser/SignedParser");

    return [
            new TagParser("Global Use Max", new SignedParser()),
            new TagParser("SType x Use Max", new SignedParser()),
            new TagParser("Skill x Use Max", new SignedParser())
    ];

});