define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        dataAdapter = require('adapters/data'),
        ProjectInfoPartialView = require("partial/project/ProjectInfoPartialView"),
        ProjectPluginsPartialView = require("partial/project/ProjectPluginsPartialView"),
        projectAddHtml = require('text!tpl/projectAdd.htm'),

        projectAddTpl = Handlebars.compile(projectAddHtml);


    return function () {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for btnValidate button
            var wrapperReference = this.$el;
            this.$el.on('click', '#btnValidate', function () {
                $('#successUrl').hide();
                $('#errorUrl').hide();

                var project = new Project($('#txtProjectUrl').val());
                dataAdapter.setConfig(project);
                $.when(
                    dataAdapter.getSystem(),
                    dataAdapter.getPlugins()
                ).done(function (system, plugins) {
                     $('#successUrl').show();
                     project.system = system;

                     var partials = {
                         'project_info': new ProjectInfoPartialView(project),
                         'project_plugins': new ProjectPluginsPartialView(plugins)
                     }

                     // Render partial views
                     var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

                     $('#project_info').show();
                     $('#project_plugins').show();
                 })
                .fail(function () {
                    $('#errorUrl').show();

                    $('#project_info').html('').hide();
                    $('#project_plugins').html('').hide();
                });
            });

            this.$settings = {
                project: null
            };
        };

        this.render = function () {
            this.$el.html(projectAddTpl());

            // Initial Display
            this.$el.find('#successUrl').hide();
            this.$el.find('#errorUrl').hide();
            this.$el.find('#project_info').hide();
            this.$el.find('#project_plugins').hide();

            return this;
        };

        this.initialize();

    };

});

