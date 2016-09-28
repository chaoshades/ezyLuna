define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        signedConstHtml = require('text!parsertpl/signedConst.htm'),

        signedConstTpl = Handlebars.compile(signedConstHtml);


    return function (constant_value) {

        var _constant_value = constant_value;

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tagToStringify, tagData) {
            var data = {
                "tag": tagToStringify,
                "signed_value": tagData,
                "constant_value": _constant_value
            };
            return signedConstTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\-\\+][\\d\\.]+) " + _constant_value + ">"),
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

