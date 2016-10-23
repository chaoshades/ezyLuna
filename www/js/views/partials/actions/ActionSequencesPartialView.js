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

        //TODO
        ACTION_ANIMATION = "Action Animation";


    return function (current, linked_data, $stateManager, actionTag) {

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
                'skillTypes': _.map(_.compact(linked_data.types.skillTypes), function (t, i) { return { id: i + 1, name: t } }),
                'skills': linked_data.skills
            };

            var templateSets = [
                new InlineEditTimelineTemplateSet($(actionSequencesHtml), "#tplCheckOnly")
            ];
            var templateInfos = {};

            // Register partials for every template in template sets
            _.each(templateSets, function (set) {
                _.each(set.templates, function(t) {
                    Handlebars.registerPartial(t.name, t.template);
                });
                templateInfos[set.setID] = new InlineEditTimelineTemplateInfo(set);
            });
            // Register empty template
            var emptyTpl = new InlineEditTimelineTemplate($(actionSequencesHtml), '#timeline-empty');
            Handlebars.registerPartial(emptyTpl.name, emptyTpl.template);
            templateInfos.empty_template = emptyTpl.name;

            var partial = new InlineEditTimelinePartialView(data, templateInfos, $stateManager, STATE_KEY, actionTag, this.saveXXX, this.editXXX);

            this.$el.html(actionSequencesTpl(data));

            // Render partial views
            this.$el.find('div').html(partial.render().$el);

            // Initial Display
            var timeline = this.$el.find(".timeline").get(0);
            if (timeline) {
                Sortable.create(timeline, UIConfig.sortable.timeline());
                _.each(this.$el.find(".timeline.nested"), function (obj) {
                    Sortable.create(obj, UIConfig.sortable.timeline("action"));
                });
            }

            return this;
        };

        this.renderTags = function () {
            if (!current.actionSequences) current.actionSequences = {};
            current.actionSequences[actionTag] = {};
            current.actionSequences[actionTag].list = [];

            // Define new properties for tags display
            var tag = _.find(current.tags, function (t) { return t.tag == actionTag; });
            if (tag) {
                _.each(tag.data, function (e) {
                    if (e.ext == ACTION_ANIMATION) {
                        current.actionSequences[actionTag].enabled = true;
                        //current.actionSequences.nested = true;
                        current.actionSequences[actionTag].list.push({
                            badge: {
                                type: "action",
                                value: null
                            },
                            heading: "Action 1",
                            template: "tplCheckOnly",
                            action: {
                                id: 1,
                                label: "Action Animation",
                                value: "Action Animation",
                                enabled: true
                            }
                            //nestedID: 1
                        });
                    }
                    // TODO
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

            //TODO

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveXXX = function (obj) {
            // TODO
            //var skillID = $('#ddlSkillCooldownDuration').val();
            //var skill = _.find(linked_data.skills, function (skill) { return skill.id == skillID; });

            //obj.skillID = skill.id;
            //obj.skill = skill.name;
            //obj.duration = $('#numSkillCooldownDuration').val();
        };

        this.editXXX = function (edit) {
            if(edit)
                $('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            else
                $('input[type="checkbox"]').bootstrapSwitch('destroy');
        };

        this.initialize();

    };

});

