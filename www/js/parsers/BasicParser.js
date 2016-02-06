define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        basicHtml = require('text!parsertpl/basic.htm'),

        basicTpl = Handlebars.compile(basicHtml),
            
        regex = /^<\s{1,}:\s{1,}>$/;


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (nt) {
            var data = {
                "tag": nt.tag,
                "value": nt.data
            };
            return basicTpl(data);
        };

        this.parse = function (tag) {
            var matches = tag.match(regex);
            return new NoteTag(matches[0], matches[1]);
        };

        this.initialize();

    };

});

