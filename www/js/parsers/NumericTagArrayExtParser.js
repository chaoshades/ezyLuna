define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        numericTagArrayExtHtml = require('text!parsertpl/numericTagArrayExt.htm'),

        numericTagArrayExtTpl = Handlebars.compile(numericTagArrayExtHtml),
            
        DELIMITER = " ",
        VAL_DELIMITER = ", ";


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (extToStringify, extData) {
            var exts = extToStringify.split(DELIMITER);
            // Add first data within exts
            var i = 0;
            _.each(_.first(extData), function (d) {
                if (i > 0)
                    d = VAL_DELIMITER + d;
                exts.push(d);
                i++;
            });

            var data = {
                "exts": exts,
                "values": _.rest(extData)
            };
            return numericTagArrayExtTpl(data);
        };

        this.parse = function (extToParse, exts) {
            var regex = new RegExp("(" + extToParse + ") ([\\d, ]+): ([\\w, ]+)", "i"),
                matches = null,
                result = null;

            matches = exts.match(regex);
            if (matches)
                result = new ExtensionTag(matches[1], [matches[2].split(VAL_DELIMITER), matches[3].split(VAL_DELIMITER)]);

            return result;
        };

        this.initialize();

    };

});

