define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPBattleSystemChargeTurnBattle = require("tag/yep-38-battle-system-charge-turn-battle"),
        chargeTurnBattleSettingsHtml = require('text!partialtpl/enemies/chargeTurnBattleSettings.htm'),

        chargeTurnBattleSettingsTpl = Handlebars.compile(chargeTurnBattleSettingsHtml),
            
        CTB_ICON = "CTB Icon",
        CTB_BORDER_COLOR = "CTB Border Color",
        CTB_BACKGROUND_COLOR = "CTB Background Color";


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

            this.$el.html(chargeTurnBattleSettingsTpl(current));

            var partials = {
                'tooltipChargeTurnBattleSettings': new PluginTooltipPartialView(YEPBattleSystemChargeTurnBattle)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseChargeTurnBattleSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPBattleSystemChargeTurnBattle));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == CTB_ICON) {
                    current.ctbIcon = t.data;
                }
                else if (t.tag == CTB_BORDER_COLOR) {
                    current.ctbBorderColor = t.data;
                }
                else if (t.tag == CTB_BACKGROUND_COLOR) {
                    current.ctbBackgroundColor = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkCtbIcon', CTB_ICON, '#numCtbIcon');
            setValueTag(tags, '#chkCtbBorderColor', CTB_BORDER_COLOR, '#numCtbBorderColor');
            setValueTag(tags, '#chkCtbBackgroundColor', CTB_BACKGROUND_COLOR, '#numCtbBackgroundColor');

            return tags;
        };

        this.initialize();

    };

});

