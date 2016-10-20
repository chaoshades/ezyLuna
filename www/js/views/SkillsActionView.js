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
        QuickAccessPartialView = require("partial/QuickAccessPartialView"),
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
                'extension_toolbox': new ExtensionToolboxPartialView(tagReader.getSupportedPlugins(false, true), "YEP_BattleEngineCore", 15),
                'quick_access': new QuickAccessPartialView(_.map(skills, function (s) { return new QuickAccessItem(s.id, s.name, base_url + '/' + s.id) }), "List", "Select skill:")
            }

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            this.$settings = {
                events: [
                    // Click Event for Toggle All quick link
                    { event: 'click', selector: '#btnToggleAll', handler: this.toggleAllHandler },
                    // Click Event for Tag Generator quick link
                    { event: 'click', selector: '#btnTagGenerator', handler: this.scrollToTagGenerator }
                ],
                menu: {
                    active: base_url,
                    enableToggleAll: true,
                    enableTagGenerator: true
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

            return this;
        };

        this.toggleAllHandler = function () {
            if (collapsed)
                $('.timeline.nested').removeClass('hide');
            else
                $('.timeline.nested').addClass('hide');

            collapsed = !collapsed;
            return false;
        };

        this.scrollToTagGenerator = function () {
            scrollToDiv($('#tag_generator'));
            return false;
        };

        this.initialize();

    };

});

