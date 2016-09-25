define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        activeTurnBattleSettingsHtml = require('text!partialtpl/enemies/activeTurnBattleSettings.htm'),

        activeTurnBattleSettingsTpl = Handlebars.compile(activeTurnBattleSettingsHtml),
            
        ATB_START = "ATB Start",
        ATB_TURN = "ATB Turn",
        ATB_START_2 = "ATB Start#2",
        ATB_TURN_2 = "ATB Turn#2";


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

            this.$el.html(activeTurnBattleSettingsTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseActiveTurnBattleSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == ATB_START) {
                    if (!current.atbStart) current.atbStart = {};
                    current.atbStart.unit = extractFromSignedValue(t.data);
                }
                else if (t.tag == ATB_TURN) {
                    if (!current.atbTurn) current.atbTurn = {};
                    current.atbTurn.unit = extractFromSignedValue(t.data);
                }
                else if (t.tag == ATB_START_2) {
                    if (!current.atbStart) current.atbStart = {};
                    current.atbStart.rate = extractFromSignedValue(t.data);
                }
                else if (t.tag == ATB_TURN_2) {
                    if (!current.atbTurn) current.atbTurn = {};
                    current.atbTurn.rate = extractFromSignedValue(t.data);
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setSignedValueTag(tags, '#chkAtbStart', ATB_START, '#numAtbStart');
            setSignedValueTag(tags, '#chkAtbStart', ATB_START_2, '#numAtbStartRate');
            setSignedValueTag(tags, '#chkAtbTurn', ATB_TURN, '#numAtbTurn');
            setSignedValueTag(tags, '#chkAtbTurn', ATB_TURN_2, '#numAtbTurnRate');

            return tags;
        };

        this.initialize();

    };

});

