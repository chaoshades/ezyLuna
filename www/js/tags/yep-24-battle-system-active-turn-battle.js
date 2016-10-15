define(function (require) {

    "use strict";

    var SignedParser = require("parser/SignedParser"),
        SignedPercentParser = require("parser/SignedPercentParser"),
        BasicArrayExtParser = require("parser/BasicArrayExtParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        YEP_BATTLE_ENGINE_CORE_EXT = "YEP_BattleEngineCore";

    return new Plugin(
        'YEP_X_BattleSysATB',
        'Active Turn Battle',
        'v1.24',
        '(Requires YEP_BattleEngineCore.js) Add ATB (Active Turn Battle) into your game using this plugin!',
        'http://yanfly.moe/2015/11/06/yep-24-battle-system-active-turn-battle/',
        [
            new TagParser("ATB Start", new SignedParser(), "ATB Start"),
            new TagParser("ATB Turn", new SignedParser(), "ATB Turn"),
            new TagParser("ATB Start#2", new SignedPercentParser(), "ATB Start"),
            new TagParser("ATB Turn#2", new SignedPercentParser(), "ATB Turn")
        ],
        [   //YEP_BattleEngineCore
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "ATB Charge", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "ATB Gauge", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "ATB Interrupt", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "ATB Speed", new BasicArrayExtParser())
        ]
    );

});