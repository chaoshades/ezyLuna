define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPArmorScaling = require("tag/yep-33-armor-scaling"),
        armorScalingHtml = require('text!partialtpl/enemies/armorScaling.htm'),

        armorScalingTpl = Handlebars.compile(armorScalingHtml),
            
        BYPASS_ARMOR_SCALING = "Bypass Armor Scaling",
        PHYSICAL_ARMOR_REDUCTION = "Physical Armor Reduction",
        MAGICAL_ARMOR_REDUCTION = "Magical Armor Reduction",
        CERTAIN_ARMOR_REDUCTION = "Certain Armor Reduction",
        PHYSICAL_ARMOR_REDUCTION_2 = "Physical Armor Reduction#2",
        MAGICAL_ARMOR_REDUCTION_2 = "Magical Armor Reduction#2",
        CERTAIN_ARMOR_REDUCTION_2 = "Certain Armor Reduction#2";


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
                'plugin': YEPArmorScaling
            };
            this.$el.html(armorScalingTpl(data));

            var partials = {
                'tooltipArmorScaling': new PluginTooltipPartialView(YEPArmorScaling)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseArmorScaling'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPArmorScaling));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == BYPASS_ARMOR_SCALING) {
                    current.bypassArmorScaling = true;
                }
                else if (t.tag == PHYSICAL_ARMOR_REDUCTION) {
                    if (!current.physicalArmorReduction) current.physicalArmorReduction = {};
                    current.physicalArmorReduction.unit = t.data;
                }
                else if (t.tag == MAGICAL_ARMOR_REDUCTION) {
                    if (!current.magicalArmorReduction) current.magicalArmorReduction = {};
                    current.magicalArmorReduction.unit = t.data;
                }
                else if (t.tag == CERTAIN_ARMOR_REDUCTION) {
                    if (!current.certainArmorReduction) current.certainArmorReduction = {};
                    current.certainArmorReduction.unit = t.data;
                }
                else if (t.tag == PHYSICAL_ARMOR_REDUCTION_2) {
                    if (!current.physicalArmorReduction) current.physicalArmorReduction = {};
                    current.physicalArmorReduction.rate = t.data;
                }
                else if (t.tag == MAGICAL_ARMOR_REDUCTION_2) {
                    if (!current.magicalArmorReduction) current.magicalArmorReduction = {};
                    current.magicalArmorReduction.rate = t.data;
                }
                else if (t.tag == CERTAIN_ARMOR_REDUCTION_2) {
                    if (!current.certainArmorReduction) current.certainArmorReduction = {};
                    current.certainArmorReduction.rate = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setTag(tags, '#chkBypassArmorScaling', BYPASS_ARMOR_SCALING);
            setValueTag(tags, '#chkPhysicalArmorReduction', PHYSICAL_ARMOR_REDUCTION, '#numPhysicalArmorReduction');
            setValueTag(tags, '#chkPhysicalArmorReduction', PHYSICAL_ARMOR_REDUCTION_2, '#numPhysicalArmorReductionRate');
            setValueTag(tags, '#chkMagicalArmorReduction', MAGICAL_ARMOR_REDUCTION, '#numMagicalArmorReduction');
            setValueTag(tags, '#chkMagicalArmorReduction', MAGICAL_ARMOR_REDUCTION_2, '#numMagicalArmorReductionRate');
            setValueTag(tags, '#chkCertainArmorReduction', CERTAIN_ARMOR_REDUCTION, '#numCertainArmorReduction');
            setValueTag(tags, '#chkCertainArmorReduction', CERTAIN_ARMOR_REDUCTION_2, '#numCertainArmorReductionRate');

            return tags;
        };

        this.getSupportedTag = function () {
            return YEPArmorScaling;
        };

        this.initialize();

    };

});

