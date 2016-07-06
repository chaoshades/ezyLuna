define(function (require) {

    "use strict";

    var TagOnlyParser = require("parser/TagOnlyParser");

    return [
            new TagParser("Bypass Damage Cap", new TagOnlyParser())
    ];

});