define(function (require) {

    "use strict";

    var STATE_KEY = "limited_skill_uses",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPLimitedSkillUses = require("tag/yep-56-limited-skill-uses"),
        limitedSkillUsesHtml = require('text!partialtpl/enemies/limitedSkillUses.htm'),

        limitedSkillUsesTpl = Handlebars.compile(limitedSkillUsesHtml),

        GLOBAL_USE_MAX = "Global Use Max",
        STYPE_USE_MAX = "SType Use Max",
        SKILL_USE_MAX = "Skill Use Max";


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
                if (id === 'chkSkillTypeUseMax')
                    dataSelector = 'skillTypeUseMax';
                else if (id === 'chkSkillUseMax')
                    dataSelector = 'skillUseMax';

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
                'skillTypes': _.map(_.compact(linked_data.types.skillTypes), function (t, i) {return {id: i+1, name:t}}),
                'skills': linked_data.skills
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(limitedSkillUsesHtml), "#tplSkillTypeUseMax"),
                new InlineEditTableTemplateSet($(limitedSkillUsesHtml), "#tplSkillUseMax")
            ];
            var templateInfos = {};

            // Register partials for every template in template sets
            _.each(templateSets, function (set) {
                _.each(set.templates, function (t) {
                    Handlebars.registerPartial(t.name, t.template);
                });
                templateInfos[set.setID] = new InlineEditTableTemplateInfo(set);
            });

            var partials = {
                'skill_type_use_max': new InlineEditTablePartialView(data, templateInfos["tplSkillTypeUseMax"], $stateManager, STATE_KEY, "skillTypeUseMax", this.saveSkillTypeUseMax),
                'skill_use_max': new InlineEditTablePartialView(data, templateInfos["tplSkillUseMax"], $stateManager, STATE_KEY, "skillUseMax", this.saveSkillUseMax),
                'tooltipLimitedSkillUses': new PluginTooltipPartialView(YEPLimitedSkillUses)
            }

            this.$el.html(limitedSkillUsesTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseLimitedSkillUses'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPLimitedSkillUses));

            return this;
        };

        this.renderTags = function () {
            current.skillTypeUseMax = {};
            current.skillTypeUseMax.list = [];
            current.skillUseMax = {};
            current.skillUseMax.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == GLOBAL_USE_MAX) {
                    current.globalUseMax = extractFromSignedValue(t.data);
                }
                else if (t.tag == STYPE_USE_MAX) {
                    current.skillTypeUseMax.enabled = true;

                    var skillType = linked_data.types.skillTypes[t.data[0]];

                    current.skillTypeUseMax.list.push({
                        skillTypeID: t.data[0],
                        skillType: skillType,
                        max: extractFromSignedValue(t.data[1])
                    });
                }
                else if (t.tag == SKILL_USE_MAX) {
                    current.skillUseMax.enabled = true;

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.skillUseMax.list.push({
                        skillID: t.data[0],
                        skill: skill.name,
                        max: extractFromSignedValue(t.data[1])
                    });
                }
            });

            var data = {
                'skillTypeUseMax': new InlineEditTableDataInfo(current.skillTypeUseMax.enabled, current.skillTypeUseMax.list),
                'skillUseMax': new InlineEditTableDataInfo(current.skillUseMax.enabled, current.skillUseMax.list),
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;
  
            setSignedValueTag(tags, '#chkGlobalUseMax', GLOBAL_USE_MAX, '#numGlobalUseMax');
            setObjectTag(tags, state_data, 'skillTypeUseMax', STYPE_USE_MAX, function (item) { return [item.skillTypeID, getSignedValue(item.max)]; });
            setObjectTag(tags, state_data, 'skillUseMax', SKILL_USE_MAX, function (item) { return [item.skillID, getSignedValue(item.max)]; });

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveSkillTypeUseMax = function (obj) {
            var skillTypeID = $('#ddlSkillTypeUseMax').val();
            var skillType = linked_data.types.skillTypes[skillTypeID];

            obj.skillTypeID = skillTypeID;
            obj.skillType = skillType;
            obj.max = $('#numSkillTypeUseMax').val();
        };

        this.saveSkillUseMax = function (obj) {
            var skillID = $('#ddlSkillUseMax').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
            obj.max = $('#numSkillUseMax').val();
        };

        this.initialize();

    };

});

