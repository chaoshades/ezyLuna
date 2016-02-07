define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),

        parsers = [
            { tag: "Breathing", parser: new TagOnlyParser() },
            { tag: "No Breathing", parser: new TagOnlyParser() },
            { tag: "Breathing Speed", parser: new BasicParser() },
            { tag: "Breathing Rate X", parser: new BasicParser() },
            { tag: "Breathing Rate Y", parser: new BasicParser() },
            { tag: "Floating", parser: new TagOnlyParser() },
            { tag: "Floating Speed", parser: new BasicParser() },
            { tag: "Floating Height", parser: new BasicParser() }
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