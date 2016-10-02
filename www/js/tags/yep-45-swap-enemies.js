define(function (require) {

    "use strict";

    var NumericArrayParser = require("parser/NumericArrayParser"),
        TagArrayRangeParser = require("parser/TagArrayRangeParser");

    return new Plugin(
        'YEP_SwapEnemies',
        'v1.02',
        'This is utility plugin made to help randomize sets of enemies for battle.',
        'http://yanfly.moe/2015/12/17/yep-45-swap-enemies/',
        [
            new TagParser("Swap", new NumericArrayParser(), "Swap"),
            new TagParser("Swap#2", new TagArrayRangeParser(), "Swap")
        ]
    );

});