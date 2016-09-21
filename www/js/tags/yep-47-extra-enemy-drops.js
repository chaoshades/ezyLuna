define(function (require) {

    "use strict";

    var BasicTagArrayPercentParser = require("parser/BasicTagArrayPercentParser");

    return new Plugin(
        'YEP_ExtraEnemyDrops',
        'v1.05',
        'http://yanfly.moe/2015/12/19/yep-47-extra-enemy-drops/',
        [
            new TagParser("Item", new BasicTagArrayPercentParser(1)),
            new TagParser("Weapon", new BasicTagArrayPercentParser(1)),
            new TagParser("Armor", new BasicTagArrayPercentParser(1))
        ]
    );

});