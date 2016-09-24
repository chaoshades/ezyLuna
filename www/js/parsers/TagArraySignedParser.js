﻿define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        tagArraySignedHtml = require('text!parsertpl/tagArraySigned.htm'),

        tagArraySignedTpl = Handlebars.compile(tagArraySignedHtml),
            
        DELIMITER = " ";


    return function (index) {

        var _index = index;

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var tags = tagToStringify.split(DELIMITER);
            // Insert first data within tags
            if (_index)
                tags.splice(_index, 0, _.first(tagData));

            var data = {
                "tags": tags,
                "signed_value": (_index) ? _.rest(tagData) : tagData
            };
            return tagArraySignedTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var parseTags = tagToParse.split(DELIMITER);
            // Insert first data within tags
            if (_index)
                parseTags.splice(_index, 0, "([\\w]+)");

            var global_regex = new RegExp("<(" + parseTags.join(DELIMITER) + "): ([\\-\\+][\\d\\.]+)>", "g"),
                global_matches = null,
                result = null;

            global_matches = tags.match(global_regex);
            if (global_matches) {
                var regex = new RegExp("<(" + parseTags.join(DELIMITER) + "): ([\\-\\+][\\d\\.]+)>"),
                    matches = null;

                result = [];
                _.each(global_matches, function (m) {
                    matches = m.match(regex);
                    if (matches)
                        result.push(new NoteTag(matches[1], _.rest(matches, 2)));
                });
            }

            return result;
        };

        this.initialize();

    };

});
