define(function (require) {

    "use strict";

    var BasicPercentParser = require("parser/BasicPercentParser");

    return new Plugin(
        'YEP_ExtraEnemyDrops',
        'v1.05',
        'http://yanfly.moe/2015/12/19/yep-47-extra-enemy-drops/',
        [
            //new TagParser("Item x", new BasicPercentParser()), TODO
            //new TagParser("Weapon x", new BasicPercentParser()), TODO
            //new TagParser("Armor x", new BasicPercentParser()) TODO
        ]
    );

});