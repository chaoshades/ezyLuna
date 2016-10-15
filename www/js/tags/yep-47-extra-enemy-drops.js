define(function (require) {

    "use strict";

    var TagArrayPercentParser = require("parser/TagArrayPercentParser");

    return new Plugin(
        'YEP_ExtraEnemyDrops',
        'Extra Enemy Drops',
        'v1.05',
        'Allows your enemies to drop more than just three items as per the editor\'s limit.',
        'http://yanfly.moe/2015/12/19/yep-47-extra-enemy-drops/',
        [
            new TagParser("Item", new TagArrayPercentParser(1)),
            new TagParser("Weapon", new TagArrayPercentParser(1)),
            new TagParser("Armor", new TagArrayPercentParser(1))
        ]
    );

});