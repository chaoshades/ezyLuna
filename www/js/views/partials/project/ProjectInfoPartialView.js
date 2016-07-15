define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        projectInfoHtml = require('text!partialtpl/project/projectInfo.htm'),

        projectInfoTpl = Handlebars.compile(projectInfoHtml);


    return function (project) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {
            this.$el.html(projectInfoTpl(project));

            return this;
        };

        this.initialize();

    };

});

