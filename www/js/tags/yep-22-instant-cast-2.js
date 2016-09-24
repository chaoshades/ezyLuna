define(function (require) {

    "use strict";

    var NumericArrayParser = require("parser/NumericArrayParser"),
        TagArrayRangeParser = require("parser/TagArrayRangeParser");

    return new Plugin(
        'YEP_InstantCast',
        'v1.08',
        'http://yanfly.moe/2015/10/30/yep-22-instant-cast-2/',
        [
            new TagParser("Instant Skill", new NumericArrayParser(), "Instant Skill"),
            new TagParser("Instant Skill#2", new TagArrayRangeParser(), "Instant Skill"),
            new TagParser("Instant Item", new NumericArrayParser(), "Instant Item"),
            new TagParser("Instant Item#2", new TagArrayRangeParser(), "Instant Item"),
            new TagParser("Cancel Instant Skill", new NumericArrayParser(), "Cancel Instant Skill"),
            new TagParser("Cancel Instant Skill#2", new TagArrayRangeParser(), "Cancel Instant Skill"),
            new TagParser("Cancel Instant Item", new NumericArrayParser(), "Cancel Instant Item"),
            new TagParser("Cancel Instant Item#2", new TagArrayRangeParser(), "Cancel Instant Item")
        ]
    );

});