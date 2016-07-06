define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        damageSettingsHtml = require('text!partialtpl/enemies/damageSettings.htm'),

        damageSettingsTpl = Handlebars.compile(damageSettingsHtml),
            
        BYPASS_DAMAGE_CAP = "Bypass Damage Cap";


    return function (current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for checkboxes that enables tags
            this.$el.on('click', '.js_Tags', function () {
                enableInputs(this);
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            this.$el.html(damageSettingsTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseDamageSettings'));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == BYPASS_DAMAGE_CAP) {
                    current.bypassDamageCap = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setTag(tags, '#chkBypassDamageCap', BYPASS_DAMAGE_CAP);

            return tags;
        };

        this.initialize();

    };

});

