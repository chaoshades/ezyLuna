define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        BasicParser = require("parser/BasicParser"),

        parsers = [
            { tag: "hp", parser: new BasicParser() },
            { tag: "mp", parser: new BasicParser() },
            { tag: "atk", parser: new BasicParser() },
            { tag: "def", parser: new BasicParser() },
            { tag: "mat", parser: new BasicParser() },
            { tag: "mdf", parser: new BasicParser() },
            { tag: "agi", parser: new BasicParser() },
            { tag: "luk", parser: new BasicParser() },
            { tag: "exp", parser: new BasicParser() },
            { tag: "gold", parser: new BasicParser() }
        ];

    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (tags) {
            var result = "";
            $.each(tags, function (i, nt) {
                var p = _.find(parsers, function (p) { return p.tag == nt.tag; });
                if (p)
                    result += p.parser.stringify(nt) + "\n";
            });

            return result;
        };

        this.parse = function (tags) {
            var result = [];
            $.each(parsers, function (i, p) {
                var temp = p.parser.parse(p.tag, tags);
                if (temp)
                    result.push(temp);
            });

            return result;
        };

        this.initialize();

    };

});