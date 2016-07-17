define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        weaponAnimationSettingsHtml = require('text!partialtpl/enemies/weaponAnimationSettings.htm'),

        weaponAnimationSettingsTpl = Handlebars.compile(weaponAnimationSettingsHtml),

        WEAPON_IMAGE = "Weapon Image",
        WEAPON_IMAGE_2 = "Weapon Image#2",
        WEAPON_MOTION = "Weapon Motion",
        WEAPON_HUE = "Weapon Hue",
        WEAPON_ANIMATION = "Weapon Animation";


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
                'weapon_sprites': linked_data.weapon_sprites,
                'motions': linked_data.motions,
                'animations': linked_data.animations
            };
            this.$el.html(weaponAnimationSettingsTpl(data));

            // Initial Display
            openCollapse(this.$el.find('#collapseWeaponAnimationSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            current.weaponAnimation = {};

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == WEAPON_IMAGE) {
                    current.weaponAnimation.spriteID = t.data;
                }
                else if (t.tag == WEAPON_IMAGE_2) {
                    current.weaponAnimation.imageFile = t.data;
                }
                else if (t.tag == WEAPON_MOTION) {
                    current.weaponAnimation.motionID = t.data;
                }
                else if (t.tag == WEAPON_HUE) {
                    current.weaponAnimation.hue = t.data;
                }
                else if (t.tag == WEAPON_ANIMATION) {
                    current.weaponAnimation.animationID = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkWeaponAnimationSprite', WEAPON_IMAGE, '#ddlWeaponAnimationSprite');
            setValueTag(tags, '#chkWeaponAnimationImage', WEAPON_IMAGE_2, '#txtWeaponAnimationImage');
            setValueTag(tags, '#chkWeaponAnimationMotion', WEAPON_MOTION, '#ddlWeaponAnimationMotion');
            setValueTag(tags, '#chkWeaponAnimationHue', WEAPON_HUE, '#numWeaponAnimationHue');
            setValueTag(tags, '#chkWeaponAnimation', WEAPON_ANIMATION, '#ddlWeaponAnimation');

            return tags;
        };

        this.initialize();

    };

});

