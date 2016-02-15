define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return [
            new TagParser("Reflect Animation ID", new BasicParser()),
            new TagParser("Sprite Cannot Move", new TagOnlyParser())
    ];

});