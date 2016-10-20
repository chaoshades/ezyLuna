define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        TypeAhead = require('bootstrap-typeahead'),
        quickAccessHtml = require('text!partialtpl/quickAccess.htm'),

        quickAccessTpl = Handlebars.compile(quickAccessHtml);


    return function (source, title, label) { 

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for Quick Access buttons
            this.$el.on('click', '.js_SaveQuickAccess', function () {
                var selected = $('#txtQuickAccess').typeahead("getActive");
                if (selected) {
                    window.location.hash = selected.url;
                }
            });
            this.$el.on('click', '.js_ClearQuickAccess', function () {
                $('#txtQuickAccess').val('');
            });
        };

        this.render = function () {
            // Render view
            var data = {
                'title': title,
                'label': label
            };
            this.$el.html(quickAccessTpl(data));

            // Initial Display
            this.$el.find('#txtQuickAccess').typeahead(UIConfig.typeahead.custom(source));

            return this;
        };

        this.initialize();

    };

});

