define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        battleSettingsHtml = require('text!partialtpl/enemies/battleSettings.htm'),

        battleSettingsTpl = Handlebars.compile(battleSettingsHtml);


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
            }
            this.$el.html(battleSettingsTpl(data));

            return this;
        };

        this.renderTags = function () {
            current.overrideparams = _.range(8).map(function () { return false });

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == "Reflect Animation ID") {
                    current.reflectAnimationID = t.data;
                }
                else if (t.tag == "Sprite Cannot Move") {
                    current.spriteCannotMove = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkReflectAnimation', 'Reflect Animation ID', '#ddlReflectAnimation');
            setTag(tags, '#chkSpriteCannotMove', 'Sprite Cannot Move');

            return tags;
        };

        this.initialize();

    };

});

