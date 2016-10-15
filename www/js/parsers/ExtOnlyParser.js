define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        extOnlyHtml = require('text!parsertpl/extOnly.htm'),

        basicTpl = Handlebars.compile(extOnlyHtml);


    return function () {

        this.initialize = function () {ExtensionTag
            // Nothing to do
        };

        this.stringify = function (extToStringify) {
            var data = {
                "ext": extToStringify
            };
            return basicTpl(data);
        };

        this.parse = function (extToParse, exts) {
            var regex = new RegExp("(" + extToParse + ")", "i"),
                matches = null,
                result = null;

            matches = exts.match(regex);
            if (matches)
                result = new ExtensionTag(matches[1]);

            return result;
        };

        this.initialize();

    };

});

