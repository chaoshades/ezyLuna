define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        enemyLevelsHtml = require('text!partialtpl/enemies/enemyLevels.htm'),

        enemyLevelsTpl = Handlebars.compile(enemyLevelsHtml),
            
        //TODO
        SKILL_REQUIRE_LEVEL = "Skill Require Level";


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
                'skills': linked_data.skills,
            };
            this.$el.html(enemyLevelsTpl(data));

            // Initial Display
            openCollapse(this.$el.find('#collapseEnemyLevels'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            current.skillRequireLevel = {}

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                // TODO
                if (t.tag == SKILL_REQUIRE_LEVEL) {
                    current.skillRequireLevel.enabled = true
                    current.skillRequireLevel.skillID = t.data[0];
                    current.skillRequireLevel.lvl = t.data[1];
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            // TODO
            setValuesTag(tags, '#chkSkillRequireLevel', SKILL_REQUIRE_LEVEL, ['#ddlSkillRequireLevel', '#numSkillRequireLevel']);

            return tags;
        };

        this.initialize();

    };

});

