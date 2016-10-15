define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        tagExtensionHtml = require('text!parsertpl/tagExtension.htm'),

        tagExtensionTpl = Handlebars.compile(tagExtensionHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var data = {
                "tag": tagToStringify,
                "exts": tagData
            };
            return tagExtensionTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + ")>([^<]+?)</(" + tagToParse + ")>", "i"),
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

