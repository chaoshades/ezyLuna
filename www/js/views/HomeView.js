define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        homeHtml = require('text!tpl/home.htm'),

        homeTpl = Handlebars.compile(homeHtml);


    return function (projects) {

        var errormsg = {}

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for ExportConfig button
            this.$el.on('click', '#btnExportConfig', function () {
                var config = {
                    "projects": [
                        {"path": "file:///C:/Program Files/RPG Making/RPG Maker MV/Projects/Project1", "show_all_plugins": true},
                        {"path": "file:///C:/Program Files/RPG Making/RPG Maker MV/Projects/Project1", "show_all_plugins": false}
                    ]
                }
                download("config.json", JSON.stringify(config));
            });
        };

        this.render = function () {
            this.$el.html(homeTpl(projects));
            return this;
        };

        this.initialize();

    };

});

