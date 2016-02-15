define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return [
            new TagParser("Show ATB Gauge", new TagOnlyParser()),
            new TagParser("Hide ATB Gauge", new TagOnlyParser()),
            new TagParser("ATB Gauge Width", new BasicParser())
    ];

});