define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        basicTagArrayHtml = require('text!parsertpl/basicTagArray.htm'),

        basicTagArrayTpl = Handlebars.compile(basicTagArrayHtml),
            
        DELIMITER = " ";


    return function (index) {

        var _index = index;

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var tags = tagToStringify.split(DELIMITER);
            // Insert first data within tags
            tags.splice(_index, 0, _.first(tagData));

            var data = {
                "tags": tags,
                "value": _.rest(tagData)
            };
            return basicTagArrayTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var parseTags = tagToParse.split(DELIMITER);
            // Insert first data within tags
            parseTags.splice(_index, 0, "([\\w]+)");

            var regex = new RegExp("<(" + parseTags.join(DELIMITER) + "): ([\\w\\.]+)>"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1], matches[2]);

            return result;
        };

        this.initialize();

    };

});

