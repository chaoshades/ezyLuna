define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        PageMe = require('jquery.pageme'),
        tagReader = require('app/tag-reader'),
        GeneralSettingsPartialView = require("partial/enemies/GeneralSettingsPartialView"),
        TraitsPartialView = require("partial/enemies/TraitsPartialView"),
        RewardsPartialView = require("partial/enemies/RewardsPartialView"),
        DropItemsPartialView = require("partial/enemies/DropItemsPartialView"),
        ActionPatternsPartialView = require("partial/enemies/ActionPatternsPartialView"),
        NotePartialView = require("partial/NotePartialView"),
        BattleSettingsPartialView = require("partial/enemies/BattleSettingsPartialView"),
        AnimatedSideViewSettingsPartialView = require("partial/enemies/AnimatedSideViewSettingsPartialView"),
        enemiesHtml = require('text!tpl/enemies.htm'),

        enemiesTpl = Handlebars.compile(enemiesHtml);


    return function (enemies, current, linked_data) {

        var partials = {
            'general_settings': new GeneralSettingsPartialView(current),
            'traits': new TraitsPartialView(current, linked_data),
            'rewards': new RewardsPartialView(current, linked_data),
            'drop_items': new DropItemsPartialView(current, linked_data),
            'action_patterns': new ActionPatternsPartialView(current, linked_data),
            'note': new NotePartialView(current),
            'battle_settings': new BattleSettingsPartialView(current, linked_data),
            'animated_sideview_settings': new AnimatedSideViewSettingsPartialView(current)
        };

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for sidebar buttons
            this.$el.on('click', '.list-group-item', function () {
                $('.list-group > .active').removeClass('active');
                $(this).addClass('active');
            });

            // Click Event for GenerateTags button
            var generateTagsCallback = this.generateTags;
            this.$el.on('click', '#btnGenerateTags', function () {
                generateTagsCallback();
            });

            // Carousel Navigation Events
            this.$el.on('click', '.next-slider', function () {
                $('.carousel').carousel('next');
                return false;
            });
            this.$el.on('click', '.prev-slider', function () {
                $('.carousel').carousel('prev');
                return false;
            });
        };

        this.render = function () {
            var paged_enemies = [];
            var temp = enemies.slice(0);
            while (temp.length > 0) {
                paged_enemies.push(temp.splice(0, 15));
            }

            // Run parsers on note to read tags
            current.tags = tagReader.getNoteTagsFromString(current.note);

            var renderedPartials = _.mapObject(partials, function (p, key) { return p.render().$el.html(); });

            var data = {
                'partials': renderedPartials,
                'paged_enemies': paged_enemies,
                'current': current
            };
            this.$el.html(enemiesTpl(data));

            this.setActiveMenuItem(current.id);

            this.$el.find('#successTags').hide();
            this.$el.find('#errorNoTags').hide();

            // Enables carousel
            this.$el.find('.carousel').carousel({
                interval: false
            });
            
            this.$el.find('.carousel .item:has(.list-group a.active)').addClass('active');

            // Adds pagers to tables
            this.$el.find('#tblTraits').pageMe({ pagerSelector: this.$el.find('#pgTraits'), showPrevNext: true, hidePageNumbers: false, perPage: 12 });
            this.$el.find('#tblActions').pageMe({ pagerSelector: this.$el.find('#pgActions'), showPrevNext: true, hidePageNumbers: false, perPage: 8 });

            return this;
        };

        this.clearActiveMenuItem = function () {
            this.$el.find('.list-group > .active').removeClass('active');
        };

        this.setActiveMenuItem = function (id) {
            this.clearActiveMenuItem();
            this.$el.find('.list-group a[href="#enemies/' + id + '"]').addClass('active');
        };

        this.generateTags = function (setValueTagCallback, setTagCallback, setPercentValueTagCallback) {
            var tags = [];
            // Core Settings
            tags = tags.concat(partials['general_settings'].generateTags());
            tags = tags.concat(partials['rewards'].generateTags());

            // Battle Settings
            tags = tags.concat(partials['battle_settings'].generateTags());

            // Animated SideView Settings
            tags = tags.concat(partials['animated_sideview_settings'].generateTags());

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

