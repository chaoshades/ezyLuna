define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        TypeAhead = require('bootstrap-typeahead'),
        Sortable = require('sortable'),
        tagReader = require('app/tag-reader'),
        CarouselPartialView = require("partial/CarouselPartialView"),
        TagGeneratorPartialView = require("partial/TagGeneratorPartialView"),
        ExtensionToolboxPartialView = require("partial/ExtensionToolboxPartialView"),
        skillsActionHtml = require('text!tpl/skillsAction.htm'),

        skillsActionTpl = Handlebars.compile(skillsActionHtml);


    return function (project, skills, current) {

        var collapsed = true,
            base_url = "#project/" + project.id + "/skills/action",
            tag_partials = {
            },
            partials = {
                'carousel': new CarouselPartialView(base_url, skills, 15),
                'tag_generator': new TagGeneratorPartialView(tag_partials),
                'extension_toolbox': new ExtensionToolboxPartialView(tagReader.getSupportedPlugins(false, true), "YEP_BattleEngineCore", 15)
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
                if (collapsed)
                    $('.timeline.nested').removeClass('hide');
                else
                    $('.timeline.nested').addClass('hide');

                collapsed = !collapsed;
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
            this.$el.html(skillsActionTpl(current));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('.sidebar').affix(UIConfig.affix.sidebar);
            setActiveMenuItem(this.$el, base_url + '/' + current.id);
            Sortable.create(this.$el.find(".timeline").get(0), {animation: 150, handle: '.timeline-badge'});
            _.each(this.$el.find(".timeline.nested"), function(obj) {
                //Sortable.create(obj);
                Sortable.create(obj, {
                    group: 'action',
                    animation: 150, handle: '.timeline-badge'
                });
            });

            var source = _.map(skills, function (s) { return { id: s.id, name: s.name, url: base_url + '/' + s.id }; });
            this.$el.find('#txtQuickAccess').typeahead(UIConfig.typeahead.custom(source));

            return this;
        };

        this.initialize();

    };

});

