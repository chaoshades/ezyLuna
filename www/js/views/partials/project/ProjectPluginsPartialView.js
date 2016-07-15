define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        projectPluginsHtml = require('text!partialtpl/project/projectPlugins.htm'),

        projectPluginsTpl = Handlebars.compile(projectPluginsHtml);


    return function (plugins) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {
            this.$el.html(projectPluginsTpl(plugins));

            return this;
        };

        this.initialize();

    };

});

