define(function (require) {

    "use strict";

    var STATE_KEY = "enemy_levels",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        enemyLevelsHtml = require('text!partialtpl/enemies/enemyLevels.htm'),

        enemyLevelsTpl = Handlebars.compile(enemyLevelsHtml),
            
        //TODO
        SKILL_REQUIRE_LEVEL = "Skill Require Level";


    return function (current, linked_data, $stateManager) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            var getStateManagerCallback = this.getStateManager;
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);

                var id = $(this).attr('id'),
                    dataSelector = null;
                if (id === 'chkSkillRequireLevel')
                    dataSelector = 'skillRequireLevel';

                var state_data = getStateManagerCallback().getState(STATE_KEY).data;
                state_data[dataSelector].enabled = $(this).is(':checked');
                getStateManagerCallback().setState(STATE_KEY, state_data);
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

            var templateSets = [
                new InlineEditTableTemplateSet($(enemyLevelsHtml),"#tplSkillRequireLevel")
            ];
            var templateInfos = {};

            // Register partials for every template in template sets
            _.each(templateSets, function (set) {
                _.each(set.templates, function(t) {
                    Handlebars.registerPartial(t.name, t.template);
                });
                templateInfos[set.setID] = new InlineEditTableTemplateInfo(set);
            });

            var partials = {
                'skill_require_level': new InlineEditTablePartialView(data, templateInfos["tplSkillRequireLevel"], $stateManager, STATE_KEY, "skillRequireLevel", this.saveSkillRequireLevel)
            }

            this.$el.html(enemyLevelsTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseEnemyLevels'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            current.skillRequireLevel = {}
            current.skillRequireLevel.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                // TODO
                if (t.tag == SKILL_REQUIRE_LEVEL) {
                    current.skillRequireLevel.enabled = true;

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.skillRequireLevel.list.push({
                        skillID: t.data[0],
                        skill: skill.name,
                        level: t.data[1]
                    });
                }
            });

            var data = {
                'skillRequireLevel': new InlineEditTableDataInfo(current.skillRequireLevel.enabled, current.skillRequireLevel.list)
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            // TODO
            if (state_data['skillRequireLevel'].enabled) {
                _.each(state_data['skillRequireLevel'].data, function (item) { tags.push(new NoteTag(SKILL_REQUIRE_LEVEL, [item.skillID, item.level])); });
            }

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveSkillRequireLevel = function (item) {
            var skillID = $('#ddlSkillRequireLevel').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            item.skillID = skillID,
            item.skill = skill.name,
            item.level = $('#numSkillRequireLevel').val()
        };

        this.initialize();

    };

});

