define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        basicPercentHtml = require('text!parsertpl/basicPercent.htm'),

        basicPercentTpl = Handlebars.compile(basicPercentHtml);


    return function (tag) {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (nt) {
            var data = {
                "tag": nt.tag,
                "value": nt.data
            };
            return basicPercentTpl(data);
        };

        this.parse = function (tagToParse, tags) {
            var regex = new RegExp("<(" + tagToParse + "): ([\\w\\.]+)%>"),
                matches = null,
                result = null;

            matches = tags.match(regex);
            if (matches)
                result = new NoteTag(matches[1], matches[2]);

            return result;
        };

        this.initialize();

    };

});

