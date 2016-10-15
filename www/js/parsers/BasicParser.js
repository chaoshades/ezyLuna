define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        basicHtml = require('text!parsertpl/basic.htm'),

        basicTpl = Handlebars.compile(basicHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var data = {
                "tag": tagToStringify,
                "value": tagData
            };
            return basicTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\w\\.]+)>", "i"),
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

