﻿define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPVisualHPGauges = require("tag/yep-30-visual-hp-gauges"),
        visualHPGaugesHtml = require('text!partialtpl/enemies/visualHPGauges.htm'),

        visualHPGaugesTpl = Handlebars.compile(visualHPGaugesHtml),
            
        SHOW_HP_GAUGE = "Show HP Gauge",
        HIDE_HP_GAUGE = "Hide HP Gauge",
        HP_GAUGE_HEIGHT = "HP Gauge Height",
        HP_GAUGE_WIDTH = "HP Gauge Width",
        HP_GAUGE_BACK_COLOR = "HP Gauge Back Color",
        HP_GAUGE_COLOR_1 = "HP Gauge Color 1",
        HP_GAUGE_COLOR_2 = "HP Gauge Color 2";


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
                'plugin': YEPVisualHPGauges
            };
            this.$el.html(visualHPGaugesTpl(data));

            var partials = {
                'tooltipVisualHPGauges': new PluginTooltipPartialView(YEPVisualHPGauges)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseVisualHPGauges'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPVisualHPGauges));

            return this;
        };

        this.renderTags = function () {
            current.hpGauge = {};

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == SHOW_HP_GAUGE) {
                    current.hpGauge.enabled = true;
                    current.hpGauge.show = true;
                }
                else if (t.tag == HIDE_HP_GAUGE) {
                    current.hpGauge.enabled = true;
                    current.hpGauge.hide = true;
                }
                else if (t.tag == HP_GAUGE_HEIGHT) {
                    current.hpGaugeHeight = t.data;
                }
                else if (t.tag == HP_GAUGE_WIDTH) {
                    current.hpGaugeWidth = t.data;
                }
                else if (t.tag == HP_GAUGE_BACK_COLOR) {
                    current.hpGaugeBackColor = t.data;
                }
                else if (t.tag == HP_GAUGE_COLOR_1) {
                    current.hpGaugeColor1 = t.data;
                }
                else if (t.tag == HP_GAUGE_COLOR_2) {
                    current.hpGaugeColor2 = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            if ($('#chkShowHpGauge').is(':checked')) {
                setTag(tags, '#radShowHpGauge', SHOW_HP_GAUGE);
                setTag(tags, '#radHideHpGauge', HIDE_HP_GAUGE);
            }
            setValueTag(tags, '#chkHpGaugeHeight', HP_GAUGE_HEIGHT, '#numHpGaugeHeight');
            setValueTag(tags, '#chkHpGaugeWidth', HP_GAUGE_WIDTH, '#numHpGaugeWidth');
            setValueTag(tags, '#chkHpGaugeBackColor', HP_GAUGE_BACK_COLOR, '#numHpGaugeBackColor');
            setValueTag(tags, '#chkHpGaugeColor1', HP_GAUGE_COLOR_1, '#numHpGaugeColor1');
            setValueTag(tags, '#chkHpGaugeColor2', HP_GAUGE_COLOR_2, '#numHpGaugeColor2');

            return tags;
        };

        this.getSupportedTag = function () {
            return YEPVisualHPGauges;
        };

        this.initialize();

    };

});

