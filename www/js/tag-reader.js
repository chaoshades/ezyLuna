define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        YEPCoreEngineTags = require("tag/yep-1-core-engine"),
        YEPBattleEngineCoreTags = require("tag/yep-3-battle-engine-core"),
        YEPAnimatedSideViewEnemiesTags = require("tag/yep-44-animated-sideview-enemies"),
        YEPBattleSystemActiveTurnBattleTags = require("tag/yep-24-battle-system-active-turn-battle"),
        YEPVisualATBGaugeTags = require("tag/yep-31-visual-atb-gauge"),

        tags = _.flatten([
            YEPCoreEngineTags,
            YEPBattleEngineCoreTags,
            YEPAnimatedSideViewEnemiesTags,
            YEPBattleSystemActiveTurnBattleTags,
            YEPVisualATBGaugeTags
        ]),

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
    };

    // The public API
    return {
        getStringFromNoteTags: getStringFromNoteTags,
        getNoteTagsFromString: getNoteTagsFromString
    };

});