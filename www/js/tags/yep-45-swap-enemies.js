define(function (require) {

    "use strict";

    var BasicArrayParser = require("parser/BasicArrayParser");

    return new Plugin(
        'YEP_SwapEnemies',
        'v1.02',
        'http://yanfly.moe/2015/12/17/yep-45-swap-enemies/',
        [
            new TagParser("Swap", new BasicArrayParser()),
            //new TagParser("Swap", new BasicCoordParser()) TODO
        ]
    );

});