define(function (require) {

    "use strict";

    var TagExtensionParser = require("parser/TagExtensionParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        ArrayExtParser = require("parser/ArrayExtParser"),
        ExtOnlyParser = require("parser/ExtOnlyParser"),
        YEP_BATTLE_ENGINE_CORE_EXT = "YEP_BattleEngineCore";

    return new Plugin(
        'YEP_X_ActSeqPack2',
        'Action Sequence Pack 2',
        'v1.11',
        '(Requires YEP_BattleEngineCore.js) Visual functions are added to the Battle Engine Core\'s action sequences.',
        'http://yanfly.moe/2015/10/12/yep-5-action-sequence-pack-2/',
        [],
        [
            // YEP_BattleEngineCore
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Attack Animation", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Enemy Effect", new ArrayExtParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Face", new NumericTagArrayExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Fade Out", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Fade In", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Flash Screen", new ArrayExtParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Float", new NumericTagArrayExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Hide Battle Hud", new ExtOnlyParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Jump", new NumericTagArrayExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Motion", new NumericTagArrayExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Move", new NumericTagArrayExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Opacity", new NumericTagArrayExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Show Battle Hud", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Shake Screen", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Tint Screen", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Float", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Jump", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Opacity", new ExtOnlyParser())
        ]
    );

});