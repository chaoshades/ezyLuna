define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPCoreEngine = require("tag/yep-1-core-engine"),
        rewardsHtml = require('text!partialtpl/enemies/rewards.htm'),

        rewardsTpl = Handlebars.compile(rewardsHtml),
            
        EXP = "exp",
        GOLD = "gold";


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

            var data = {
                'current': current,
                'plugin': YEPCoreEngine
            };
            this.$el.html(rewardsTpl(data));

            var partials = {
                'tooltipRewards': new PluginTooltipPartialView(YEPCoreEngine)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPCoreEngine));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == EXP) {
                    current.overrideexp = true;
                    current.exp = t.data;
                }
                else if (t.tag == GOLD) {
                    current.overridegold = true;
                    current.gold = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];

            setValueTag(tags, '#chkExp', EXP, '#numExp');
            setValueTag(tags, '#chkGold', GOLD, '#numGold');

            return tags;
        };

        this.getSupportedTag = function () {
            return YEPCoreEngine;
        };

        this.initialize();

    };

});

