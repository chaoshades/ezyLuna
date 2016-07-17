define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        FileInput = require('file-input'),
        homeHtml = require('text!tpl/home.htm'),

        homeTpl = Handlebars.compile(homeHtml);


    return function (projects) {

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

            // Click Event for btnAddProject button
            this.$el.on('click', '#btnAddProject', function () {
                window.location.hash = "#project/add"
            });

            // Change event for ImportConfig file input
            this.$el.on('change', '#btnImportConfig', function () {
                var reader = new FileReader(),
                    file = _.first(this.files);

                reader.onload = function (event) {
                    var result = event.target.result;
                    
                    // TODO : Import config
                }

                reader.readAsText(file)
            });

            this.$settings = {
                project: null
            };
        };

        this.render = function () {
            this.$el.html(homeTpl(projects));

            // Initial Display
            this.$el.find("#btnImportConfig").fileinput({
                showPreview: false,
                showCancel: false,
                showClose: false,
                showUpload: false,
                showUploadedThumbs: false,
                browseIcon: '<span class="glyphicon glyphicon-upload"></span>',
                browseLabel: 'Import config',
                removeIcon: '<span class="glyphicon glyphicon-trash"></span>',
                removeLabel: 'Clear',
            });

            return this;
        };

        this.initialize();

    };

});

