define(function (require) {

    "use strict";

    var YEPCoreTags = require("tag/yep-1-core-engine"),

        tags = [
            new YEPCoreTags()
        ],

    getStringFromNoteTags = function (notetags) {
        var deferred = $.Deferred(),
            result = "";

        $.each(tags, function (i, t) {
            var temp = t.stringify(notetags);
            if (temp)
                result += temp + "\n";
        });

        deferred.resolve(result);

        return deferred.promise();
    },
        
    getNoteTagsFromString = function (notetags) {
        var deferred = $.Deferred(),
            results = [];

        $.each(tags, function (i, t) {
            var temp = t.parse(notetags);
            if (temp)
                results.push(temp);
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