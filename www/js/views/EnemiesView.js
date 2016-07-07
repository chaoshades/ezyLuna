define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
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
        enemiesHtml = require('text!tpl/enemies.htm'),

        enemiesTpl = Handlebars.compile(enemiesHtml),
            
        BASE_URL = "#enemies";


    return function (enemies, current, linked_data) {

        var partials = {
            'carousel': new CarouselPartialView(BASE_URL, enemies, 15),
            'general_settings': new GeneralSettingsPartialView(current),
            'traits': new TraitsPartialView(current, linked_data),
            'rewards': new RewardsPartialView(current),
            'drop_items': new DropItemsPartialView(current, linked_data),
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
            'limited_skill_uses': new LimitedSkillUsesPartialView(current, linked_data)
        };

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for GenerateTags button
            var generateTagsCallback = this.generateTags;
            this.$el.on('click', '#btnGenerateTags', function () {
                generateTagsCallback();
            });
        };

        this.render = function () {
            // Run parsers on note to read tags
            current.tags = tagReader.getNoteTagsFromString(current.note);

            // Render view
            this.$el.html(enemiesTpl(current));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            setActiveMenuItem(this.$el, BASE_URL + '/' + current.id);
            this.$el.find('#successTags').hide();
            this.$el.find('#errorNoTags').hide();

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
            if (output)
                $('#successTags').show();
            else
                $('#errorNoTags').show();

            $('#txtOutput').val(output);
        };

        this.initialize();

    };

});

