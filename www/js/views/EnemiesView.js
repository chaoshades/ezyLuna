define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        Clipboard = require('clipboard'),
        tagReader = require('app/tag-reader'),
        CarouselPartialView = require("partial/CarouselPartialView"),
        GeneralSettingsPartialView = require("partial/enemies/GeneralSettingsPartialView"),
        TraitsPartialView = require("partial/enemies/TraitsPartialView"),
        RewardsPartialView = require("partial/enemies/RewardsPartialView"),
        DropItemsPartialView = require("partial/enemies/DropItemsPartialView"),
        ActionPatternsPartialView = require("partial/enemies/ActionPatternsPartialView"),
        NotePartialView = require("partial/NotePartialView"),
        BattleSettingsPartialView = require("partial/enemies/BattleSettingsPartialView"),
        AnimatedSideViewSettingsPartialView = require("partial/enemies/AnimatedSideViewSettingsPartialView"),
        ActiveTurnBattleSettingsPartialView = require("partial/enemies/ActiveTurnBattleSettingsPartialView"),
        VisualATBGaugePartialView = require("partial/enemies/VisualATBGaugePartialView"),
        ChargeTurnBattleSettingsPartialView = require("partial/enemies/ChargeTurnBattleSettingsPartialView"),
        VisualHPGaugesPartialView = require("partial/enemies/VisualHPGaugesPartialView"),
        BuffsStatesPartialView = require("partial/enemies/BuffsStatesSettingsPartialView"),
        DamageSettingsPartialView = require("partial/enemies/DamageSettingsPartialView"),
        ArmorScalingPartialView = require("partial/enemies/ArmorScalingPartialView"),
        TauntSettingsPartialView = require("partial/enemies/TauntSettingsPartialView"),
        LimitedSkillUsesPartialView = require("partial/enemies/LimitedSkillUsesPartialView"),
        JobPointsPartialView = require("partial/enemies/JobPointsPartialView"),
        RowFormationPartialView = require("partial/enemies/RowFormationPartialView"),
        WeaponAnimationSettingsPartialView = require("partial/enemies/WeaponAnimationSettingsPartialView"),
        EnemyLevelsPartialView = require("partial/enemies/EnemyLevelsPartialView"),
        SkillColldownsPartialView = require("partial/enemies/SkillCooldownsPartialView"),
        enemiesHtml = require('text!tpl/enemies.htm'),

        enemiesTpl = Handlebars.compile(enemiesHtml);


    return function (project, enemies, current, linked_data, $stateManager) {

        var base_url = "#project/" + project.id + "/enemies",
            partials = {
                'carousel': new CarouselPartialView(base_url, enemies, 15),
                'general_settings': new GeneralSettingsPartialView(current),
                'traits': new TraitsPartialView(current, linked_data),
                'rewards': new RewardsPartialView(current),
                'drop_items': new DropItemsPartialView(current, linked_data, $stateManager),
                'action_patterns': new ActionPatternsPartialView(current, linked_data),
                'note': new NotePartialView(current),
                'battle_settings': new BattleSettingsPartialView(current, linked_data),
                'animated_sideview_settings': new AnimatedSideViewSettingsPartialView(current, linked_data),
                'active_turn_battle_settings': new ActiveTurnBattleSettingsPartialView(current),
                'visual_atb_gauge': new VisualATBGaugePartialView(current),
                'charge_turn_battle_settings': new ChargeTurnBattleSettingsPartialView(current),
                'visual_hp_gauges': new VisualHPGaugesPartialView(current),
                'buffs_states': new BuffsStatesPartialView(current),
                'damage_settings': new DamageSettingsPartialView(current),
                'armor_scaling': new ArmorScalingPartialView(current),
                'taunt_settings': new TauntSettingsPartialView(current),
                'limited_skill_uses': new LimitedSkillUsesPartialView(current, linked_data),
                'job_points': new JobPointsPartialView(current),
                'row_formation': new RowFormationPartialView(current),
                'weapon_animation_settings': new WeaponAnimationSettingsPartialView(current, linked_data),
                'enemy_levels': new EnemyLevelsPartialView(current, linked_data, $stateManager),
                'skill_cooldowns': new SkillColldownsPartialView(current, linked_data, $stateManager)
            }   

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for GenerateTags button
            var generateTagsCallback = this.generateTags;
            this.$el.on('click', '#btnGenerateTags', function () {
                generateTagsCallback();
            });

            // Click Event for GenerateTags button
            this.$el.on('click', '#btnCopyClipboard', function () {
                $('#successCopy').hide();
                $('#errorCopy').hide();
                $('#errorNoCopy').hide();
                var output = $('#txtOutput').val();
                if (!output)
                    $('#errorNoCopy').show();
                else
                    Clipboard.copy(output).then(function () {
                        $('#successCopy').show();
                    }, function (err) {
                        $('#errorCopy').show();
                    });
            });

            this.$settings = {
                menu: {
                    active: base_url
                },
                project: project
            };
        };

        this.render = function () {
            // Run parsers on note to read tags
            current.tags = tagReader.getNoteTagsFromString(current.note);
            current.url = project.url;

            // Render view
            this.$el.html(enemiesTpl(current));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            setActiveMenuItem(this.$el, base_url + '/' + current.id);
            this.$el.find('#successTags').hide();
            this.$el.find('#errorNoTags').hide();
            this.$el.find('#successCopy').hide();
            this.$el.find('#errorCopy').hide();
            this.$el.find('#errorNoCopy').hide();

            return this;
        };

        this.generateTags = function (setValueTagCallback, setTagCallback, setPercentValueTagCallback) {
            var tags = [];

            // Generate tags from every partials (if method is defined)
            _.each(partials, function (p) {
                if (p.generateTags)
                    tags = tags.concat(p.generateTags());
            });

            // Run parsers on tags to output notetags
            var output = tagReader.getStringFromNoteTags(tags);

            $('#successTags').hide();
            $('#errorNoTags').hide();
            $('#successCopy').hide();
            $('#errorNoCopy').hide();
            if (output)
                $('#successTags').show();
            else
                $('#errorNoTags').show();

            $('#txtOutput').val(output);
        };

        this.initialize();

    };

});

