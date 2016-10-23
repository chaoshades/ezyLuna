define(function (require) {

    "use strict";

    var TagExtensionParser = require("parser/TagExtensionParser"),
        BasicExtParser = require("parser/BasicExtParser"),
        ArrayExtParser = require("parser/ArrayExtParser"),
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
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxhp Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxmp Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add atk Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add def Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mat Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mdf Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add agi Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add luk Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxhp Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add maxmp Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add atk Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add def Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mat Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add mdf Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add agi Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add luk Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Add State", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Animation", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "BGM", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Change Switch", new NumericTagArrayExtParser(), "Change Switch"),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Change Switch#2", new TagRangeExtParser(), "Change Switch"),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "CHANGE VARIABLE", new BasicExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Collapse", new ArrayExtParser()),
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
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "ME", new ArrayExtParser()),
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "MP", new BasicExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "MP VARIABLE", new BasicExtParser()), TODO
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Refresh Status", new ExtOnlyParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxhp Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxmp Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove atk Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove def Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mat Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mdf Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove agi Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove luk Buff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxhp Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove maxmp Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove atk Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove def Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mat Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove mdf Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove agi Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove luk Debuff", new ArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "Remove State", new NumericTagArrayExtParser()),
            new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "SE", new ArrayExtParser())
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "TP", new BasicExtParser()), TODO
            //new ExtensionParser(YEP_BATTLE_ENGINE_CORE_EXT, "TP VARIABLE", new BasicExtParser()) TODO
        ]
    );

});