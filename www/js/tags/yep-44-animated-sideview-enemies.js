define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return [
            { tag: "Breathing", parser: new TagOnlyParser() },
            { tag: "No Breathing", parser: new TagOnlyParser() },
            { tag: "Breathing Speed", parser: new BasicParser() },
            { tag: "Breathing Rate X", parser: new BasicParser() },
            { tag: "Breathing Rate Y", parser: new BasicParser() },
            { tag: "Floating", parser: new TagOnlyParser() },
            { tag: "Floating Speed", parser: new BasicParser() },
            { tag: "Floating Height", parser: new BasicParser() }
    ];

});