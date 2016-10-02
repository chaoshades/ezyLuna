define(function (require) {

    "use strict";

    var NumericArrayParser = require("parser/NumericArrayParser"),
        TagArrayRangeParser = require("parser/TagArrayRangeParser");

    return new Plugin(
        'YEP_AutoPassiveStates',
        'v1.09',
        'This plugin allows for some states to function as passives for actors, enemies, skills, and equips.',
        'http://yanfly.moe/2015/10/17/yep-13-auto-passive-states/',
        [
            new TagParser("Passive State", new NumericArrayParser(), "Passive State"),
            new TagParser("Passive State#2", new TagArrayRangeParser(), "Passive State")
        ]
    );

});