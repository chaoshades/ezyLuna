define(function (require) {

    "use strict";

    var DEFAULT_ROUTE = "#",
        $ = require('jquery'),
        Handlebars = require('handlebars'),
        masterHtml = require('text!tpl/master.htm'),

        masterTpl = Handlebars.compile(masterHtml);


    return function (settings, page) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for nav bar buttons
            this.$el.on('click', '.navbar-nav a', function () {
                $('.navbar-nav > .active').removeClass('active');
                $(this).parent().addClass('active');
            });

        };

        this.render = function () {

            this.$el.html(masterTpl(settings));

            // Header init
            // Default route if none provided
            var hash = window.location.hash
            if (!hash)
                hash = DEFAULT_ROUTE;

            // Nav Bar menu init
            if (settings.menu) {
                // Sets specific menu link active
                if (settings.menu.active) {
                    this.setActiveMenuItem(settings.menu.active);
                }
            }

            // Page init
            this.$el.find("#contentPage").html(page);

            // Footer init

            return this;
        };

        this.clearActiveMenuItem = function () {
            this.$el.find('.navbar-nav > .active').removeClass('active');
        };

        this.setActiveMenuItem = function (hash) {
            this.clearActiveMenuItem();
            this.$el.find('.navbar-nav a[href="' + hash + '"]').parent().addClass('active');
        };

        this.initialize();

    };

});

