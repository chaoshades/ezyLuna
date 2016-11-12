define(function (require) {

    "use strict";

    var TagExtensionParser = require("parser/TagExtensionParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        BasicArrayExtParser = require("parser/BasicArrayExtParser"),
        ExtOnlyParser = require("parser/ExtOnlyParser"),
        YEP_BATTLE_ENGINE_CORE_EXT = "YEP_BattleEngineCore";

    return new Plugin(
        'YEP_X_ActSeqPack3',
        'Action Sequence Pack 3',
        'v1.03',
        '(Requires YEP_BattleEngineCore.js) Camera control is added to the Battle Engine Core\'s action sequences.',
        'http://yanfly.moe/2015/10/12/yep-6-action-sequence-pack-3/',
        [],
        [
            // YEP_BattleEngineCore
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Clamp On", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Clamp Off", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Focus", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Offset", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Pan", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Camera Screen", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Reset Camera", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Reset Zoom", new BasicExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Camera", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Wait for Zoom", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Zoom", new BasicArrayExtParser())
        ]
    );

});