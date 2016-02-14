﻿define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        coordHtml = require('text!parsertpl/coord.htm'),

        coordTpl = Handlebars.compile(coordHtml);


    return function (tag) {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (nt) {
            var data = {
                "tag": nt.tag,
                "values": nt.data
            };
            return coordTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\d]+).([\\d]+)>"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1], [matches[2], matches[3]]);

            return result;
        };

        this.initialize();

    };

});
