define(function (require) {

    "use strict";

    var SignedParser = require("parser/SignedParser"),
        SignedPercentParser = require("parser/SignedPercentParser");

    return new Plugin(
        'YEP_X_BattleSysATB',
        'v1.24',
        'http://yanfly.moe/2015/11/06/yep-24-battle-system-active-turn-battle/',
        [
            new TagParser("ATB Start", new SignedParser(), "ATB Start"),
            new TagParser("ATB Turn", new SignedParser(), "ATB Turn"),
            new TagParser("ATB Start#2", new SignedPercentParser(), "ATB Start"),
            new TagParser("ATB Turn#2", new SignedPercentParser(), "ATB Turn")
        ]
    );

});