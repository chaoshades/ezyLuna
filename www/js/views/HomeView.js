define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        homeHtml = require('text!tpl/home.htm'),

        homeTpl = Handlebars.compile(homeHtml);


    return function (err) {

        var errormsg = {}

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

        };

        this.render = function () {
            this.$el.html(homeTpl());
            return this;
        };

        this.initialize();

    };

});

