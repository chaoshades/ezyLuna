define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPDamageCore = require("tag/yep-25-damage-core"),
        damageSettingsHtml = require('text!partialtpl/enemies/damageSettings.htm'),

        damageSettingsTpl = Handlebars.compile(damageSettingsHtml),
            
        BYPASS_DAMAGE_CAP = "Bypass Damage Cap";


    return function (current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            this.$el.html(damageSettingsTpl(current));

            var partials = {
                'tooltipDamageSettings': new PluginTooltipPartialView(YEPDamageCore)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseDamageSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPDamageCore));

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

