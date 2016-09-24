define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        rangeHtml = require('text!parsertpl/range.htm'),

        rangeTpl = Handlebars.compile(rangeHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var data = {
                "tag": tagToStringify,
                "values": tagData
            };
            return rangeTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\d]+) to ([\\d]+)>"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1], [matches[2], matches[3]]);

            return result;
        };

        this.initialize();

    };

});

