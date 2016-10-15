define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        numericArrayHtml = require('text!parsertpl/numericArray.htm'),

        numericArrayTpl = Handlebars.compile(numericArrayHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var data = {
                "tag": tagToStringify,
                "values": tagData
            };
            return numericArrayTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\d, ]+)>", "i"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1], matches[2].split(', '));

            return result;
        };

        this.initialize();

    };

});

