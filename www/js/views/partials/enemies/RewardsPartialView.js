define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
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

            this.$el.html(rewardsTpl(current));

            // Initial Display
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

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

        this.initialize();

    };

});

