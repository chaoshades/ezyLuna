define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        visualATBGaugeHtml = require('text!partialtpl/enemies/visualATBGauge.htm'),

        visualATBGaugeTpl = Handlebars.compile(visualATBGaugeHtml),
            
        SHOW_ATB_GAUGE = "Show ATB Gauge",
        HIDE_ATB_GAUGE = "Hide ATB Gauge",
        ATB_GAUGE_WIDTH = "ATB Gauge Width";


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

            this.$el.html(visualATBGaugeTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseVisualATBGauge'));

            return this;
        };

        this.renderTags = function () {
            current.atbGauge = {};

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == SHOW_ATB_GAUGE) {
                    current.atbGauge.enabled = true;
                    current.atbGauge.show = true;
                }
                else if (t.tag == HIDE_ATB_GAUGE) {
                    current.atbGauge.enabled = true;
                    current.atbGauge.hide = true;
                }
                else if (t.tag == ATB_GAUGE_WIDTH) {
                    current.atbGaugeWidth = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            if ($('#chkShowAtbGauge').is(':checked')) {
                setTag(tags, '#radShowAtbGauge', SHOW_ATB_GAUGE);
                setTag(tags, '#radHideAtbGauge', HIDE_ATB_GAUGE);
            }
            setValueTag(tags, '#chkAtbGaugeWidth', ATB_GAUGE_WIDTH, '#numAtbGaugeWidth');

            return tags;
        };

        this.initialize();

    };

});

