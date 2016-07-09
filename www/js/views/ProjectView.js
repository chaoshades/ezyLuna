define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        projectHtml = require('text!tpl/project.htm'),

        projectTpl = Handlebars.compile(projectHtml);


    return function (project, system) {

        var base_url = "#project/" + project.id

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            this.$settings = {
                menu: {
                    active: base_url
                },
                project: project
            };
        };

        this.render = function () {
            system.url = project.url;

            var data = {
                'project': project,
                'system': system
            };

            this.$el.html(projectTpl(data));
            return this;
        };

        this.initialize();

    };

});

