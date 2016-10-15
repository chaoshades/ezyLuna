define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        tagRangeExtHtml = require('text!parsertpl/tagRangeExt.htm'),

        tagRangeExtTpl = Handlebars.compile(tagRangeExtHtml);


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (extToStringify, extData) {
            var data = {
                "ext": extToStringify,
                "range": _.first(extData),
                "value": _.rest(extData)
            };
            return tagRangeExtTpl(data);
        };

        this.parse = function (extToParse, exts) {
            var regex = new RegExp("(" + extToParse + ") ([\\d]+) to ([\\d]+): ([\\w]+)", "i"),
                matches = null,
                result = null;

            matches = exts.match(regex);
            if (matches)
                result = new ExtensionTag(matches[1], _.rest(matches, 2));

            return result;
        };

        this.initialize();

    };

});

