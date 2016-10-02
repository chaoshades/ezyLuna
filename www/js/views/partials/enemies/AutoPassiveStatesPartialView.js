define(function (require) {

    "use strict";

    var STATE_KEY = "auto_passive_states",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPAutoPassiveStates = require("tag/yep-13-auto-passive-states"),
        autoPassiveStatesHtml = require('text!partialtpl/enemies/autoPassiveStates.htm'),

        autoPassiveStatesTpl = Handlebars.compile(autoPassiveStatesHtml),

        PASSIVE_STATE = "Passive State",
        PASSIVE_STATE_2 = "Passive State#2";

    return function (current, linked_data, $stateManager) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            var getStateManagerCallback = this.getStateManager;
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);

                var id = $(this).attr('id'),
                    dataSelector = null;
                if (id === 'chkPassiveState')
                    dataSelector = 'passiveState';
                else if (id === 'chkPassiveStateRange')
                    dataSelector = 'passiveStateRange';

                if (dataSelector) {
                    var state_data = getStateManagerCallback().getState(STATE_KEY).data;
                    state_data[dataSelector].enabled = $(this).is(':checked');
                    getStateManagerCallback().setState(STATE_KEY, state_data);
                }
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'states': linked_data.states
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(autoPassiveStatesHtml), "#tplPassiveState"),
                new InlineEditTableTemplateSet($(autoPassiveStatesHtml), "#tplPassiveStateRange")
            ];
            var templateInfos = {};

            // Register partials for every template in template sets
            _.each(templateSets, function (set) {
                _.each(set.templates, function(t) {
                    Handlebars.registerPartial(t.name, t.template);
                });
                templateInfos[set.setID] = new InlineEditTableTemplateInfo(set);
            });

            var partials = {
                'passive_state': new InlineEditTablePartialView(data, templateInfos["tplPassiveState"], $stateManager, STATE_KEY, "passiveState", this.savePassiveState),
                'passive_state_range': new InlineEditTablePartialView(data, templateInfos["tplPassiveStateRange"], $stateManager, STATE_KEY, "passiveStateRange", this.savePassiveStateRange),
                'tooltipAutoPassiveStates': new PluginTooltipPartialView(YEPAutoPassiveStates)
            }

            this.$el.html(autoPassiveStatesTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseAutoPassiveStates'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPAutoPassiveStates));

            return this;
        };

        this.renderTags = function () {
            current.passiveState = {};
            current.passiveState.list = [];
            current.passiveStateRange = {};
            current.passiveStateRange.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == PASSIVE_STATE) {
                    current.passiveState.enabled = true;

                    _.each(t.data, function (id) {
                        var state = _.find(linked_data.states, function (state) { return state.id == id; });

                        current.passiveState.list.push({
                            stateID: id,
                            state: state.name
                        });
                    });
                }
                else if (t.tag == PASSIVE_STATE_2) {
                    current.passiveStateRange.enabled = true;

                    var stateStart = _.find(linked_data.states, function (state) { return state.id == t.data[0]; }),
                        stateEnd = _.find(linked_data.states, function (state) { return state.id == t.data[1]; });

                    current.passiveStateRange.list.push({
                        start: t.data[0],
                        stateStart: stateStart.name,
                        end: t.data[1],
                        stateEnd: stateEnd.name
                    });
                }
            });

            var data = {
                'passiveState': new InlineEditTableDataInfo(current.passiveState.enabled, current.passiveState.list),
                'passiveStateRange': new InlineEditTableDataInfo(current.passiveStateRange.enabled, current.passiveStateRange.list),
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            setObjectValuesTag(tags, state_data, 'passiveState', PASSIVE_STATE, function (item) { return item.stateID; });
            setObjectTag(tags, state_data, 'passiveStateRange', PASSIVE_STATE_2, function (item) { return [item.start, item.end]; });

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.savePassiveState = function (obj) {
            var stateID = $('#ddlPassiveState').val();
            var state = _.find(linked_data.states, function (state) { return state.id == stateID; });

            obj.stateID = state.id;
            obj.state = state.name;
        };

        this.savePassiveStateRange = function (obj) {
            var stateStartID = $('#ddlPassiveStateRangeStart').val(),
                stateEndID = $('#ddlPassiveStateRangeEnd').val();
            var stateStart = _.find(linked_data.states, function (state) { return state.id == stateStartID; }),
                stateEnd = _.find(linked_data.states, function (state) { return state.id == stateEndID; });

            obj.start = stateStart.id;
            obj.stateStart = stateStart.name;
            obj.end = stateEnd.id;
            obj.stateEnd = stateEnd.name;
        };

        this.initialize();

    };

});

