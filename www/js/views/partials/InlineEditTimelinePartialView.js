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
                refreshGroupsCallback = this.refreshGroups,
                moveItemCallback = this.moveItem,
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
                if (state_data[dataSelector].data[uid].add) {
                    // Refresh groups if necessary
                    refreshGroupsCallback(state_data[dataSelector].data, uid);

                    // Remove item
                    state_data[dataSelector].data.splice(uid, 1);
                }
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
                // Refresh groups if necessary
                refreshGroupsCallback(state_data[dataSelector].data, uid);
                // Remove item
                state_data[dataSelector].data.splice(uid, 1);
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
                var editIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.edit; });
                editCallback(editIndex > -1);
            });
            this.$el.on('click', '.js_CancelDelete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Cancel deletion
                state_data[dataSelector].data[uid].deleting = false;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh timeline
                refreshTimelineCallback(wrapperReference, state_data);
                var editIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.edit; });
                editCallback(editIndex > -1);
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
                var editIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.edit; });
                editCallback(editIndex > -1);
            });
            this.$el.on('click', '.js_MoveUp', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Move item if necessary
                var moved = moveItemCallback(state_data[dataSelector], uid, true);
                if (moved) {
                    getStateManagerCallback().setState(stateKey, state_data);
                    // Refresh timeline
                    refreshTimelineCallback(wrapperReference, state_data);
                    editCallback(true);

                    var new_uid = _.findIndex(state_data[dataSelector].data, function (d) { return d.edit; });
                    scrollToDiv($('li[data-uid="' + new_uid + '"]'));
                }
            });
            this.$el.on('click', '.js_MoveDown', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Move item if necessary
                var moved = moveItemCallback(state_data[dataSelector], uid, false);
                if (moved) {
                    getStateManagerCallback().setState(stateKey, state_data);
                    // Refresh timeline
                    refreshTimelineCallback(wrapperReference, state_data);
                    editCallback(true);

                    var new_uid = _.findIndex(state_data[dataSelector].data, function (d) { return d.edit; });
                    scrollToDiv($('li[data-uid="' + new_uid + '"]'));
                }
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

            return this;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.getUID = function (btn) {
            return $(btn).parents('li').data('uid');
        };

        this.addItem = function (item) {
            var state_data = this.getStateManager().getState(stateKey).data;
            var addingIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.add; });
            // Limit one add at a time
            if (addingIndex === -1) {
                // Only one editable row at a time
                _.each(state_data[dataSelector].data, function (d) { d.edit = false; });
                // Link childs automatically to the new group
                if (item.has_children) {
                    var childs = _.filter(state_data[dataSelector].data, function (d) { return d.groupID == -1; });
                    _.each(childs, function (c) {
                        c.groupID = item.groupID;
                    });
                }
                // Push new item
                state_data[dataSelector].data.push(_.extend(item, { edit: true, add: true }));
                this.getStateManager().setState(stateKey, state_data);
                // Refresh timeline
                this.refreshTimeline(this.$el, state_data);
                editCallback(true);

                var new_uid = state_data[dataSelector].data.length - 1;
                scrollToDiv($('li[data-uid="' + new_uid + '"]'));
            }
        };

        this.refreshGroups = function (data, uid) {
            var itemToDelete = data[uid];
            if (itemToDelete.has_children) {
                var childs = _.filter(data, function (d) { return d.groupID == itemToDelete.groupID && !d.has_children; }),
                    nextElements = _.rest(data, uid + 1),
                    nextGroup = _.find(nextElements, function (d) { return d.has_children; });

                // Move every item to the next group if there is one
                _.each(childs, function (d) {
                    // If there is no group next, reset group ID
                    d.groupID = (nextGroup) ? nextGroup.groupID - 1 : -1;
                });

                // Adjust group ID for other elements within groups
                _.each(nextElements, function (d) {
                    if (d.groupID > -1)
                        d.groupID -= 1;
                });
            }
        };

        this.moveItem = function (state_data, uid, up) {
            var data = state_data.data,
                moved = false,
                x = uid,
                y = uid;

            var item = data[x];
            // Group move
            if (item.has_children) {
                // Build new struct to ease group move
                var groupedData = _.chain(data)
                                   .filter(function (d) { return d.has_children; })
                                   .map(function (d) { var new_d = _.extend({}, d); return new_d; })
                                   .value();
                _.each(groupedData, function(g) {
                    g.children = _.filter(data, function (d) { return d.groupID == g.groupID && !d.has_children });
                });

                // Get new index from the new struct
                x = _.findIndex(groupedData, function (d) { return d.groupID == item.groupID && d.has_children; });

                if (up)
                    y = x - 1;
                else
                    y = x + 1;

                // Bounds checking
                if (x >= 0 && x < groupedData.length && y >= 0 && y < groupedData.length) {
                    // Swap items
                    var tmp = groupedData[y];
                    groupedData[y] = groupedData[x];
                    groupedData[x] = tmp;
                    moved = true;

                    // Unbuild struct to data format
                    state_data.data = _.chain(groupedData)
                                       .map(function (g) { var new_g = _.omit(g, 'children'); return [g.children, new_g]; })
                                       .flatten()
                                       .compact()
                                       .union(_.filter(data, function (d) { return d.groupID == -1; }))
                                       .value();
                }
            }
            // Child move
            else
            {
                if (up)
                    y = x - 1;
                else
                    y = x + 1;

                // Move child between groups
                var nextItem = data[y];
                if (nextItem) {
                    if (nextItem.has_children && item.groupID == nextItem.groupID) {
                        if (up)
                            nextItem = data[y - 1];
                        else
                            nextItem = data[y + 1];
                    }
                    if (nextItem)
                        item.groupID = nextItem.groupID;
                    else
                        item.groupID = -1;
                }
                else {
                    if (!up)
                        item.groupID = -1;                    
                }

                // Bounds checking
                if (x >= 0 && x < data.length && y >= 0 && y < data.length) {
                    // Swap items
                    var tmp = data[y];
                    data[y] = data[x];
                    data[x] = tmp;
                    moved = true;
                }
            }

            return moved;
        };

        this.refreshTimeline = function (wrapper, state_data) {
            var indexedData = _.map(state_data[dataSelector].data, function (d, i) { var new_d = _.extend({}, d); new_d.index = i; return new_d; });
            var groupIDs = _.chain(indexedData)
                            .map(function (p) { return p.groupID; })
                            .value();

            var sumBadges = 0;
            var contextData = _.chain(indexedData)
                               .filter(function (d) { return d.has_children || d.groupID == -1; })
                               .each(function (d) { if (d.badge.isSum) { sumBadges += parseInt(d.action.value) || 0; d.badge.value = sumBadges; } })
                               .value();

            var data = {
                'parentContext': parentContext,
                'currentContext': { 'enabled': state_data[dataSelector].enabled, 'data': contextData },
                'templateInfos': templateInfos
            };
            wrapper.html(inlineEditTimelineTpl(data));

            // Render partial views
            var partials = {};
            _.each(groupIDs, function (groupID) {
                partials['nested' + groupID] = groupID;
            });
            var renderedPartials = _.mapObject(partials, function (grpID, key) {
                data.currentContext.nested = true;
                contextData = _.filter(indexedData, function (d) { return d.groupID == grpID && !d.has_children; });
                data.currentContext.data = contextData
                wrapper.find('#' + key).html(inlineEditTimelineTpl(data));
            });
        };

        this.initialize();

    };

});

