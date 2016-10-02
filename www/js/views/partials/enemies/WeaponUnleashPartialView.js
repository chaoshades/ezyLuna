define(function (require) {

    "use strict";

    var STATE_KEY = "weapon_unleash",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPWeaponUnleash = require("tag/yep-51-weapon-unleash"),
        weaponUnleashHtml = require('text!partialtpl/enemies/weaponUnleash.htm'),

        weaponUnleashTpl = Handlebars.compile(weaponUnleashHtml),

        REPLACE_ATTACK = "Replace Attack",
        REPLACE_GUARD = "Replace Guard",
        WEAPON_UNLEASH = "Weapon Unleash",
        WEAPON_UNLEASH_2 = "Weapon Unleash#2",
        GUARD_UNLEASH = "Guard Unleash",
        GUARD_UNLEASH_2 = "Guard Unleash#2";


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
                if (id === 'chkWeaponUnleashSkill')
                    dataSelector = 'weaponUnleashSkill';
                else if (id === 'chkGuardUnleashSkill')
                    dataSelector = 'guardUnleashSkill';

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
                'skills': linked_data.skills
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(weaponUnleashHtml), "#tplWeaponUnleashSkill"),
                new InlineEditTableTemplateSet($(weaponUnleashHtml), "#tplGuardUnleashSkill")
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
                'weapon_unleash_skill': new InlineEditTablePartialView(data, templateInfos["tplWeaponUnleashSkill"], $stateManager, STATE_KEY, "weaponUnleashSkill", this.saveWeaponUnleashSkill),
                'guard_unleash_skill': new InlineEditTablePartialView(data, templateInfos["tplGuardUnleashSkill"], $stateManager, STATE_KEY, "guardUnleashSkill", this.saveGuardUnleashSkill),
                'tooltipWeaponUnleash': new PluginTooltipPartialView(YEPWeaponUnleash)
            }

            this.$el.html(weaponUnleashTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseWeaponUnleashs'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPWeaponUnleash));

            return this;
        };

        this.renderTags = function () {
            current.weaponUnleashSkill = {};
            current.weaponUnleashSkill.list = [];
            current.guardUnleashSkill = {};
            current.guardUnleashSkill.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == REPLACE_ATTACK) {
                    current.replaceAttack = t.data;
                }
                else if (t.tag == REPLACE_GUARD) {
                    current.replaceGuard = t.data;
                }
                else if (t.tag == WEAPON_UNLEASH) {
                    current.weaponUnleashRate = extractFromSignedValue(t.data);
                }
                else if (t.tag == WEAPON_UNLEASH_2) {
                    current.weaponUnleashSkill.enabled = true;

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.weaponUnleashSkill.list.push({
                        skillID: t.data[0],
                        skill: skill.name,
                        rate: extractFromSignedValue(t.data[1])
                    });
                }
                else if (t.tag == GUARD_UNLEASH) {
                    current.guardUnleashRate = extractFromSignedValue(t.data);
                }
                else if (t.tag == GUARD_UNLEASH_2) {
                    current.guardUnleashSkill.enabled = true;

                    var skill = _.find(linked_data.skills, function (skill) { return skill.id == t.data[0]; });

                    current.guardUnleashSkill.list.push({
                        skillID: t.data[0],
                        skill: skill.name,
                        rate: extractFromSignedValue(t.data[1])
                    });
                }
            });

            var data = {
                'weaponUnleashSkill': new InlineEditTableDataInfo(current.weaponUnleashSkill.enabled, current.weaponUnleashSkill.list),
                'guardUnleashSkill': new InlineEditTableDataInfo(current.guardUnleashSkill.enabled, current.guardUnleashSkill.list),
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;
  
            setValueTag(tags, '#chkReplaceAttack', REPLACE_ATTACK, '#ddlReplaceAttack');
            setValueTag(tags, '#chkReplaceGuard', REPLACE_GUARD, '#ddlReplaceGuard');
            setSignedValueTag(tags, '#chkWeaponUnleashRate', WEAPON_UNLEASH, '#numWeaponUnleashRate');
            setObjectTag(tags, state_data, 'weaponUnleashSkill', WEAPON_UNLEASH_2, function (item) { return [item.skillID, getSignedValue(item.rate)]; });
            setSignedValueTag(tags, '#chkGuardUnleashRate', GUARD_UNLEASH, '#numGuardUnleashRate');
            setObjectTag(tags, state_data, 'guardUnleashSkill', GUARD_UNLEASH_2, function (item) { return [item.skillID, getSignedValue(item.rate)]; });

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveWeaponUnleashSkill = function (obj) {
            var skillID = $('#ddlWeaponUnleashSkill').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
            obj.rate = $('#numWeaponUnleashSkill').val();
        };

        this.saveGuardUnleashSkill = function (obj) {
            var skillID = $('#ddlGuardUnleashSkill').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
            obj.rate = $('#numGuardUnleashSkill').val();
        };

        this.initialize();

    };

});

