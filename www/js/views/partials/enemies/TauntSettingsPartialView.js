﻿define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        tauntSettingsHtml = require('text!partialtpl/enemies/tauntSettings.htm'),

        tauntSettingsTpl = Handlebars.compile(tauntSettingsHtml),
            
        PHYSICAL_TAUNT = "Physical Taunt",
        MAGICAL_TAUNT = "Magical Taunt",
        CERTAIN_TAUNT = "Certain Taunt",
        NULL_PHYSICAL_TAUNT = "Null Physical Taunt",
        NULL_MAGICAL_TAUNT = "Null Magical Taunt",
        NULL_CERTAIN_TAUNT = "Null Certain Taunt",
        IGNORE_PHYSICAL_TAUNT = "Ignore Physical Taunt",
        IGNORE_MAGICAL_TAUNT = "Ignore Magical Taunt",
        IGNORE_CERTAIN_TAUNT = "Ignore Certain Taunt";


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

            this.$el.html(tauntSettingsTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseTauntSettings'));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == PHYSICAL_TAUNT) {
                    current.physicalTaunt = true;
                }
                else if (t.tag == MAGICAL_TAUNT) {
                    current.magicalTaunt = true;
                }
                else if (t.tag == CERTAIN_TAUNT) {
                    current.certainTaunt = true;
                }
                else if (t.tag == PHYSICAL_TAUNT) {
                    current.nullPhysicalTaunt = true;
                }
                else if (t.tag == MAGICAL_TAUNT) {
                    current.nullMagicalTaunt = true;
                }
                else if (t.tag == CERTAIN_TAUNT) {
                    current.nullCertainTaunt = true;
                }
                else if (t.tag == IGNORE_PHYSICAL_TAUNT) {
                    current.ignorePhysicalTaunt = true;
                }
                else if (t.tag == IGNORE_MAGICAL_TAUNT) {
                    current.ignoreMagicalTaunt = true;
                }
                else if (t.tag == IGNORE_CERTAIN_TAUNT) {
                    current.ignoreCertainTaunt = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setTag(tags, '#chkPhysicalTaunt', PHYSICAL_TAUNT);
            setTag(tags, '#chkMagicalTaunt', MAGICAL_TAUNT);
            setTag(tags, '#chkCertainTaunt', CERTAIN_TAUNT);
            setTag(tags, '#chkNullPhysicalTaunt', NULL_PHYSICAL_TAUNT);
            setTag(tags, '#chkNullMagicalTaunt', NULL_MAGICAL_TAUNT);
            setTag(tags, '#chkNullCertainTaunt', NULL_CERTAIN_TAUNT);
            setTag(tags, '#chkIgnorePhysicalTaunt', IGNORE_PHYSICAL_TAUNT);
            setTag(tags, '#chkIgnoreMagicalTaunt', IGNORE_MAGICAL_TAUNT);
            setTag(tags, '#chkIgnoreCertainTaunt', IGNORE_CERTAIN_TAUNT);

            return tags;
        };

        this.initialize();

    };

});
