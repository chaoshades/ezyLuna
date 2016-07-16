define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        YEPCoreEngine = require("tag/yep-1-core-engine"),
        YEPBattleEngineCore = require("tag/yep-3-battle-engine-core"),
        YEPAnimatedSideViewEnemies = require("tag/yep-44-animated-sideview-enemies"),
        YEPBattleSystemActiveTurnBattle = require("tag/yep-24-battle-system-active-turn-battle"),
        YEPVisualATBGauge = require("tag/yep-31-visual-atb-gauge"),
        YEPBattleSystemChargeTurnBattle = require("tag/yep-38-battle-system-charge-turn-battle"),
        YEPVisualHPGauges = require("tag/yep-30-visual-hp-gauges"),
        YEPBuffsStatesCore = require("tag/yep-50-buffs-states-core"),
        YEPDamageCore = require("tag/yep-25-damage-core"),
        YEPArmorScaling = require("tag/yep-33-armor-scaling"),
        YEPTaunt = require("tag/yep-23-taunt"),
        YEPLimitedSkillUses = require("tag/yep-56-limited-skill-uses"),

        plugins = [
            YEPCoreEngine,
            YEPBattleEngineCore,
            YEPAnimatedSideViewEnemies,
            YEPBattleSystemActiveTurnBattle,
            YEPVisualATBGauge,
            YEPBattleSystemChargeTurnBattle,
            YEPVisualHPGauges,
            YEPBuffsStatesCore,
            YEPDamageCore,
            YEPArmorScaling,
            YEPTaunt,
            YEPLimitedSkillUses
        ],

        tags = _.chain(plugins)
                .map(function(p) { return p.tags; })
                .flatten()
                .value(),

    getStringFromNoteTags = function (notetags) {
        var result = "";

        _.each(notetags, function (nt) {
            var temp = _.find(tags, function (t) { return t.id == nt.tag; });
            if (temp)
                result += temp.parser.stringify(temp.tag, nt.data) + "\n";
        });

        return result.trim();
    },

    getNoteTagsFromString = function (notetags) {
        var results = [];

        _.each(tags, function (t) {
            var temp = t.parser.parse(t.tag, notetags);
            if (temp)
                results.push(temp);
        });

        return results;
    },
        
    getSupportedPlugins = function () {
        var results = [];

        _.each(plugins, function (p) {
            results.push(new Plugin(p.name, p.version, p.help_url));
        });

        return results;
    };

    // The public API
    return {
        getStringFromNoteTags: getStringFromNoteTags,
        getNoteTagsFromString: getNoteTagsFromString,
        getSupportedPlugins: getSupportedPlugins
    };

});