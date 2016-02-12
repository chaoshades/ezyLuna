define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        animatedSideViewSettingsHtml = require('text!partialtpl/enemies/animatedSideViewSettings.htm'),

        animatedSideViewSettingsTpl = Handlebars.compile(animatedSideViewSettingsHtml);


    return function (current, linked_data) {

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

            this.$el.html(animatedSideViewSettingsTpl(current));

            return this;
        };

        this.renderTags = function () {
            current.breathing = {};
            current.floating = {};

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == "Breathing") {
                    current.breathing.enabled = true;
                    current.breathing.yes = true;
                }
                else if (t.tag == "No Breathing") {
                    current.breathing.enabled = true;
                    current.breathing.no = true;
                }
                else if (t.tag == "Breathing Speed") {
                    current.breathing.speed = t.data;
                }
                else if (t.tag == "Breathing Rate X") {
                    current.breathing.rateX = t.data * 100;
                }
                else if (t.tag == "Breathing Rate Y") {
                    current.breathing.rateY = t.data * 100;
                }

                if (t.tag == "Floating") {
                    current.floating.enabled = true;
                }
                else if (t.tag == "Floating Speed") {
                    current.floating.speed = t.data;
                }
                else if (t.tag == "Floating Height") {
                    current.floating.height = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            if ($('#chkBreathing').is(':checked')) {
                setTag(tags, '#radBreathing', 'Breathing');
                setTag(tags, '#radNoBreathing', 'No Breathing');
            }
            setValueTag(tags, '#chkBreathingSpeed', 'Breathing Speed', '#numBreathingSpeed');
            setPercentValueTag(tags, '#chkBreathingRateX', 'Breathing Rate X', '#numBreathingRateX');
            setPercentValueTag(tags, '#chkBreathingRateY', 'Breathing Rate Y', '#numBreathingRateY');

            setTag(tags, '#chkFloating', 'Floating');
            setValueTag(tags, '#chkFloatingSpeed', 'Floating Speed', '#numFloatingSpeed');
            setValueTag(tags, '#chkFloatingHeight', 'Floating Height', '#numFloatingHeight');

            return tags;
        };

        this.initialize();

    };

});

