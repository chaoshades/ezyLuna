define(function (require) {

    "use strict";

    var TagExtensionParser = require("parser/TagExtensionParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        BasicArrayExtParser = require("parser/BasicArrayExtParser"),
        NumericTagArrayExtParser = require("parser/NumericTagArrayExtParser"),
        TagRangeExtParser = require("parser/TagRangeExtParser"),
        ExtOnlyParser = require("parser/ExtOnlyParser"),
        YEP_BATTLE_ENGINE_CORE_EXT = "YEP_BattleEngineCore";

    return new Plugin(
        'YEP_X_ActSeqPack1',
        'Action Sequence Pack 1',
        'v1.10a',
        '(Requires YEP_BattleEngineCore.js) Basic functions are added to the Battle Engine Core\'s action sequences.',
        'http://yanfly.moe/2015/10/11/yep-4-action-sequence-pack-1/',
        [],
        [
            // YEP_BattleEngineCore
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxhp Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxmp Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add atk Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add def Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mat Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mdf Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add agi Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add luk Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxhp Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxmp Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add atk Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add def Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mat Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mdf Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add agi Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add luk Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add State", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Animation", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "BGM", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Change Switch", new NumericTagArrayExtParser(), "Change Switch"),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Change Switch#2", new TagRangeExtParser(), "Change Switch"),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "CHANGE VARIABLE", new BasicExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Collapse", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Common Event", new BasicExtParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "EVAL", new BasicExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Gain Item", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Gain Weapon ", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Gain Armor", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Lose Item", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Lose Weapon ", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Lose Armor", new NumericTagArrayExtParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "GOLD", new BasicExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "HP", new BasicExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "HP VARIABLE", new BasicExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "ME", new BasicArrayExtParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "MP", new BasicExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "MP VARIABLE", new BasicExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Refresh Status", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxhp Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxmp Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove atk Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove def Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mat Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mdf Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove agi Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove luk Buff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxhp Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxmp Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove atk Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove def Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mat Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mdf Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove agi Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove luk Debuff", new BasicArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove State", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "SE", new BasicArrayExtParser())
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "TP", new BasicExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "TP VARIABLE", new BasicExtParser()) TODO
        ]
    );

});