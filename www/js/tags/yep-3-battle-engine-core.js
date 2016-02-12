define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return [
            { tag: "Reflect Animation ID", parser: new BasicParser() },
            { tag: "Sprite Cannot Move", parser: new TagOnlyParser() }
    ];

});