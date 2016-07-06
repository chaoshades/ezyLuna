define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return [
            new TagParser("Show HP Gauge", new TagOnlyParser()),
            new TagParser("Hide HP Gauge", new TagOnlyParser()),
            new TagParser("HP Gauge Height", new BasicParser()),
            new TagParser("HP Gauge Width", new BasicParser()),
            new TagParser("HP Gauge Back Color", new BasicParser()),
            new TagParser("HP Gauge Color 1", new BasicParser()),
            new TagParser("HP Gauge Color 2", new BasicParser())
    ];

});