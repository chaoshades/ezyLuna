define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        pluginTooltipHtml = require('text!partialtpl/pluginTooltip.htm'),

        pluginTooltipTpl = Handlebars.compile(pluginTooltipHtml);


    return function (plugin) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {

            this.$el.html(pluginTooltipTpl(plugin));

            return this;
        };

        this.initialize();

    };

});

