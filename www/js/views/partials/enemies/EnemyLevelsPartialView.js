define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        TablePagerPartialView = require("partial/TablePagerPartialView"),
        enemyLevelsHtml = require('text!partialtpl/enemies/enemyLevels.htm'),

        enemyLevelsTpl = Handlebars.compile(enemyLevelsHtml),
            
        //TODO
        SKILL_REQUIRE_LEVEL = "Skill Require Level";


    return function (current, linked_data) {

        var pager = null;

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

            pager = new TablePagerPartialView(current.skillRequireLevel.list, 4);

            var data = {
                'current': current,
                'skills': linked_data.skills,
            };
            this.$el.html(enemyLevelsTpl(data));

            // Initial Display
            openCollapse(this.$el.find('#collapseEnemyLevels'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            // Render pager
            this.$el.find('#pgSkillRequiredLevel').html(pager.render().$el);

            pager.setTableReference(this.$el.find('#tblSkillRequiredLevel'));

            return this;
        };

        this.renderTags = function () {
            current.skillRequireLevel = {}

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                // TODO
                if (t.tag == SKILL_REQUIRE_LEVEL) {
                    current.skillRequireLevel.enabled = true;
                    if (!current.skillRequireLevel.list) current.skillRequireLevel.list = [{ edit: true }];

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.skillRequireLevel.list.push({
                        edit: (t.data[0] == 2),
                        deleting: (t.data[0] == 3),
                        skillID: t.data[0],
                        skill: skill.name,
                        level: t.data[1]
                    });
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

