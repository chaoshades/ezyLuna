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
        YEPExtraEnemyDrops = require("tag/yep-47-extra-enemy-drops"),
        YEPTaunt = require("tag/yep-23-taunt"),
        YEPLimitedSkillUses = require("tag/yep-56-limited-skill-uses"),
        YEPSkillCooldowns = require("tag/yep-9-skill-cooldowns"),
        YEPInstantCast = require("tag/yep-22-instant-cast-2"),
        YEPWeaponAnimation = require("tag/yep-63-weapon-animation"),
        YEPWeaponUnleash = require("tag/yep-51-weapon-unleash"),
        YEPAutoPassiveStates = require("tag/yep-13-auto-passive-states"),
        YEPEnemyLevels = require("tag/yep-64-enemy-levels"),
        YEPJobPoints = require("tag/yep-27-job-points"),
        YEPRowFormation = require("tag/yep-54-row-formation"),
        YEPSwapEnemies = require("tag/yep-45-swap-enemies"),
        YEPActionSequencePack1 = require("tag/yep-4-action-sequence-pack-1"),
        YEPActionSequencePack2 = require("tag/yep-5-action-sequence-pack-2"),
        YEPActionSequencePack3 = require("tag/yep-6-action-sequence-pack-3"),

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
            YEPExtraEnemyDrops,
            YEPTaunt,
            YEPLimitedSkillUses,
            YEPSkillCooldowns,
            YEPInstantCast,
            YEPWeaponAnimation,
            YEPWeaponUnleash,
            YEPAutoPassiveStates,
            YEPEnemyLevels,
            YEPJobPoints,
            YEPRowFormation,
            YEPSwapEnemies,
            YEPActionSequencePack1,
            YEPActionSequencePack2,
            YEPActionSequencePack3
        ],

        tags = _.compact(_.chain(plugins)
                .map(function(p) { return p.tags; })
                .flatten()
                .value()),

        exts = _.compact(_.chain(plugins)
                .map(function (p) { return p.exts; })
                .flatten()
                .value()),

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
            if (temp) {
                // Can parse more than one tags (ex.: BasicTagArrayParser)
                if ($.isArray(temp)) {
                    _.each(temp, function (tmp) {
                        tmp.tag = t.id;
                        if (t.ext_plugin) {
                            tmp.ext_plugin = t.ext_plugin;
                            tmp.data = getExtensionsFromNoteTag(tmp);
                        }
                    });
                    results = results.concat(temp);
                } else {
                    temp.tag = t.id;
                    if (t.ext_plugin) {
                        temp.ext_plugin = t.ext_plugin;
                        temp.data = getExtensionsFromNoteTag(temp);
                    }
                    results.push(temp);
                }
            }
        });

        return results;
    },
       
    getExtensionsFromNoteTag = function (tag) {
        var results = [],
            lines = tag.data.split('\n'),
            filtered_exts = _.filter(exts, function (e) { return e.plugin == tag.ext_plugin; });

        _.each(lines, function(line, i) {
            _.each(filtered_exts, function (e) {
                var temp = e.parser.parse(e.ext, line);
                if (temp) {
                    temp.position = i;
                    temp.ext = e.id;
                    results.push(temp);
                }
            });
        });

        return results;
    },

    getSupportedPlugins = function () {
        var results = [];

        _.each(plugins, function (p) {
            results.push(new Plugin(p.name, p.longname, p.version, p.description, p.help_url));
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