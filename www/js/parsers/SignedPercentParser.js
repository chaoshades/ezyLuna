define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        signedPercentHtml = require('text!parsertpl/signedPercent.htm'),

        signedPercentTpl = Handlebars.compile(signedPercentHtml);


    return function (tag) {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var data = {
                "tag": tagToStringify,
                "signed_value": tagData
            };
            return signedPercentTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\-\\+][\\w\\.]+)%>"),
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

