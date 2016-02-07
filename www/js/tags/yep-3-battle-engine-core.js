define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),

        parsers = [
            { tag: "Reflect Animation ID", parser: new BasicParser() },
            { tag: "Sprite Cannot Move", parser: new TagOnlyParser() }
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
                var temp = p.parse(tags);
                if (temp)
                    result.push(temp);
            });

            return result;
        };

        this.initialize();

    };

});