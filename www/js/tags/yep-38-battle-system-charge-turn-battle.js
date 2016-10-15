define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return new Plugin(
        'YEP_X_BattleSysCTB',
        'Charge Turn Battle',
        'v1.14a',
        '(Requires YEP_BattleEngineCore.js) Add CTB (Charge Turn Battle) into your game using this plugin!',
        'http://yanfly.moe/2015/12/05/yep-38-battle-system-charge-turn-battle/',
        [
            new TagParser("CTB Icon", new BasicParser()),
            new TagParser("CTB Border Color", new BasicParser()),
            new TagParser("CTB Background Color", new BasicParser())
        ]
    );

});