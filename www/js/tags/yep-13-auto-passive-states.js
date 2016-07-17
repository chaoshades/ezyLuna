define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        BasicArrayParser = require("parser/BasicArrayParser");

    return new Plugin(
        'YEP_AutoPassiveStates',
        'v1.09',
        'http://yanfly.moe/2015/10/17/yep-13-auto-passive-states/',
        [
            new TagParser("Passive State", new BasicParser()),
            new TagParser("Passive State", new BasicArrayParser()),
            //new TagParser("Passive State", new BasicCoordParser()), TODO
        ]
    );

});