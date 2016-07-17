define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        BasicArrayParser = require("parser/BasicArrayParser");

    return new Plugin(
        'YEP_InstantCast',
        'v1.08',
        'http://yanfly.moe/2015/10/30/yep-22-instant-cast-2/',
        [
            new TagParser("Instant Skill", new BasicParser()),
            new TagParser("Instant Skill", new BasicArrayParser()),
            //new TagParser("Instant Skill", new BasicCoordParser()), TODO
            new TagParser("Cancel Instant Skill", new BasicParser()),
            new TagParser("Cancel Instant Skill", new BasicArrayParser()),
            //new TagParser("Cancel Instant Skill", new BasicCoordParser()), TODO
            new TagParser("Cancel Instant item", new BasicParser()),
            new TagParser("Cancel Instant item", new BasicArrayParser()),
            //new TagParser("Cancel Instant item", new BasicCoordParser()), TODO
        ]
    );

});