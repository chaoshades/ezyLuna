define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        basicArrayHtml = require('text!parsertpl/basicArray.htm'),

        basicArrayTpl = Handlebars.compile(basicArrayHtml);


    return function (tag) {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (nt) {
            var data = {
                "tag": nt.tag,
                "values": nt.data
            };
            return basicArrayTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\w, ]+)>"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1], matches[2].split(', '));

            return result;
        };

        this.initialize();

    };

});

