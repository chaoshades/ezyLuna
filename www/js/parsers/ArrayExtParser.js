define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        arrayExtHtml = require('text!parsertpl/arrayExt.htm'),

        arrayExtTpl = Handlebars.compile(arrayExtHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (extToStringify, extData) {
            var data = {
                "ext": extToStringify,
                "values": extData
            };
            return arrayExtTpl(data);
        };

        this.parse = function (extToParse, exts) {
            var regex = new RegExp("(" + extToParse + "): ([\\w, ]+)", "i"),
                matches = null,
                result = null;

            matches = exts.match(regex);
            if (matches)
                result = new ExtensionTag(matches[1], matches[2].split(', '));

            return result;
        };

        this.initialize();

    };

});

