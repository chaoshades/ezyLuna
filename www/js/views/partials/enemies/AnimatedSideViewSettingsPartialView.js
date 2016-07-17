define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        animatedSideViewSettingsHtml = require('text!partialtpl/enemies/animatedSideViewSettings.htm'),

        animatedSideViewSettingsTpl = Handlebars.compile(animatedSideViewSettingsHtml),

        BREATHING = "Breathing",
        NO_BREATHING = "No Breathing",
        BREATHING_SPEED = "Breathing Speed",
        BREATHING_RATE_X = "Breathing Rate X",
        BREATHING_RATE_Y = "Breathing Rate Y",
        FLOATING = "Floating",
        FLOATING_SPEED = "Floating Speed",
        FLOATING_HEIGHT = "Floating Height",
        SCALE_SPRITE = "Scale Sprite",
        SCALE_SPRITE_WIDTH = "Scale Sprite Width",
        SCALE_SPRITE_HEIGHT = "Scale Sprite Height",
        SIDEVIEW_BATTLER = "Sideview Battler",
        SIDEVIEW_ANCHOR_X = "Sideview Anchor X",
        SIDEVIEW_ANCHOR_Y = "Sideview Anchor Y",
        SIDEVIEW_WIDTH = "Sideview Width",
        SIDEVIEW_HEIGHT = "Sideview Height",
        SIDEVIEW_COLLAPSE = "Sideview Collapse",
        SIDEVIEW_NO_COLLAPSE = "Sideview No Collapse",
        SIDEVIEW_FRAME_SPEED = "Sideview Frame Speed",
        SIDEVIEW_ATTACK_MOTION = "Sideview Attack Motion",
        SIDEVIEW_WEAPON = "Sideview Weapon",
        SIDEVIEW_IDLE_MOTION = "Sideview Idle Motion",
        SIDEVIEW_DAMAGE_MOTION = "Sideview Damage Motion",
        SIDEVIEW_EVADE_MOTION = "Sideview Evade Motion",
        SIDEVIEW_ESCAPE_MOTION = "Sideview Escape Motion",
        SIDEVIEW_GUARD_MOTION = "Sideview Guard Motion",
        SIDEVIEW_ABNORMAL_MOTION = "Sideview Abnormal Motion",
        SIDEVIEW_SLEEP_MOTION = "Sideview Sleep Motion",
        SIDEVIEW_DYING_MOTION = "Sideview Dying Motion",
        SIDEVIEW_SHOW_SHADOW = "Sideview Show Shadow",
        SIDEVIEW_HIDE_SHADOW = "Sideview Hide Shadow",
        SIDEVIEW_SHADOW_WIDTH = "Sideview Shadow Width",
        SIDEVIEW_SHADOW_HEIGHT = "Sideview Shadow Height",
        HIDE_SIDEVIEW_WEAPON = "Hide Sideview Weapon";


    return function (current, linked_data) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            this.$el.on('switchChange.bootstrapSwitch', '.js_Tags', function () {
                enableInputs(this);
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'weapon_sprites': linked_data.weapon_sprites,
                'motions': linked_data.motions,
                'weapon_motions': [{ id: null, name: "Disabled" }].concat(linked_data.motions),
                'weapon_animations': [{ id:null, name:"Disabled" }].concat(linked_data.animations)
            };
            this.$el.html(animatedSideViewSettingsTpl(data));

            // Initial Display
            openCollapse(this.$el.find('#collapseAnimatedSideViewSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            current.breathing = {};
            current.floating = {};
            current.scale = {};
            current.sideview = {};
            current.sideview.weapon = {};
            current.sideview.shadow = {};

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == BREATHING) {
                    current.breathing.enabled = true;
                    current.breathing.yes = true;
                }
                else if (t.tag == NO_BREATHING) {
                    current.breathing.enabled = true;
                    current.breathing.no = true;
                }
                else if (t.tag == BREATHING_SPEED) {
                    current.breathing.speed = t.data;
                }
                else if (t.tag == BREATHING_RATE_X) {
                    current.breathing.rateX = t.data * 100;
                }
                else if (t.tag == BREATHING_RATE_Y) {
                    current.breathing.rateY = t.data * 100;
                }

                if (t.tag == FLOATING) {
                    current.floating.enabled = true;
                }
                else if (t.tag == FLOATING_SPEED) {
                    current.floating.speed = t.data;
                }
                else if (t.tag == FLOATING_HEIGHT) {
                    current.floating.height = t.data;
                }

                if (t.tag == SCALE_SPRITE) {
                    current.scale.rate = t.data;
                }
                else if (t.tag == SCALE_SPRITE_WIDTH) {
                    current.scale.width = t.data;
                }
                else if (t.tag == SCALE_SPRITE_HEIGHT) {
                    current.scale.height = t.data;
                }

                if (t.tag == SIDEVIEW_BATTLER) {
                    current.sideview.battler = t.data;
                }
                else if (t.tag == SIDEVIEW_ANCHOR_X) {
                    current.sideview.anchorX = {
                        x: t.data[0],
                        y: t.data[1]
                    };
                }
                else if (t.tag == SIDEVIEW_ANCHOR_Y) {
                    current.sideview.anchorY = {
                        x: t.data[0],
                        y: t.data[1]
                    };
                }
                else if (t.tag == SIDEVIEW_WIDTH) {
                    current.sideview.width = t.data;
                }
                else if (t.tag == SIDEVIEW_HEIGHT) {
                    current.sideview.height = t.data;
                }
                else if (t.tag == SIDEVIEW_COLLAPSE) {
                    current.sideview.collapse.enabled = true;
                    current.sideview.collapse.yes = true;
                }
                else if (t.tag == SIDEVIEW_NO_COLLAPSE) {
                    current.sideview.collapse.enabled = true;
                    current.sideview.collapse.no = true;
                }
                else if (t.tag == SIDEVIEW_FRAME_SPEED) {
                    current.sideview.frameSpeed = t.data;
                }
                else if (t.tag == SIDEVIEW_ATTACK_MOTION) {
                    current.sideview.attackMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_WEAPON) {
                    current.sideview.weapon.enabled = true;
                    current.sideview.weapon.spriteID = t.data[0];
                    if (t.length > 1) {
                        current.sideview.weapon.motionID = t.data[1];
                        current.sideview.weapon.animationID = t.data[2];
                    }
                    else {
                        current.sideview.weapon.motionID = -1;
                        current.sideview.weapon.animationID = -1;
                    }
                }
                else if (t.tag == SIDEVIEW_IDLE_MOTION) {
                    current.sideview.idleMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_DAMAGE_MOTION) {
                    current.sideview.damageMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_EVADE_MOTION) {
                    current.sideview.evadeMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_ESCAPE_MOTION) {
                    current.sideview.escapeMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_GUARD_MOTION) {
                    current.sideview.guardMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_ABNORMAL_MOTION) {
                    current.sideview.abnormalMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_SLEEP_MOTION) {
                    current.sideview.sleepMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_DYING_MOTION) {
                    current.sideview.dyingMotionID = t.data;
                }
                else if (t.tag == SIDEVIEW_SHOW_SHADOW) {
                    current.sideview.shadow.enabled = true;
                    current.sideview.shadow.show = true;
                }
                else if (t.tag == SIDEVIEW_HIDE_SHADOW) {
                    current.sideview.shadow.enabled = true;
                    current.sideview.shadow.hide = true;
                }
                else if (t.tag == SIDEVIEW_SHADOW_WIDTH) {
                    current.sideview.shadow.width = t.data;
                }
                else if (t.tag == SIDEVIEW_SHADOW_HEIGHT) {
                    current.sideview.shadow.height = t.data;
                }
                else if (t.tag == HIDE_SIDEVIEW_WEAPON) {
                    current.sideview.weapon.enabled = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            if ($('#chkBreathing').is(':checked')) {
                setTag(tags, '#radBreathing', BREATHING);
                setTag(tags, '#radNoBreathing', NO_BREATHING);
            }
            setValueTag(tags, '#chkBreathingSpeed', BREATHING_SPEED, '#numBreathingSpeed');
            setPercentValueTag(tags, '#chkBreathingRateX', BREATHING_RATE_X, '#numBreathingRateX');
            setPercentValueTag(tags, '#chkBreathingRateY', BREATHING_RATE_Y, '#numBreathingRateY');

            setTag(tags, '#chkFloating', FLOATING);
            setValueTag(tags, '#chkFloatingSpeed', FLOATING_SPEED, '#numFloatingSpeed');
            setValueTag(tags, '#chkFloatingHeight', FLOATING_HEIGHT, '#numFloatingHeight');

            setValueTag(tags, '#chkScaleSprite', SCALE_SPRITE, '#numScaleSprite');
            setValueTag(tags, '#chkScaleSpriteWidth', SCALE_SPRITE_WIDTH, '#numScaleSpriteWidth');
            setValueTag(tags, '#chkScaleSpriteHeight', SCALE_SPRITE_HEIGHT, '#numScaleSpriteHeight');

            setValueTag(tags, '#chkSideViewBattler', SIDEVIEW_BATTLER, '#txtSideViewBattler');
            setValuesTag(tags, '#chkSideViewAnchorX', SIDEVIEW_ANCHOR_X, ['#numSideViewAnchorX_x', '#numSideViewAnchorX_y']);
            setValuesTag(tags, '#chkSideViewAnchorY', SIDEVIEW_ANCHOR_Y, ['#numSideViewAnchorY_x', '#numSideViewAnchorY_y']);
            setValueTag(tags, '#chkSideViewWidth', SIDEVIEW_WIDTH, '#numSideViewWidth');
            setValueTag(tags, '#chkSideViewHeight', SIDEVIEW_HEIGHT, '#numSideViewHeight');
            if ($('#chkSideViewCollapse').is(':checked')) {
                setTag(tags, '#radCollapse', SIDEVIEW_COLLAPSE);
                setTag(tags, '#radNoCollapse', SIDEVIEW_NO_COLLAPSE);
            }
            setValueTag(tags, '#chkSideViewFrameSpeed', SIDEVIEW_FRAME_SPEED, '#numSideViewFrameSpeed');
            setValueTag(tags, '#chkSideViewAttackMotion', SIDEVIEW_ATTACK_MOTION, '#ddlSideViewAttackMotion');
            setValuesTag(tags, '#chkSideViewWeapon', SIDEVIEW_WEAPON, ['#ddlSideViewWeaponSprite', '#ddlSideViewWeaponMotion', '#ddlSideViewWeaponAnimation']);
            setValueTag(tags, '#chkSideViewIdleMotion', SIDEVIEW_IDLE_MOTION, '#ddlSideViewIdleMotion');
            setValueTag(tags, '#chkSideViewDamageMotion', SIDEVIEW_DAMAGE_MOTION, '#ddlSideViewDamageMotion');
            setValueTag(tags, '#chkSideViewEvadeMotion', SIDEVIEW_EVADE_MOTION, '#ddlSideViewEvadeMotion');
            setValueTag(tags, '#chkSideViewEscapeMotion', SIDEVIEW_ESCAPE_MOTION, '#ddlSideViewEscapeMotion');
            setValueTag(tags, '#chkSideViewGuardMotion', SIDEVIEW_GUARD_MOTION, '#ddlSideViewGuardMotion');
            setValueTag(tags, '#chkSideViewAbnormalMotion', SIDEVIEW_ABNORMAL_MOTION, '#ddlSideViewAbnormalMotion');
            setValueTag(tags, '#chkSideViewSleepMotion', SIDEVIEW_SLEEP_MOTION, '#ddlSideViewSleepMotion');
            setValueTag(tags, '#chkSideViewDyingMotion', SIDEVIEW_DYING_MOTION, '#ddlSideViewDyingMotion');
            if ($('#chkSideViewShowShadow').is(':checked')) {
                setTag(tags, '#radShowShadow', SIDEVIEW_SHOW_SHADOW);
                setTag(tags, '#radHideShadow', SIDEVIEW_HIDE_SHADOW);
            }
            setValueTag(tags, '#chkSideViewShadowWidth', SIDEVIEW_SHADOW_WIDTH, '#numSideViewShadowWidth');
            setValueTag(tags, '#chkSideViewShadowHeight', SIDEVIEW_SHADOW_HEIGHT, '#numSideViewShadowHeight');
            setTag(tags, '#chkHideSideViewWeapon', HIDE_SIDEVIEW_WEAPON);

            return tags;
        };

        this.initialize();

    };

});

