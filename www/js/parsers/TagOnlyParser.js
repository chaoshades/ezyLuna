define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        tagOnlyHtml = require('text!parsertpl/tagOnly.htm'),

        basicTpl = Handlebars.compile(tagOnlyHtml),
            
        regex = /^<\s{1,}>$/;


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (nt) {
            var data = {
                "tag": nt.tag
            };
            return basicTpl(data);
        };

        this.parse = function (tag) {
            var matches = tag.match(regex);
            return new NoteTag(matches[0]);
        };

        this.initialize();

    };

});

