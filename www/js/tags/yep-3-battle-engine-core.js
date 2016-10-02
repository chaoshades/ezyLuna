define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_BattleEngineCore',
        'v1.36d',
        'Have more control over the flow of the battle system with this plugin and alter various aspects to your liking.',
        'http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/',
        [
            new TagParser("Reflect Animation ID", new BasicParser()),
            new TagParser("Sprite Cannot Move", new TagOnlyParser())
        ]
    );

});