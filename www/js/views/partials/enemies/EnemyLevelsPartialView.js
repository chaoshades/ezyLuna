define(function (require) {

    "use strict";

    var NB_PARAMS = 8,
        STATE_KEY = "enemy_levels",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPEnemyLevels = require("tag/yep-64-enemy-levels"),
        enemyLevelsHtml = require('text!partialtpl/enemies/enemyLevels.htm'),

        enemyLevelsTpl = Handlebars.compile(enemyLevelsHtml),

        SHOW_LEVEL = "Show Level",
        HIDE_LEVEL = "Hide Level",
        MINIMUM_LEVEL = "Minimum Level",
        MAXIMUM_LEVEL = "Maximum Level",
        STATIC_LEVEL = "Static Level",
        STARTING_LEVEL_TYPE = "Starting Level Type",
        POS_LEVEL_FLUCTUATION = "Positive Level Fluctuation",
        NEG_LEVEL_FLUCTUATION = "Negative Level Fluctuation",
        LEVEL_FLUCTUATION = "Level Fluctuation",
        HP_RATE = "maxhp Rate",
        MP_RATE = "maxmp Rate",
        ATK_RATE = "atk Rate",
        DEF_RATE = "def Rate",
        MAT_RATE = "mat Rate",
        MDF_RATE = "mdf Rate",
        AGI_RATE = "agi Rate",
        LUK_RATE = "luk Rate",
        HP_FLAT = "maxhp Flat",
        MP_FLAT = "maxmp Flat",
        ATK_FLAT = "atk Flat",
        DEF_FLAT = "def Flat",
        MAT_FLAT = "mat Flat",
        MDF_FLAT = "mdf Flat",
        AGI_FLAT = "agi Flat",
        LUK_FLAT = "luk Flat",
        RESIST_LEVEL_CHANGE = "Resist Level Change",
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
                'levelTypes': linked_data.levelTypes,
                'skills': linked_data.skills
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
                'skill_require_level': new InlineEditTablePartialView(data, templateInfos["tplSkillRequireLevel"], $stateManager, STATE_KEY, "skillRequireLevel", this.saveSkillRequireLevel),
                'tooltipEnemyLevels': new PluginTooltipPartialView(YEPEnemyLevels)
            }

            this.$el.html(enemyLevelsTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseEnemyLevels'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPEnemyLevels));

            return this;
        };

        this.renderTags = function () {
            current.level = {};
            current.fluctuation = {};
            current.rateparams = _.range(NB_PARAMS).map(function () { return null });
            current.flatparams = _.range(NB_PARAMS).map(function () { return null });
            current.resistLevelChange = {};
            current.skillRequireLevel = {};
            current.skillRequireLevel.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == SHOW_LEVEL) {
                    current.level.enabled = true;
                    current.level.show = true;
                }
                else if (t.tag == HIDE_LEVEL) {
                    current.level.enabled = true;
                    current.level.hide = true;
                }
                else if (t.tag == MINIMUM_LEVEL) {
                    current.level.min = t.data;
                }
                else if (t.tag == MAXIMUM_LEVEL) {
                    current.level.max = t.data;
                }
                else if (t.tag == STATIC_LEVEL) {
                    current.level.static = t.data;
                }
                else if (t.tag == STARTING_LEVEL_TYPE) {
                    current.level.startingType = t.data;
                }

                if (t.tag == POS_LEVEL_FLUCTUATION) {
                    current.fluctuation.pos = t.data;
                }
                else if (t.tag == NEG_LEVEL_FLUCTUATION) {
                    current.fluctuation.neg = t.data;
                }
                else if (t.tag == LEVEL_FLUCTUATION) {
                    current.fluctuation.value = t.data;
                }

                if (t.tag == HP_RATE) {
                    current.rateparams[0] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == MP_RATE) {
                    current.rateparams[1] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == ATK_RATE) {
                    current.rateparams[2] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == DEF_RATE) {
                    current.rateparams[3] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == MAT_RATE) {
                    current.rateparams[4] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == MDF_RATE) {
                    current.rateparams[5] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == AGI_RATE) {
                    current.rateparams[6] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == LUK_RATE) {
                    current.rateparams[7] = extractFromPercentValue(extractFromSignedValue(t.data));
                }

                if (t.tag == HP_FLAT) {
                    current.flatparams[0] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == MP_FLAT) {
                    current.flatparams[1] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == ATK_FLAT) {
                    current.flatparams[2] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == DEF_FLAT) {
                    current.flatparams[3] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == MAT_FLAT) {
                    current.flatparams[4] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == MDF_FLAT) {
                    current.flatparams[5] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == AGI_FLAT) {
                    current.flatparams[6] = extractFromPercentValue(extractFromSignedValue(t.data));
                }
                else if (t.tag == LUK_FLAT) {
                    current.flatparams[7] = extractFromPercentValue(extractFromSignedValue(t.data));
                }

                if (t.tag == RESIST_LEVEL_CHANGE) {
                    current.resistLevelChange.enabled = true;
                }
                else if (t.tag == SKILL_REQUIRE_LEVEL) {
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

            if ($('#chkShowLevel').is(':checked')) {
                setTag(tags, '#radShowLevel', SHOW_LEVEL);
                setTag(tags, '#radHideLevel', HIDE_LEVEL);
            }
            setValueTag(tags, '#chkMinimumLevel', MINIMUM_LEVEL, '#numMinimumLevel');
            setValueTag(tags, '#chkMaximumLevel', MAXIMUM_LEVEL, '#numMaximumLevel');
            setValueTag(tags, '#chkStaticLevel', STATIC_LEVEL, '#numStaticLevel');
            setValueTag(tags, '#chkStartingLevelType', STARTING_LEVEL_TYPE, '#ddlStartingLevelType');

            setValueTag(tags, '#chkPositiveLevelFluctuation', POS_LEVEL_FLUCTUATION, '#numPositiveLevelFluctuation');
            setValueTag(tags, '#chkNegativeLevelFluctuation', NEG_LEVEL_FLUCTUATION, '#numNegativeLevelFluctuation');
            setValueTag(tags, '#chkLevelFluctuation', LEVEL_FLUCTUATION, '#numLevelFluctuation');

            setSignedPercentValueTag(tags, '#chkHPRate', HP_RATE, '#numHPRate');
            setSignedPercentValueTag(tags, '#chkMPRate', MP_RATE, '#numMPRate');
            setSignedPercentValueTag(tags, '#chkAtkRate', ATK_RATE, '#numAtkRate');
            setSignedPercentValueTag(tags, '#chkDefRate', DEF_RATE, '#numDefRate');
            setSignedPercentValueTag(tags, '#chkMatRate', MAT_RATE, '#numMatRate');
            setSignedPercentValueTag(tags, '#chkMdfRate', MDF_RATE, '#numMdfRate');
            setSignedPercentValueTag(tags, '#chkAgiRate', AGI_RATE, '#numAgiRate');
            setSignedPercentValueTag(tags, '#chkLukRate', LUK_RATE, '#numLukRate');

            setSignedPercentValueTag(tags, '#chkHPFlat', HP_FLAT, '#numHPFlat');
            setSignedPercentValueTag(tags, '#chkMPFlat', MP_FLAT, '#numMPFlat');
            setSignedPercentValueTag(tags, '#chkAtkFlat', ATK_FLAT, '#numAtkFlat');
            setSignedPercentValueTag(tags, '#chkDefFlat', DEF_FLAT, '#numDefFlat');
            setSignedPercentValueTag(tags, '#chkMatFlat', MAT_FLAT, '#numMatFlat');
            setSignedPercentValueTag(tags, '#chkMdfFlat', MDF_FLAT, '#numMdfFlat');
            setSignedPercentValueTag(tags, '#chkAgiFlat', AGI_FLAT, '#numAgiFlat');
            setSignedPercentValueTag(tags, '#chkLukFlat', LUK_FLAT, '#numLukFlat');

            setTag(tags, '#chkResistLevelChange', RESIST_LEVEL_CHANGE);
            setObjectTag(tags, state_data, 'skillRequireLevel', SKILL_REQUIRE_LEVEL, function (item) { return [item.skillID, item.level]; });

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveSkillRequireLevel = function (obj) {
            var skillID = $('#ddlSkillRequireLevel').val();
            var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            obj.skillID = skill.id;
            obj.skill = skill.name;
            obj.level = $('#numSkillRequireLevel').val();
        };

        this.initialize();

    };

});

