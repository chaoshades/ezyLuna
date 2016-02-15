define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        battleSettingsHtml = require('text!partialtpl/enemies/battleSettings.htm'),

        battleSettingsTpl = Handlebars.compile(battleSettingsHtml),
            
        REFLECT_ANIMATION_ID = "Reflect Animation ID",
        SPRITE_CANNOT_MOVE = "Sprite Cannot Move";


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

            var data = {
                'current': current,
                'animations': linked_data.animations
            };
            this.$el.html(battleSettingsTpl(data));

            // Initial Display
            openCollapse(this.$el.find('#collapseBattleSettings'));

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

        this.initialize();

    };

});

