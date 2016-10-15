define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        basicExtHtml = require('text!parsertpl/basicExt.htm'),

        basicExtTpl = Handlebars.compile(basicExtHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (extToStringify, extData) {
            var data = {
                "ext": extToStringify,
                "value": extData
            };
            return basicExtTpl(data);
        };

        this.parse = function (extToParse, exts) {
            var regex = new RegExp("(" + extToParse + "): ([\\w\\.]+)", "i"),
                matches = null,
                result = null;

            matches = exts.match(regex);
            if (matches)
                result = new ExtensionTag(matches[1], matches[2]);

            return result;
        };

        this.initialize();

    };

});

