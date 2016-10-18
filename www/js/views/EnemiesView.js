define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        TypeAhead = require('bootstrap-typeahead'),
        tagReader = require('app/tag-reader'),
        CarouselPartialView = require("partial/CarouselPartialView"),
        TagGeneratorPartialView = require("partial/TagGeneratorPartialView"),
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
        SkillColldownsPartialView = require("partial/enemies/SkillCooldownsPartialView"),
        InstantCastPartialView = require("partial/enemies/InstantCastPartialView"),
        WeaponUnleashPartialView = require("partial/enemies/WeaponUnleashPartialView"),
        AutoPassiveStatesPartialView = require("partial/enemies/AutoPassiveStatesPartialView"),
        EnemyLevelsPartialView = require("partial/enemies/EnemyLevelsPartialView"),
        SwapEnemiesPartialView = require("partial/enemies/SwapEnemiesPartialView"),
        enemiesHtml = require('text!tpl/enemies.htm'),

        enemiesTpl = Handlebars.compile(enemiesHtml);


    return function (project, enemies, current, linked_data, $stateManager) {

        var collapsed = true,
            base_url = "#project/" + project.id + "/enemies",
            tag_partials = {
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
                'limited_skill_uses': new LimitedSkillUsesPartialView(current, linked_data, $stateManager),
                'job_points': new JobPointsPartialView(current),
                'row_formation': new RowFormationPartialView(current),
                'weapon_animation_settings': new WeaponAnimationSettingsPartialView(current, linked_data),
                'skill_cooldowns': new SkillColldownsPartialView(current, linked_data, $stateManager),
                'instant_cast': new InstantCastPartialView(current, linked_data, $stateManager),
                'weapon_unleash': new WeaponUnleashPartialView(current, linked_data, $stateManager),
                'auto_passive_states': new AutoPassiveStatesPartialView(current, linked_data, $stateManager),
                'enemy_levels': new EnemyLevelsPartialView(current, linked_data, $stateManager),
                'swap_enemies': new SwapEnemiesPartialView(current, linked_data, $stateManager)
            },
            partials = {
                'carousel': new CarouselPartialView(base_url, enemies, 15),
                'tag_generator': new TagGeneratorPartialView(tag_partials)
            }   

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for Quick Access buttons
            this.$el.on('click', '.js_SaveQuickAccess', function () {
                var selected = $('#txtQuickAccess').typeahead("getActive");
                if (selected) {
                    window.location.hash = selected.url;
                }
            });
            this.$el.on('click', '.js_ClearQuickAccess', function () {
                $('#txtQuickAccess').val('');
            });

            // Click Event for ToggleAll button
            this.$el.on('click', '#btnToggleAll', function () {
                var body = $('body');
                collapsed = toggleAll(body, collapsed);
            });

            // Click Event for ScrollUp button
            this.$el.on('click', '#btnScrollUp', function () {
                scrollUp();
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
            var renderedPartials = _.mapObject(_.extend({}, partials, tag_partials), function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('#sidebar').affix(UIConfig.affix.sidebar);
            setActiveMenuItem(this.$el, base_url + '/' + current.id);

            var source = _.map(enemies, function (e) { return { id: e.id, name: e.name, url:base_url + '/' + e.id }; });
            this.$el.find('#txtQuickAccess').typeahead(UIConfig.typeahead.custom(source));

            return this;
        };

        this.initialize();

    };

});

