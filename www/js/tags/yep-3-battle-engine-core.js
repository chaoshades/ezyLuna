﻿define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        TagExtensionParser = require("parser/TagExtensionParser"),
        ExtOnlyParser = require("parser/ExtOnlyParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        ArrayExtParser = require("parser/ArrayExtParser"),
        YEP_BATTLE_ENGINE_CORE_EXT = "YEP_BattleEngineCore";

    return new Plugin(
        YEP_BATTLE_ENGINE_CORE_EXT,
        'Battle Engine Core',
        'v1.36d',
        'Have more control over the flow of the battle system with this plugin and alter various aspects to your liking.',
        'http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/',
        [
            new TagParser("Reflect Animation ID", new BasicParser()),
            new TagParser("Sprite Cannot Move", new TagOnlyParser()),
            new TagParser("Setup Action", new TagExtensionParser(), "Setup Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Whole Action", new TagExtensionParser(), "Whole Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Target Action", new TagExtensionParser(), "Target Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Follow Action", new TagExtensionParser(), "Follow Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Finish Action", new TagExtensionParser(), "Finish Action", YEP_BATTLE_ENGINE_CORE_EXT)
        ],
        [
            // YEP_BattleEngineCore
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Action Animation", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Action Common Event", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Action Effect", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Animation Wait", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Cast Animation", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Clear Battle Log", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Death Break", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Display Action", new ExtOnlyParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "IF", new ExtOnlyParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Immortal", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Motion Wait", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Perform Action", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Perform Finish", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Perform Start", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Animation", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Effect", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Movement", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for New Line", new ExtOnlyParser())
        ]
    );

});