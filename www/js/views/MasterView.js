define(function (require) {

    "use strict";

    var DEFAULT_ROUTE = "#",
        $ = require('jquery'),
        Handlebars = require('handlebars'),
        masterHtml = require('text!tpl/master.htm'),

        masterTpl = Handlebars.compile(masterHtml);


    return function (page) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for sidebar buttons
            this.$el.on('click', '.navbar-nav a', function () {
                $('.navbar-nav > .active').removeClass('active');
                $(this).parent().addClass('active');
            });

        };

        this.render = function () {

            this.$el.html(masterTpl());

            // Header init
            // Default route if none provided
            var hash = window.location.hash
            if (!hash)
                hash = DEFAULT_ROUTE;

            // Remove args to select active menu item
            var argsIndex = hash.indexOf("/");
            if (argsIndex > -1)
                hash = hash.substr(0, argsIndex);

            this.setActiveMenuItem(hash);

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

