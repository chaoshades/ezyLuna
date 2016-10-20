define(function (require) {

    "use strict";

    var STATE_KEY = "instant_cast",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPInstantCast = require("tag/yep-22-instant-cast-2"),
        instantCastHtml = require('text!partialtpl/enemies/instantCast.htm'),

        instantCastTpl = Handlebars.compile(instantCastHtml),

        INSTANT_SKILL = "Instant Skill",
        INSTANT_SKILL_2 = "Instant Skill#2",
        INSTANT_ITEM = "Instant Item",
        INSTANT_ITEM_2 = "Instant Item#2",
        CANCEL_INSTANT_SKILL = "Cancel Instant Skill",
        CANCEL_INSTANT_SKILL_2 = "Cancel Instant Skill#2",
        CANCEL_INSTANT_ITEM = "Cancel Instant Item",
        CANCEL_INSTANT_ITEM_2 = "Cancel Instant Item#2";

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
                if (id === 'chkInstantSkill')
                    dataSelector = 'instantSkill';
                else if (id === 'chkInstantSkillRange')
                    dataSelector = 'instantSkillRange';
                else if (id === 'chkInstantItem')
                    dataSelector = 'instantItem';
                else if (id === 'chkInstantItemRange')
                    dataSelector = 'instantItemRange';
                else if (id === 'chkCancelInstantSkill')
                    dataSelector = 'cancelInstantSkill';
                else if (id === 'chkCancelInstantSkillRange')
                    dataSelector = 'cancelInstantSkillRange';
                else if (id === 'chkCancelInstantItem')
                    dataSelector = 'cancelInstantItem';
                else if (id === 'chkCancelInstantItemRange')
                    dataSelector = 'cancelInstantItemRange';

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
                'plugin': YEPInstantCast,
                'skills': linked_data.skills,
                'items': linked_data.items
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplInstantSkill"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplInstantSkillRange"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplInstantItem"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplInstantItemRange"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplCancelInstantSkill"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplCancelInstantSkillRange"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplCancelInstantItem"),
                new InlineEditTableTemplateSet($(instantCastHtml), "#tplCancelInstantItemRange")
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
                'instant_skill': new InlineEditTablePartialView(data, templateInfos["tplInstantSkill"], $stateManager, STATE_KEY, "instantSkill", this.saveInstantSkill),
                'instant_skill_range': new InlineEditTablePartialView(data, templateInfos["tplInstantSkillRange"], $stateManager, STATE_KEY, "instantSkillRange", this.saveInstantSkillRange),
                'instant_item': new InlineEditTablePartialView(data, templateInfos["tplInstantItem"], $stateManager, STATE_KEY, "instantItem", this.saveInstantItem),
                'instant_item_range': new InlineEditTablePartialView(data, templateInfos["tplInstantItemRange"], $stateManager, STATE_KEY, "instantItemRange", this.saveInstantItemRange),
                'cancel_instant_skill': new InlineEditTablePartialView(data, templateInfos["tplCancelInstantSkill"], $stateManager, STATE_KEY, "cancelInstantSkill", this.saveCancelInstantSkill),
                'cancel_instant_skill_range': new InlineEditTablePartialView(data, templateInfos["tplCancelInstantSkillRange"], $stateManager, STATE_KEY, "cancelInstantSkillRange", this.saveCancelInstantSkillRange),
                'cancel_instant_item': new InlineEditTablePartialView(data, templateInfos["tplCancelInstantItem"], $stateManager, STATE_KEY, "cancelInstantItem", this.saveCancelInstantItem),
                'cancel_instant_item_range': new InlineEditTablePartialView(data, templateInfos["tplCancelInstantItemRange"], $stateManager, STATE_KEY, "cancelInstantItemRange", this.saveCancelInstantItemRange),
                'tooltipInstantCast': new PluginTooltipPartialView(YEPInstantCast)
            }

            this.$el.html(instantCastTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseInstantCast'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPInstantCast));

            return this;
        };

        this.renderTags = function () {
            current.instantSkill = {};
            current.instantSkill.list = [];
            current.instantSkillRange = {};
            current.instantSkillRange.list = [];
            current.instantItem = {};
            current.instantItem.list = [];
            current.instantItemRange = {};
            current.instantItemRange.list = [];
            current.cancelInstantSkill = {};
            current.cancelInstantSkill.list = [];
            current.cancelInstantSkillRange = {};
            current.cancelInstantSkillRange.list = [];
            current.cancelInstantItem = {};
            current.cancelInstantItem.list = [];
            current.cancelInstantItemRange = {};
            current.cancelInstantItemRange.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == INSTANT_SKILL) {
                    current.instantSkill.enabled = true;

                    _.each(t.data, function (id) {
                        var skill = _.find(linked_data.skills, function (skill) { return skill.id == id; });

                        current.instantSkill.list.push({
                            skillID: id,
                            skill: skill.name
                        });
                    });
                }
                else if (t.tag == INSTANT_SKILL_2) {
                    current.instantSkillRange.enabled = true;

                    var skillStart = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; }),
                        skillEnd = _.find(linked_data.skills, function (skill) { return skill.id == t.data[1]; });

                    current.instantSkillRange.list.push({
                        start: t.data[0],
                        skillStart : skillStart.name,
                        end: t.data[1],
                        skillEnd: skillEnd.name
                    });
                }
                else if (t.tag == INSTANT_ITEM) {
                    current.instantItem.enabled = true;

                    _.each(t.data, function (id) {
                        var item = _.find(linked_data.items, function (item) { return item.id == id; });

                        current.instantItem.list.push({
                            itemID: id,
                            item: item.name
                        });
                    });
                }
                else if (t.tag == INSTANT_ITEM_2) {
                    current.instantItemRange.enabled = true;

                    var itemStart = _.find(linked_data.items, function (item) { return item.id == t.data[0]; }),
                        itemEnd = _.find(linked_data.items, function (item) { return item.id == t.data[1]; });

                    current.instantItemRange.list.push({
                        start: t.data[0],
                        itemStart: itemStart.name,
                        end: t.data[1],
                        itemEnd: itemEnd.name
                    });
                }

                if (t.tag == CANCEL_INSTANT_SKILL) {
                    current.cancelInstantSkill.enabled = true;

                    _.each(t.data, function (id) {
                        var skill = _.find(linked_data.skills, function (skill) { return skill.id == id; });

                        current.cancelInstantSkill.list.push({
                            skillID: id,
                            skill: skill.name
                        });
                    });
                }
                else if (t.tag == CANCEL_INSTANT_SKILL_2) {
                    current.cancelInstantSkillRange.enabled = true;

                    var skillStart = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; }),
                        skillEnd = _.find(linked_data.skills, function (skill) { return skill.id == t.data[1]; });

                    current.cancelInstantSkillRange.list.push({
                        start: t.data[0],
                        skillStart: skillStart.name,
                        end: t.data[1],
                        skillEnd: skillEnd.name
                    });
                }
                else if (t.tag == CANCEL_INSTANT_ITEM) {
                    current.cancelInstantItem.enabled = true;

                    _.each(t.data, function (id) {
                        var item = _.find(linked_data.items, function (item) { return item.id == id; });

                        current.cancelInstantItem.list.push({
                            itemID: id,
                            item: item.name
                        });
                    });
                }
                else if (t.tag == CANCEL_INSTANT_ITEM_2) {
                    current.cancelInstantItemRange.enabled = true;

                    var itemStart = _.find(linked_data.items, function (item) { return item.id == t.data[0]; }),
                        itemEnd = _.find(linked_data.items, function (item) { return item.id == t.data[1]; });

                    current.cancelInstantItemRange.list.push({
                        start: t.data[0],
                        itemStart: itemStart.name,
                        end: t.data[1],
                        itemEnd: itemEnd.name
                    });
                }
            });

            var data = {
                'instantSkill': new InlineEditTableDataInfo(current.instantSkill.enabled, current.instantSkill.list),
                'instantSkillRange': new InlineEditTableDataInfo(current.instantSkillRange.enabled, current.instantSkillRange.list),
                'instantItem': new InlineEditTableDataInfo(current.instantItem.enabled, current.instantItem.list),
                'instantItemRange': new InlineEditTableDataInfo(current.instantItemRange.enabled, current.instantItemRange.list),
                'cancelInstantSkill': new InlineEditTableDataInfo(current.cancelInstantSkill.enabled, current.cancelInstantSkill.list),
                'cancelInstantSkillRange': new InlineEditTableDataInfo(current.cancelInstantSkillRange.enabled, current.cancelInstantSkillRange.list),
                'cancelInstantItem': new InlineEditTableDataInfo(current.cancelInstantItem.enabled, current.cancelInstantItem.list),
                'cancelInstantItemRange': new InlineEditTableDataInfo(current.cancelInstantItemRange.enabled, current.cancelInstantItemRange.list)
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            setObjectValuesTag(tags, state_data, 'instantSkill', INSTANT_SKILL, function (item) { return item.skillID; });
            setObjectTag(tags, state_data, 'instantSkillRange', INSTANT_SKILL_2, function (item) { return [item.start, item.end]; });
            setObjectValuesTag(tags, state_data, 'instantItem', INSTANT_ITEM, function (item) { return item.itemID; });
            setObjectTag(tags, state_data, 'instantItemRange', INSTANT_ITEM_2, function (item) { return [item.start, item.end]; });

            setObjectValuesTag(tags, state_data, 'cancelInstantSkill', CANCEL_INSTANT_SKILL, function (item) { return item.skillID; });
            setObjectTag(tags, state_data, 'cancelInstantSkillRange', CANCEL_INSTANT_SKILL_2, function (item) { return [item.start, item.end]; });
            setObjectValuesTag(tags, state_data, 'cancelInstantItem', CANCEL_INSTANT_ITEM, function (item) { return item.itemID; });
            setObjectTag(tags, state_data, 'cancelInstantItemRange', CANCEL_INSTANT_ITEM_2, function (item) { return [item.start, item.end]; });

            return tags;
        };

        this.getSupportedTag = function () {
            return YEPInstantCast;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveInstantSkill = function (obj) {
            var skillID = $('#ddlInstantSkill').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
        };

        this.saveInstantSkillRange = function (obj) {
            var skillStartID = $('#ddlInstantSkillRangeStart').val(),
                skillEndID = $('#ddlInstantSkillRangeEnd').val();
            var skillStart = _.find(linked_data.skills, function (skill) { return skill.id == skillStartID; }),
                skillEnd = _.find(linked_data.skills, function (skill) { return skill.id == skillEndID; });

            obj.start = skillStart.id;
            obj.skillStart = skillStart.name;
            obj.end = skillEnd.id;
            obj.skillEnd = skillEnd.name;
        };

        this.saveInstantItem = function (obj) {
            var itemID = $('#ddlInstantItem').val();
            var item = _.find(linked_data.items, function (item) { return item.id == itemID; });

            obj.itemID = item.id;
            obj.item = item.name;
        };

        this.saveInstantItemRange = function (obj) {
            var itemStartID = $('#ddlInstantItemRangeStart').val(),
                itemEndID = $('#ddlInstantItemRangeEnd').val();
            var itemStart = _.find(linked_data.items, function (item) { return item.id == itemStartID; }),
                itemEnd = _.find(linked_data.items, function (item) { return item.id == itemEndID; });

            obj.start = itemStart.id;
            obj.itemStart = itemStart.name;
            obj.end = itemEnd.id;
            obj.itemEnd = itemEnd.name;
        };

        this.saveCancelInstantSkill = function (obj) {
            var skillID = $('#ddlCancelInstantSkill').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
        };

        this.saveCancelInstantSkillRange = function (obj) {
            var skillStartID = $('#ddlCancelInstantSkillRangeStart').val(),
                skillEndID = $('#ddlCancelInstantSkillRangeEnd').val();
            var skillStart = _.find(linked_data.skills, function (skill) { return skill.id == skillStartID; }),
                skillEnd = _.find(linked_data.skills, function (skill) { return skill.id == skillEndID; });

            obj.start = skillStart.id;
            obj.skillStart = skillStart.name;
            obj.end = skillEnd.id;
            obj.skillEnd = skillEnd.name;
        };

        this.saveCancelInstantItem = function (obj) {
            var itemID = $('#ddlCancelInstantItem').val();
            var item = _.find(linked_data.items, function (item) { return item.id == itemID; });

            obj.itemID = item.id;
            obj.item = item.name;
        };

        this.saveCancelInstantItemRange = function (obj) {
            var itemStartID = $('#ddlCancelInstantItemRangeStart').val(),
                itemEndID = $('#ddlCancelInstantItemRangeEnd').val();
            var itemStart = _.find(linked_data.items, function (item) { return item.id == itemStartID; }),
                itemEnd = _.find(linked_data.items, function (item) { return item.id == itemEndID; });

            obj.start = itemStart.id;
            obj.itemStart = itemStart.name;
            obj.end = itemEnd.id;
            obj.itemEnd = itemEnd.name;
        };

        this.initialize();

    };

});

