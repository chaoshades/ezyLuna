define(function (require) {

    "use strict";

    var STATE_KEY = "skill_cooldowns",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        skillCooldownsHtml = require('text!partialtpl/enemies/skillCooldowns.htm'),

        skillCooldownsTpl = Handlebars.compile(skillCooldownsHtml),

        //TODO
        SKILL_COOLDOWN_DURATION = "Skill Cooldown Duration",
        STYPE_COOLDOWN_DURATION = "SType Cooldown Duration",
        GLOBAL_COOLDOWN_DURATION = "Global Cooldown Duration",
        SKILL_COOLDOWN_RATE = "Skill Cooldown Rate",
        STYPE_COOLDOWN_RATE = "SType Cooldown Rate",
        GLOBAL_COOLDOWN_RATE = "Global Cooldown Rate",
        SKILL_COOLDOWN_RATE = "Skill Cooldown Rate",
        STYPE_COOLDOWN_RATE = "SType Cooldown Rate",
        GLOBAL_COOLDOWN_RATE = "Global Cooldown Rate";

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
                if (id === 'chkSkillCooldownDuration')
                    dataSelector = 'skillCooldownDuration';
                else if (id === 'chkSkillTypeCooldownDuration')
                    dataSelector = 'skillTypeCooldownDuration';
                else if (id === 'chkSkillCooldownRate')
                    dataSelector = 'skillCooldownRate';
                else if (id === 'chkSkillTypeCooldownRate')
                    dataSelector = 'skillTypeCooldownRate';

                if (dataSelector) {
                    var state_data = getStateManagerCallback().getState(STATE_KEY).data;
                    state_data[dataSelector].enabled = $(this).is(':checked');
                    getStateManagerCallback().setState(STATE_KEY, state_data);
                }
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'skillTypes': _.map(_.compact(linked_data.types.skillTypes), function (t, i) { return { id: i+1, name: t } }),
                'skills': linked_data.skills
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(skillCooldownsHtml), "#tplSkillCooldownDuration"),
                new InlineEditTableTemplateSet($(skillCooldownsHtml), "#tplSkillTypeCooldownDuration"),
                new InlineEditTableTemplateSet($(skillCooldownsHtml), "#tplSkillCooldownRate"),
                new InlineEditTableTemplateSet($(skillCooldownsHtml), "#tplSkillTypeCooldownRate")
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
                'skill_cooldown_duration': new InlineEditTablePartialView(data, templateInfos["tplSkillCooldownDuration"], $stateManager, STATE_KEY, "skillCooldownDuration", this.saveSkillCooldownDuration),
                'skill_type_cooldown_duration': new InlineEditTablePartialView(data, templateInfos["tplSkillTypeCooldownDuration"], $stateManager, STATE_KEY, "skillTypeCooldownDuration", this.saveSkillTypeCooldownDuration),
                'skill_cooldown_rate': new InlineEditTablePartialView(data, templateInfos["tplSkillCooldownRate"], $stateManager, STATE_KEY, "skillCooldownRate", this.saveSkillCooldownRate),
                'skill_type_cooldown_rate': new InlineEditTablePartialView(data, templateInfos["tplSkillTypeCooldownRate"], $stateManager, STATE_KEY, "skillTypeCooldownRate", this.saveSkillTypeCooldownRate)
            }

            this.$el.html(skillCooldownsTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseSkillCooldowns'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            current.skillCooldownDuration = {};
            current.skillCooldownDuration.list = [];
            current.skillTypeCooldownDuration = {};
            current.skillTypeCooldownDuration.list = [];
            current.skillCooldownRate = {};
            current.skillCooldownRate.list = [];
            current.skillTypeCooldownRate = {};
            current.skillTypeCooldownRate.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                // TODO
                if (t.tag == SKILL_COOLDOWN_DURATION) {
                    current.skillCooldownDuration.enabled = true;

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.skillCooldownDuration.list.push({
                        skillID: t.data[0],
                        skill: skill.name,
                        duration: t.data[1]
                    });
                }
                else if (t.tag == STYPE_COOLDOWN_DURATION) {
                    current.skillTypeCooldownDuration.enabled = true;

                    var skillType = linked_data.types.skillTypes[t.data[0]];

                    current.skillTypeCooldownDuration.list.push({
                        skillTypeID: t.data[0],
                        skillType: skillType,
                        duration: t.data[1]
                    });
                }
                else if (t.tag == GLOBAL_COOLDOWN_DURATION) {
                    current.globalCooldownDuration = t.data;
                }
                else if (t.tag == SKILL_COOLDOWN_RATE) {
                    current.skillCooldownRate.enabled = true;

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.skillCooldownRate.list.push({
                        skillID: t.data[0],
                        skill: skill.name,
                        rate: t.data[1]
                    });
                }
                else if (t.tag == STYPE_COOLDOWN_RATE) {
                    current.skillTypeCooldownRate.enabled = true;

                    var skillType = linked_data.types.skillTypes[t.data[0]];

                    current.skillTypeCooldownRate.list.push({
                        skillTypeID: t.data[0],
                        skillType: skillType,
                        rate: t.data[1]
                    });
                }
                else if (t.tag == GLOBAL_COOLDOWN_RATE) {
                    current.globalCooldownRate = t.data;
                }
            });

            var data = {
                'skillCooldownDuration': new InlineEditTableDataInfo(current.skillCooldownDuration.enabled, current.skillCooldownDuration.list),
                'skillTypeCooldownDuration': new InlineEditTableDataInfo(current.skillTypeCooldownDuration.enabled, current.skillTypeCooldownDuration.list),
                'skillCooldownRate': new InlineEditTableDataInfo(current.skillCooldownRate.enabled, current.skillCooldownRate.list),
                'skillTypeCooldownRate': new InlineEditTableDataInfo(current.skillTypeCooldownRate.enabled, current.skillTypeCooldownRate.list)
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            // TODO
            setObjectTag(tags, state_data, 'skillCooldownDuration', SKILL_COOLDOWN_DURATION, function (item) { return [item.skillID, item.duration]; });
            setObjectTag(tags, state_data, 'skillTypeCooldownDuration', STYPE_COOLDOWN_DURATION, function (item) { return [item.skillTypeID, item.duration]; });
            setValueTag(tags, '#chkGlobalCooldownDuration', GLOBAL_COOLDOWN_DURATION, '#numGlobalCooldownDuration');
            setObjectTag(tags, state_data, 'skillCooldownRate', SKILL_COOLDOWN_RATE, function (item) { return [item.skillID, item.rate]; });
            setObjectTag(tags, state_data, 'skillTypeCooldownRate', STYPE_COOLDOWN_RATE, function (item) { return [item.skillTypeID, item.rate]; });
            setValueTag(tags, '#chkGlobalCooldownRate', GLOBAL_COOLDOWN_RATE, '#numGlobalCooldownRate');

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveSkillCooldownDuration = function (obj) {
            var skillID = $('#ddlSkillCooldownDuration').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
            obj.duration = $('#numSkillCooldownDuration').val();
        };

        this.saveSkillTypeCooldownDuration = function (obj) {
            var skillTypeID = $('#ddlSkillTypeCooldownDuration').val();
            var skillType = linked_data.types.skillTypes[skillTypeID];

            obj.skillTypeID = skillTypeID;
            obj.skillType = skillType;
            obj.duration = $('#numSkillTypeCooldownDuration').val();
        };

        this.saveSkillCooldownRate = function (obj) {
            var skillID = $('#ddlSkillCooldownRate').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
            obj.rate = $('#numSkillCooldownRate').val();
        };

        this.saveSkillTypeCooldownRate = function (obj) {
            var skillTypeID = $('#ddlSkillTypeCooldownRate').val();
            var skillType = linked_data.types.skillTypes[skillTypeID];

            obj.skillTypeID = skillTypeID;
            obj.skillType = skillType;
            obj.rate = $('#numSkillTypeCooldownRate').val();
        };

        this.initialize();

    };

});

