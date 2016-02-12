define(function (require) {

    "use strict";

    var YEPCoreEngineTags = require("tag/yep-1-core-engine"),
        YEPBattleEngineCoreTags = require("tag/yep-3-battle-engine-core"),
        YEPAnimatedSideViewEnemiesTags = require("tag/yep-44-animated-sideview-enemies"),

        tags = _.flatten([
            YEPCoreEngineTags,
            YEPBattleEngineCoreTags,
            YEPAnimatedSideViewEnemiesTags
        ]),

    getStringFromNoteTags = function (notetags) {
        var result = "";

        $.each(notetags, function (i, nt) {
            var temp = _.find(tags, function (t) { return t.tag == nt.tag; });
            if (temp)
                result += temp.parser.stringify(nt) + "\n";
        });

        return result.trim();
    },

    getNoteTagsFromString = function (notetags) {
        var results = [];

        $.each(tags, function (i, t) {
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