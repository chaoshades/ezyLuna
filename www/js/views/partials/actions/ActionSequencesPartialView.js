define(function (require) {

    "use strict";

    var STATE_KEY = "skill_actions",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        Sortable = require('sortable'),
        InlineEditTimelinePartialView = require("partial/InlineEditTimelinePartialView"),
        actionSequencesHtml = require('text!partialtpl/actions/actionSequences.htm'),

        actionSequencesTpl = Handlebars.compile(actionSequencesHtml),

        //Default Action Sequence
        ACTION_ANIMATION = "Action Animation",
        ACTION_ANIMATION_2 = "Action Animation#2",
        ACTION_COMMON_EVENT = "Action Common Event",
        ACTION_EFFECT = "Action Effect",
        ACTION_EFFECT_2 = "Action Effect#2",
        ANIMATION_WAIT = "Animation Wait",
        CAST_ANIMATION = "Cast Animation",
        CLEAR_BATTLE_LOG = "Clear Battle Log",
        DEATH_BREAK = "Death Break",
        DISPLAY_ACTION = "Display Action",
        //IF = "IF", TODO
        IMMORTAL = "Immortal",
        MOTION_WAIT = "Motion Wait",
        PERFORM_ACTION = "Perform Action",
        PERFORM_FINISH = "Perform Finish",
        PERFORM_START = "Perform Start",
        WAIT = "Wait", 
        WAIT_FOR_ANIMATION = "Wait for Animation", 
        WAIT_FOR_EFFECT = "Wait for Effect", 
        WAIT_FOR_MOVEMENT = "Wait for Movement", 
        WAIT_FOR_NEW_LINE = "Wait for New Line", 

        // Action Sequence Pack 1
        ADD_HP_BUFF = "Add maxhp Buff", 
        ADD_MP_BUFF = "Add maxmp Buff", 
        ADD_ATK_BUFF = "Add atk Buff", 
        ADD_DEF_BUFF = "Add def Buff", 
        ADD_MAT_BUFF = "Add mat Buff", 
        ADD_MDF_BUFF ="Add mdf Buff", 
        ADD_AGI_BUFF = "Add agi Buff", 
        ADD_LUK_BUFF = "Add luk Buff",
        ADD_HP_DEBUFF = "Add maxhp Debuff", 
        ADD_MP_DEBUFF = "Add maxmp Debuff", 
        ADD_ATK_DEBUFF = "Add atk Debuff", 
        ADD_DEF_DEBUFF = "Add def Debuff", 
        ADD_MAT_DEBUFF = "Add mat Debuff", 
        ADD_MDF_DEBUFF ="Add mdf Debuff", 
        ADD_AGI_DEBUFF = "Add agi Debuff", 
        ADD_LUK_DEBUFF = "Add luk Debuff",
        ADD_STATE = "Add State",
        ANIMATION = "Animation", 
        BGM = "BGM", 
        CHANGE_SWITCH = "Change Switch", 
        CHANGE_SWITCH_2 = "Change Switch#2",
        //CHANGE_VARIABLE = "Change variable", TODO
        COLLAPSE = "Collapse", 
        COMMON_EVENT = "Common Event", 
        //EVAL = "Eval", TODO
        GAIN_ITEM = "Gain Item", 
        GAIN_WEAPON = "Gain Weapon ", 
        GAIN_ARMOR = "Gain Armor", 
        LOSE_ITEM = "Lose Item", 
        LOSE_WEAPON = "Lose Weapon", 
        LOSE_ARMOR = "Lose Armor", 
        //GOLD = "Gold", TODO
        //HP = "HP", TODO
        //HP_VARIABLE = "HP Variable", TODO
        ME = "ME", 
        //MP = "MP", TODO
        //MP_VARIABLE = "MP Variable", TODO
        REFRESH_STATUS = "Refresh Status",
        REMOVE_HP_BUFF = "Remove maxhp Buff", 
        REMOVE_MP_BUFF = "Remove maxmp Buff", 
        REMOVE_ATK_BUFF = "Remove atk Buff", 
        REMOVE_DEF_BUFF = "Remove def Buff", 
        REMOVE_MAT_BUFF = "Remove mat Buff", 
        REMOVE_MDF_BUFF ="Remove mdf Buff", 
        REMOVE_AGI_BUFF = "Remove agi Buff", 
        REMOVE_LUK_BUFF = "Remove luk Buff",
        REMOVE_HP_DEBUFF = "Remove maxhp Debuff", 
        REMOVE_MP_DEBUFF = "Remove maxmp Debuff", 
        REMOVE_ATK_DEBUFF = "Remove atk Debuff", 
        REMOVE_DEF_DEBUFF = "Remove def Debuff", 
        REMOVE_MAT_DEBUFF = "Remove mat Debuff", 
        REMOVE_MDF_DEBUFF ="Remove mdf Debuff", 
        REMOVE_AGI_DEBUFF = "Remove agi Debuff", 
        REMOVE_LUK_DEBUFF = "Remove luk Debuff",
        REMOVE_STATE = "Remove State",
        SE = "SE",
        //TP = "TP", TODO
        //TP_VARIABLE = "TP Variable", TODO

        // Action Sequence Pack 2
        ATTACK_ANIMATION = "Attack Animation",
        ENEMY_EFFECT = "Enemy Effect", 
        //FACE = "Face", TODO
        FADE_OUT = "Fade Out",
        FADE_IN = "Fade In",
        FLASH_SCREEN = "Flash Screen",
        FLOAT = "Float",
        HIDE_BATTLE_HUD = "Hide Battle Hud",
        //JUMP = "Jump", TODO
        //MOTION = "Motion", TODO
        //MOVE = "Move", TODO
        //OPACITY = "Opacity", TODO
        SHOW_BATTLE_HUD = "Show Battle Hud",
        SHAKE_SCREEN = "Shake Screen",
        TINT_SCREEN = "Tint Screen",
        WAIT_FOR_FLOAT = "Wait for Float", 
        WAIT_FOR_JUMP = "Wait for Jump", 
        WAIT_FOR_OPACITY = "Wait for Opacity", 

        // Action Sequence Pack 3
        CAMERA_CLAMP_ON = "Camera Clamp On",
        CAMERA_CLAMP_OFF = "Camera Clamp Off", 
        CAMERA_FOCUS = "Camera Focus", 
        CAMERA_OFFSET = "Camera Offset", 
        CAMERA_PAN = "Camera Pan", 
        CAMERA_SCREEN = "Camera Screen", 
        RESET_CAMERA = "Reset Camera", 
        RESET_ZOOM = "Reset Zoom", 
        WAIT_FOR_CAMERA = "Wait for Camera", 
        WAIT_FOR_ZOOM = "Wait for Zoom", 
        ZOOM = "Zoom",

        BADGE_CFG = {
            "invisible": [
                // Default Action Sequence - None
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2
                FADE_OUT, HIDE_BATTLE_HUD
                // Action Sequence Pack 3 - None
            ],
            "visible": [
                // Default Action Sequence - None
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2
                FADE_IN, SHOW_BATTLE_HUD
                // Action Sequence Pack 3 - None
            ],
            "code": [
                // Default Action Sequence
                ACTION_COMMON_EVENT, CLEAR_BATTLE_LOG,
                // Action Sequence Pack 1
                CHANGE_SWITCH, CHANGE_SWITCH_2, COMMON_EVENT, REFRESH_STATUS
                // Action Sequence Pack 2 - None
                // Action Sequence Pack 3 - None
            ],
            "animation": [
                // Default Action Sequence 
                ACTION_ANIMATION, ACTION_ANIMATION_2, CAST_ANIMATION,
                // Action Sequence Pack 1
                ANIMATION,
                // Action Sequence Pack 2
                ATTACK_ANIMATION
                // Action Sequence Pack 3 - None
            ],
            "action": [
                // Default Action Sequence - None
                ACTION_EFFECT, ACTION_EFFECT_2, DISPLAY_ACTION, PERFORM_ACTION, PERFORM_FINISH, PERFORM_START,
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2
                ENEMY_EFFECT
                // Action Sequence Pack 3 - None
            ],
            "screen": [
                // Default Action Sequence - None
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2
                FLASH_SCREEN, SHAKE_SCREEN, TINT_SCREEN
                // Action Sequence Pack 3 - None
            ],
            "special": [
                 // Default Action Sequence
                DEATH_BREAK, IMMORTAL,
                 // Action Sequence Pack 1
                ADD_HP_BUFF, ADD_MP_BUFF, ADD_ATK_BUFF, ADD_DEF_BUFF, ADD_MAT_BUFF, ADD_MDF_BUFF, ADD_AGI_BUFF, ADD_LUK_BUFF,
                ADD_HP_DEBUFF, ADD_MP_DEBUFF, ADD_ATK_DEBUFF, ADD_DEF_DEBUFF, ADD_MAT_DEBUFF, ADD_MDF_DEBUFF, ADD_AGI_DEBUFF, ADD_LUK_DEBUFF,
                REMOVE_HP_BUFF, REMOVE_MP_BUFF, REMOVE_ATK_BUFF, REMOVE_DEF_BUFF, REMOVE_MAT_BUFF, REMOVE_MDF_BUFF, REMOVE_AGI_BUFF, REMOVE_LUK_BUFF,
                REMOVE_HP_DEBUFF, REMOVE_MP_DEBUFF, REMOVE_ATK_DEBUFF, REMOVE_DEF_DEBUFF, REMOVE_MAT_DEBUFF, REMOVE_MDF_DEBUFF, REMOVE_AGI_DEBUFF, REMOVE_LUK_DEBUFF,
                ADD_STATE, REMOVE_STATE, GAIN_ITEM, GAIN_WEAPON, GAIN_ARMOR, LOSE_ITEM, LOSE_WEAPON, LOSE_ARMOR, COLLAPSE,
                // Action Sequence Pack 2
                FLOAT
                // Action Sequence Pack 3 - None
            ],
            "camera": [
                // Default Action Sequence - None
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2 - None
                // Action Sequence Pack 3
                CAMERA_CLAMP_ON, CAMERA_CLAMP_OFF, CAMERA_FOCUS, CAMERA_OFFSET, CAMERA_PAN, CAMERA_SCREEN, RESET_CAMERA, RESET_ZOOM, ZOOM
            ],
            "music": [
                // Default Action Sequence - None
                // Action Sequence Pack 1
                BGM, ME, SE
                // Action Sequence Pack 2 - None
                // Action Sequence Pack 3 - None
            ],
            "wait": [
                // Default Action Sequence
                ANIMATION_WAIT, MOTION_WAIT, WAIT, WAIT_FOR_ANIMATION, WAIT_FOR_EFFECT, WAIT_FOR_MOVEMENT, WAIT_FOR_NEW_LINE,
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2
                WAIT_FOR_FLOAT, WAIT_FOR_JUMP, WAIT_FOR_OPACITY,
                // Action Sequence Pack 3
                WAIT_FOR_CAMERA, WAIT_FOR_ZOOM
            ]
        },
        
        TEMPLATE_CFG = {
            "tplNotEditable": [
                // Default Action Sequence
                ACTION_COMMON_EVENT
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2 - None
                // Action Sequence Pack 3 - None
            ],
            "tplCheckOnly": [
                // Default Action Sequence - None
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2 - None
                // Action Sequence Pack 3 - None
            ],
            "tplNumericOnly": [
                // Default Action Sequence
                WAIT,
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2
                FADE_OUT, FADE_IN
                // Action Sequence Pack 3 - None
            ],
            "tplTargets": [
                // Default Action Sequence
                ACTION_EFFECT, ACTION_EFFECT_2
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2- None
                // Action Sequence Pack 3 - None
            ],
            "tplTargetsMirror": [
                // Default Action Sequence
                ACTION_ANIMATION, ACTION_ANIMATION_2
                // Action Sequence Pack 1 - None
                // Action Sequence Pack 2- None
                // Action Sequence Pack 3 - None
            ]
        },
        
        GROUP_CFG = [
            // Default Action Sequence
            WAIT, WAIT_FOR_ANIMATION, WAIT_FOR_EFFECT, WAIT_FOR_MOVEMENT, WAIT_FOR_NEW_LINE,
            // Action Sequence Pack 1 - None
            // Action Sequence Pack 2
            WAIT_FOR_FLOAT, WAIT_FOR_JUMP, WAIT_FOR_OPACITY,
            // Action Sequence Pack 3
            WAIT_FOR_CAMERA, WAIT_FOR_ZOOM
        ];


    return function (current, linked_data, $stateManager, actionTag) {

        var timeline_partial = null;

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            var getStateManagerCallback = this.getStateManager;
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);

                //TODO
                //var id = $(this).attr('id'),
                //    dataSelector = null;
                //if (id === 'chkXXX')
                //    dataSelector = 'xxx';

                //if (dataSelector) {
                //    var state_data = getStateManagerCallback().getState(STATE_KEY).data;
                //    state_data[dataSelector].enabled = $(this).is(':checked');
                //    getStateManagerCallback().setState(STATE_KEY, state_data);
                //}
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'targets': linked_data.targets
            };

            var templateSets = [
                new InlineEditTimelineTemplateSet($(actionSequencesHtml), "#tplNotEditable"),
                new InlineEditTimelineTemplateSet($(actionSequencesHtml), "#tplCheckOnly"),
                new InlineEditTimelineTemplateSet($(actionSequencesHtml), "#tplNumericOnly"),
                new InlineEditTimelineTemplateSet($(actionSequencesHtml), "#tplTargets"),
                new InlineEditTimelineTemplateSet($(actionSequencesHtml), "#tplTargetsMirror")
            ];
            var templateInfos = {};

            // Register partials for every template in template sets
            _.each(templateSets, function (set) {
                _.each(set.templates, function(t) {
                    Handlebars.registerPartial(t.name, t.template);
                });
                templateInfos[set.setID] = new InlineEditTimelineTemplateInfo(set);
            });
            // Register badge template
            var badgeTpl = new InlineEditTimelineTemplate($(actionSequencesHtml), '#timeline-badge');
            Handlebars.registerPartial(badgeTpl.name, badgeTpl.template);
            templateInfos.badge_template = badgeTpl.name;
            // Register empty template
            var emptyTpl = new InlineEditTimelineTemplate($(actionSequencesHtml), '#timeline-empty');
            Handlebars.registerPartial(emptyTpl.name, emptyTpl.template);
            templateInfos.empty_template = emptyTpl.name;

            timeline_partial = new InlineEditTimelinePartialView(data, templateInfos, $stateManager, STATE_KEY, actionTag, this.saveAction, this.editAction);

            this.$el.html(actionSequencesTpl(data));

            // Render partial views
            this.$el.find('div').html(timeline_partial.render().$el);

            // Initial Display
            /*
            var timeline = this.$el.find(".timeline").get(0);
            if (timeline) {
                Sortable.create(timeline, UIConfig.sortable.timeline("group"));
                _.each(this.$el.find(".timeline.nested"), function (obj) {
                    Sortable.create(obj, UIConfig.sortable.timeline("action"));
                });
            }*/

            return this;
        };

        this.renderTags = function () {
            if (!current.actionSequences) current.actionSequences = {};
            current.actionSequences[actionTag] = {};
            current.actionSequences[actionTag].list = [];

            var badgeTypes = {},
                templates = {};
            _.each(BADGE_CFG, function (arr, key) {
                _.each(arr, function (ext) { badgeTypes[ext] = key; });
            });
            _.each(TEMPLATE_CFG, function (arr, key) {
                _.each(arr, function (ext) { templates[ext] = key; });
            });

            // Define new properties for tags display
            var tag = _.find(current.tags, function (t) { return t.tag == actionTag; });
            if (tag) {
                current.actionSequences[actionTag].enabled = true;

                var temp = _.chain(tag.data)
                            .map(function (e, i) { return (GROUP_CFG.indexOf(e.ext) > -1) ? i : -1; })
                            .filter(function (i) { return i > -1; })
                            .value();
                var groups = {},
                    groupIDs = {};
                _.each(temp, function (id, i, list) {
                    var start, end;
                    if (i === 0) {
                        start = 0;
                        end = id+1; 
                    } else {
                        start = list[i-1]+1;
                        end = id+1;
                    }
                    groups[id] = _.range(start, end);
                });
                _.each(groups, function (arr, key) {
                    key = parseInt(key);
                    _.each(arr, function (i) { groupIDs[i] = key; });
                    groupIDs[key] = key;
                });

                _.each(tag.data, function (e, i) {
                    var badge = {
                            type: badgeTypes[e.ext]//,
                            //value: null
                        },
                        template = templates[e.ext],
                        action = {
                            id: formatCtrlId(e.ext, i),
                            //label: null
                            //value: null
                        };

                    var test;
                    // Default Action Sequence
                    if (e.ext == ACTION_ANIMATION) {
                        action.label = "Action Animation";
                        test = true;
                    }
                    else if (e.ext == ACTION_ANIMATION_2) {
                        action.label = "Action Animation";
                        action.targetID = e.data[0];
                        action.mirrored = (e.data[1] == "mirror") ? true: false;

                        test = true;
                    }
                    else if (e.ext == ACTION_EFFECT) {
                        action.label = "Action Effect";

                        test = true;
                    }
                    else if (e.ext == ACTION_EFFECT_2) {
                        action.label = "Action Effect";
                        action.targetID = e.data[0];

                        test = true;
                    }
                    else if (e.ext == WAIT) {
                        action.label = "Wait";
                        badge.isSum = true;

                        action.value = e.data;

                        test = true;
                    }

                    // Action Sequence Pack 1
                    // TODO

                    // Action Sequence Pack 2
                    if (e.ext == FADE_OUT) {
                        action.label = "Fade out";
                        action.value = e.data;

                        test = true;
                    }
                    else if (e.ext == FADE_IN) {
                        action.label = "Fade in";
                        action.value = e.data;

                        test = true;
                    }
                    // TODO

                    // Action Sequence Pack 3
                    // TODO

                    // TODO
                    if (test)
                    current.actionSequences[actionTag].list.push({
                        badge: badge,
                        heading: action.label,
                        template: template,
                        action: action,
                        groupID: (groupIDs[i]) ? groupIDs[i]: -1,
                        has_children: (groups[i] && groups[i].length > 0) ? true: false,
                        can_edit: (template !== "tplNotEditable") ? true: false
                    });
                });
            }

            var data = {}
            _.each(current.actionSequences, function (d, key) {
                data[key] = new InlineEditTimelineDataInfo(d.enabled, d.list);
            });

            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            // Default Action Sequence
            // Action Sequence Pack 1
            // Action Sequence Pack 2 
            // Action Sequence Pack 3
            //TODO

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.addExtension = function (ext) {
            var badgeTypes = {},
                templates = {};
            _.each(BADGE_CFG, function (arr, key) {
                _.each(arr, function (ext) { badgeTypes[ext] = key; });
            });
            _.each(TEMPLATE_CFG, function (arr, key) {
                _.each(arr, function (ext) { templates[ext] = key; });
            });

            var state_data = this.getStateManager().getState(STATE_KEY).data;
            state_data[actionTag].enabled = true;

            var badge = {
                type: badgeTypes[ext]//,
                //value: null
            },
            template = templates[ext],
            action = {
                id: formatCtrlId(ext, state_data[actionTag].data.length),
                //label: null
                //value: null
            };

            // Default Action Sequence
            if (ext == ACTION_ANIMATION || ext == ACTION_ANIMATION_2) {
                action.label = "Action Animation";
            }
            else if (ext == ACTION_EFFECT || ext == ACTION_EFFECT_2) {
                action.label = "Action Effect";
            }
            else if (ext == WAIT) {
                action.label = "Wait";
                badge.isSum = true;
            }

            // Action Sequence Pack 1
            // TODO

            // Action Sequence Pack 2
            if (ext == FADE_OUT) {
                action.label = "Fade out";
            }
            else if (ext == FADE_IN) {
                action.label = "Fade in";
            }

            timeline_partial.addItem({
                badge: badge,
                heading: action.label,
                template: template,
                action: action,
                groupID: -1,
                has_children: false,
                can_edit: (template !== "tplNotEditable") ? true : false
            });

            this.getStateManager().setState(STATE_KEY, state_data);

        };

        this.saveAction = function (obj) {
            if (obj.template == "tplCheckOnly") {
                obj.action.value = $('#chk' + obj.action.id).val();
            }
            else if (obj.template == "tplNumericOnly") {
                obj.action.value = $('#num' + obj.action.id).val();
            }
            else if (obj.template == "tplTargets") {
                if ($('#chk' + obj.action.id).is(':checked'))
                    obj.action.targetID = $('#ddl' + obj.action.id).val();
                else
                    obj.action.targetID = null;
            }
            else if (obj.template == "tplTargetsMirror") {
                if ($('#chk' + obj.action.id).is(':checked'))
                    obj.action.targetID = $('#ddl' + obj.action.id).val();
                else
                    obj.action.targetID = null;
                obj.action.mirrored = $('#chkMirror' + obj.action.id).is(':checked');
            }
            // TODO
            //var skillID = $('#ddlSkillCooldownDuration').val();
            //var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            //obj.skillID = skill.id;
            //obj.skill = skill.name;
            //obj.duration = $('#numSkillCooldownDuration').val();
        };

        this.editAction = function (edit) {
            if(edit)
                $('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            else
                $('input[type="checkbox"]').bootstrapSwitch('destroy');
        };

        this.initialize();

    };

});

