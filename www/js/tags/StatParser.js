define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        statHtml = require('text!tagtpl/stat.htm'),

        statTpl = Handlebars.compile(statHtml),
            
        regex = /^<\s{1,}:\s{1,}>$/;


    return function () {

        this.initialize = function () {
            // Nothing to do
        };

        this.stringify = function (nt) {
            var data = {
                "stat": nt.tag,
                "value": nt.data
            };
            return statTpl(data);
        };

        this.parse = function (tag) {
            var matches = tag.match(regex);
            return {"tag": matches[0], "data": matches[1]};
        };

        this.initialize();

    };

});

