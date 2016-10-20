define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPBattleEngineCore = require("tag/yep-3-battle-engine-core"),
        battleSettingsHtml = require('text!partialtpl/enemies/battleSettings.htm'),

        battleSettingsTpl = Handlebars.compile(battleSettingsHtml),
            
        REFLECT_ANIMATION_ID = "Reflect Animation ID",
        SPRITE_CANNOT_MOVE = "Sprite Cannot Move";


    return function (current, linked_data) {

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
                'plugin': YEPBattleEngineCore,
                'animations': linked_data.animations
            };
            this.$el.html(battleSettingsTpl(data));

            var partials = {
                'tooltipBattleSettings': new PluginTooltipPartialView(YEPBattleEngineCore)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseBattleSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPBattleEngineCore));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == REFLECT_ANIMATION_ID) {
                    current.reflectAnimationID = t.data;
                }
                else if (t.tag == SPRITE_CANNOT_MOVE) {
                    current.spriteCannotMove = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkReflectAnimation', REFLECT_ANIMATION_ID, '#ddlReflectAnimation');
            setTag(tags, '#chkSpriteCannotMove', SPRITE_CANNOT_MOVE);

            return tags;
        };

        this.getSupportedTag = function () {
            return YEPBattleEngineCore;
        };

        this.initialize();

    };

});

