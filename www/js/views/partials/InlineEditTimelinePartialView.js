define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        inlineEditTimelineHtml = require('text!partialtpl/inlineEditTimeline.htm'),

        inlineEditTimelineTpl = Handlebars.compile(inlineEditTimelineHtml);


    return function (parentContext, templateInfos, $stateManager, stateKey, dataSelector, saveCallback, editCallback) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Inline Edit Timeline Click Events
            var wrapperReference = this.$el,
                getStateManagerCallback = this.getStateManager,
                getUIDCallback = this.getUID,
                refreshTimelineCallback = this.refreshTimeline;
            this.$el.on('click', '.js_SaveEdit', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Pass item to custom save callback
                saveCallback(state_data[dataSelector].data[uid]);
                if (state_data[dataSelector].data[uid].add)
                    state_data[dataSelector].data[uid].add = false;
                state_data[dataSelector].data[uid].edit = false;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
                editCallback(false);
            });
            this.$el.on('click', '.js_CancelEdit', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // If new item, remove it, else cancel edit
                if (state_data[dataSelector].data[uid].add)
                    state_data[dataSelector].data.splice(uid, 1);
                else
                    state_data[dataSelector].data[uid].edit = false;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
                editCallback(false);
            });
            this.$el.on('click', '.js_ConfirmDelete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Remove item
                state_data[dataSelector].data.splice(uid, 1);
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
            });
            this.$el.on('click', '.js_CancelDelete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Cancel deletion
                state_data[dataSelector].data[uid].deleting = false;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
            });
            this.$el.on('click', '.js_Edit', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Only one editable item at a time
                _.each(state_data[dataSelector].data, function (d) { d.edit = false; });
                // If new item, remove it
                var addingIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.add; });
                if (addingIndex > -1) {
                    state_data[dataSelector].data.splice(addingIndex, 1);
                }
                state_data[dataSelector].data[uid].edit = true;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
                editCallback(true);
            });
            this.$el.on('click', '.js_Delete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Only one deletable item at a time
                _.each(state_data[dataSelector].data, function (d) { d.deleting = false; });
                state_data[dataSelector].data[uid].deleting = true;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
            });
        };

        this.render = function () {
            // Define new properties for data display
            var state_data = this.getStateManager().getState(stateKey).data;
            _.each(state_data[dataSelector].data, function (t) {
                t.add = false;
                t.edit = false;
                t.deleting = false;
            });
            this.getStateManager().setState(stateKey, state_data);

            this.refreshTimeline(this.$el, state_data);

            // Render partial views
            /*
            var nestedIDs = _.compact(_.chain(state_data[dataSelector].data)
                       .map(function (p) { return p.nestedID; })
                       .uniq()
                       .value())
            
            var partials = {};
            _.each(nestedIDs, function (nestedID) {
                partials['nested' + nestedID] = new InlineEditTablePartialView(parentContext, templateInfos, $stateManager, stateKey, dataSelector, saveCallback)
            });
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });
            */
            return this;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.getUID = function (btn) {
            return $(btn).parents('li').data('uid');
        };

        this.refreshTimeline = function (wrapper, state_data) {
            var data = {
                'parentContext': parentContext,
                'currentContext': { 'enabled': state_data[dataSelector].enabled, 'data': state_data[dataSelector].data },
                'templateInfos': templateInfos
            };
            wrapper.html(inlineEditTimelineTpl(data));
        };

        this.initialize();

    };

});

