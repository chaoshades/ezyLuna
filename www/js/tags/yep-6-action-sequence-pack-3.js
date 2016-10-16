define(function (require) {

    "use strict";

    var TagExtensionParser = require("parser/TagExtensionParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        ArrayExtParser = require("parser/ArrayExtParser"),
        ExtOnlyParser = require("parser/ExtOnlyParser"),
        YEP_BATTLE_ENGINE_CORE_EXT = "YEP_BattleEngineCore";

    return new Plugin(
        'YEP_X_ActSeqPack3',
        'Action Sequence Pack 3',
        'v1.03',
        '(Requires YEP_BattleEngineCore.js) Camera control is added to the Battle Engine Core\'s action sequences.',
        'http://yanfly.moe/2015/10/12/yep-6-action-sequence-pack-3/',
        [
            new TagParser("Setup Action#3", new TagExtensionParser(), "Setup Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Whole Action#3", new TagExtensionParser(), "Whole Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Target Action#3", new TagExtensionParser(), "Target Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Follow Action#3", new TagExtensionParser(), "Follow Action", YEP_BATTLE_ENGINE_CORE_EXT),
            new TagParser("Finish Action#3", new TagExtensionParser(), "Finish Action", YEP_BATTLE_ENGINE_CORE_EXT)
        ],
        [
            // YEP_BattleEngineCore
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Clamp On", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Clamp Off", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Focus", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Offset", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Pan", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Screen", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Reset Camera", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Reset Zoom", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Camera", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Zoom", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Zoom", new ArrayExtParser())
        ]
    );

});