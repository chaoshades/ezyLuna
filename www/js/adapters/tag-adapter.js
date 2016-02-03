define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        dataAdapter = require('adapters/data'),
        StatParser = require("tag/StatParser"),

        parsers = [
            { tag: "hp", parser: new StatParser() },
            { tag: "mp", parser: new StatParser() },
            { tag: "atk", parser: new StatParser() },
            { tag: "def", parser: new StatParser() },
            { tag: "mat", parser: new StatParser() },
            { tag: "mdf", parser: new StatParser() },
            { tag: "agi", parser: new StatParser() },
            { tag: "luk", parser: new StatParser() }
        ],

    stringify = function (tags) {
        var result = "";
        $.each(tags, function (i, nt) {
            var p = _.find(parsers,  function (p) { return p.tag == nt.tag; });
            result += p.parser.stringify(nt) + "\n";
        });
        
        return result;
    },
        
    parse = function (tags) {
        var result = [];
        $.each(parsers, function (i, p) {
            var temp = p.parse(tags);
            if (temp)
                result.push(temp);
        });

        return result;
    };

    // The public API
    return {
        stringify: stringify,
        parse: parse
    };

});