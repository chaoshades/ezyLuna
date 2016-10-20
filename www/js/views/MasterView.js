define(function (require) {

    "use strict";

    var //DEFAULT_ROUTE = "#",
        $ = require('jquery'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        masterHtml = require('text!tpl/master.htm'),

        masterTpl = Handlebars.compile(masterHtml);


    return function (settings, page) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for nav bar buttons
            this.$el.on('click', '.navbar-nav > li > a', function () {
                $('.navbar-nav > .active').removeClass('active');
                $(this).parent().addClass('active');
            });

            // Resize Event for affix if there is one
            $(window).resize(function () {
                var affix = $('.sidebar');
                if (affix)
                    $('.sidebar').affix('checkPosition');
            });

            // Click Event for ScrollUp button
            this.$el.on('click', '#btnScrollUp', function () {
                scrollUp();
                return false;
            });

            // Click Event for Quick Scroll buttons
            this.$el.on('click', '.js_SaveQuickScroll', function () {
                var selected = $('#txtQuickScroll').typeahead("getActive");
                if (selected) {
                    scrollToDiv($('#'+selected.id));
                }
            });
            this.$el.on('click', '.js_ClearQuickScroll', function () {
                $('#txtQuickScroll').val('');
            });

            // Bind custom events
            if (settings.events) {
                var container = this.$el;
                $.each(settings.events, function (i, e) {
                    container.on(e.event, e.selector, e.handler);
                });
            }
        };

        this.render = function () {

            this.$el.html(masterTpl(settings));

            // Header init
            // Default route if none provided
            //var hash = window.location.hash
            //if (!hash)
            //    hash = DEFAULT_ROUTE;

            // Nav Bar menu init
            if (settings.menu) {
                // Sets specific menu link active
                if (settings.menu.active) {
                    this.setActiveMenuItem(settings.menu.active);
                }

                if (settings.menu.quickScroll && settings.menu.quickScroll.enabled) {
                    var source = settings.menu.quickScroll.source;
                    if (source)
                        this.$el.find('#txtQuickScroll').typeahead(UIConfig.typeahead.custom(source));
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

