define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        activeTurnBattleSettingsHtml = require('text!partialtpl/enemies/activeTurnBattleSettings.htm'),

        activeTurnBattleSettingsTpl = Handlebars.compile(activeTurnBattleSettingsHtml),
            
        ATB_START = "ATB Start",
        ATB_TURN = "ATB Turn",
        ATB_START_2 = "ATB Start#2",
        ATB_TURN_2 = "ATB Turn#2";


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

            this.$el.html(activeTurnBattleSettingsTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseActiveTurnBattleSettings'));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == ATB_START) {
                    if (!current.atbStart) current.atbStart = {};
                    current.atbStart.unit = t.data.replace('+', '');
                }
                else if (t.tag == ATB_TURN) {
                    if (!current.atbTurn) current.atbTurn = {};
                    current.atbTurn.unit = t.data.replace('+', '');
                }
                else if (t.tag == ATB_START_2) {
                    if (!current.atbStart) current.atbStart = {};
                    current.atbStart.rate = t.data.replace('+', '');
                }
                else if (t.tag == ATB_TURN_2) {
                    if (!current.atbTurn) current.atbTurn = {};
                    current.atbTurn.rate = t.data.replace('+', '');
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

