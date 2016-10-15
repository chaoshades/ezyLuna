define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        tagOnlyHtml = require('text!parsertpl/tagOnly.htm'),

        basicTpl = Handlebars.compile(tagOnlyHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify) {
            var data = {
                "tag": tagToStringify
            };
            return basicTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + ")>", "i"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1]);

            return result;
        };

        this.initialize();

    };

});

