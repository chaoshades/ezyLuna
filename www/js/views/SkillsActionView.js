define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        tagReader = require('app/tag-reader'),
        CarouselPartialView = require("partial/CarouselPartialView"),
        TagGeneratorPartialView = require("partial/TagGeneratorPartialView"),
        ExtensionToolboxPartialView = require("partial/ExtensionToolboxPartialView"),
        QuickAccessPartialView = require("partial/QuickAccessPartialView"),
        ActionSequencesPartialView = require("partial/actions/ActionSequencesPartialView"),
        skillsActionHtml = require('text!tpl/skillsAction.htm'),

        skillsActionTpl = Handlebars.compile(skillsActionHtml),
            
        SETUP_ACTION = "Setup Action",
        WHOLE_ACTION = "Whole Action",
        TARGET_ACTION = "Target Action",
        FOLLOW_ACTION = "Follow Action",
        FINISH_ACTION = "Finish Action";


    return function (project, skills, current, linked_data, $stateManager) {

        var collapsed = true,
            base_url = "#project/" + project.id + "/skills/action",
            tag_partials = {
                'setup': new ActionSequencesPartialView(current, linked_data, $stateManager, SETUP_ACTION),
                'whole': new ActionSequencesPartialView(current, linked_data, $stateManager, WHOLE_ACTION),
                'target': new ActionSequencesPartialView(current, linked_data, $stateManager, TARGET_ACTION),
                'follow': new ActionSequencesPartialView(current, linked_data, $stateManager, FOLLOW_ACTION),
                'finish': new ActionSequencesPartialView(current, linked_data, $stateManager, FINISH_ACTION)
            },
            partials = {
                'carousel': new CarouselPartialView(base_url, skills, 15),
                'tag_generator': new TagGeneratorPartialView(tag_partials),
                'extension_toolbox': new ExtensionToolboxPartialView(tagReader.getSupportedPlugins(false, true), "YEP_BattleEngineCore", 15),
                'quick_access': new QuickAccessPartialView(_.map(skills, function (s) { return new QuickAccessItem(s.id, s.name, base_url + '/' + s.id) }), "List", "Select skill:"),
            }

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for Toggle Timeline buttons
            var toggleTimelinesCallback = this.toggleTimelines;
            this.$el.on('change', '.js_ToggleTimelines', function () {
                toggleTimelinesCallback();
            });

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
            var renderedPartials = _.mapObject(_.extend({}, partials, tag_partials), function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('.sidebar').affix(UIConfig.affix.sidebar);
            setActiveMenuItem(this.$el, base_url + '/' + current.id);
            this.$el.find('#setup').hide();
            this.$el.find('#whole').hide();
            this.$el.find('#target').hide();
            this.$el.find('#follow').hide();
            this.$el.find('#finish').hide();
            this.$el.find('.timeline.nested').addClass('hide');
            this.$el.find('.timeline_empty.nested').addClass('hide');

            return this;
        };

        this.toggleAllHandler = function () {
            if (collapsed) {
                $('.timeline.nested').removeClass('hide');
                $('.timeline_empty.nested').removeClass('hide');
            } else {
                $('.timeline.nested').addClass('hide');
                $('.timeline_empty.nested').addClass('hide');
            }
            collapsed = !collapsed;
            return false;
        };

        this.scrollToTagGenerator = function () {
            scrollToDiv($('#tag_generator'));
            return false;
        };

        this.toggleTimelines = function () {
            $('#setup').hide();
            $('#whole').hide();
            $('#target').hide();
            $('#follow').hide();
            $('#finish').hide();
            $('#selectTimeline').hide();

            if ($('#radSetup').is(':checked')) {
                $('#setup').show();
                partials['extension_toolbox'].setExtensionBuilderReference(tag_partials['setup']);
            } else if ($('#radWhole').is(':checked')){
                $('#whole').show();
                partials['extension_toolbox'].setExtensionBuilderReference(tag_partials['whole']);
            } else if ($('#radTarget').is(':checked')){
                $('#target').show();
                partials['extension_toolbox'].setExtensionBuilderReference(tag_partials['target']);
            } else if ($('#radFollow').is(':checked')){
                $('#follow').show();
                partials['extension_toolbox'].setExtensionBuilderReference(tag_partials['follow']);
            } else if ($('#radFinish').is(':checked')){
                $('#finish').show();
                partials['extension_toolbox'].setExtensionBuilderReference(tag_partials['finish']);
            } else
                $('#selectTimeline').show();
        };

        this.initialize();

    };

});

