define(function (require) {

    "use strict";

    var YEPCoreEngineTags = require("tag/yep-1-core-engine"),
        YEPBattleEngineCoreTags = require("tag/yep-3-battle-engine-core"),
        YEPAnimatedSideViewEnemiesTags = require("tag/yep-44-animated-sideview-enemies"),

        tags = [
            new YEPCoreEngineTags(),
            new YEPBattleEngineCoreTags(),
            new YEPAnimatedSideViewEnemiesTags()
        ],

    getStringFromNoteTags = function (notetags) {
        var deferred = $.Deferred(),
            result = "";

        $.each(tags, function (i, t) {
            var temp = t.stringify(notetags);
            if (temp)
                result += temp;
        });

        deferred.resolve(result.trim());

        return deferred.promise();
    },
        
    getNoteTagsFromString = function (notetags) {
        var deferred = $.Deferred(),
            results = [];

        $.each(tags, function (i, t) {
            var temp = t.parse(notetags);
            if (temp)
                results = results.concat(temp);
        });

        deferred.resolve(results);

        return deferred.promise();
    };

    // The public API
    return {
        getStringFromNoteTags: getStringFromNoteTags,
        getNoteTagsFromString: getNoteTagsFromString
    };

});