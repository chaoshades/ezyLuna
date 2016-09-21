define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        TableSorter = require('jquery-tablesorter'),
        TableSorterStaticRow = require('jquery-tablesorter-static-row'),
        TablePagerPartialView = require("partial/TablePagerPartialView"),
        inlineEditTableHtml = require('text!partialtpl/inlineEditTable.htm'),

        inlineEditTableTpl = Handlebars.compile(inlineEditTableHtml),
            
        PAGE_SIZE = 4;


    return function (parentContext, templateInfos, $stateManager, stateKey, dataSelector, saveCallback) {

        var tblSelector = '#tbl' + templateInfos.setID,
            pgSelector = '#pg' + templateInfos.setID,
            pager = null,
            currentSort = [];

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Inline Edit Table Click Events
            var wrapperReference = this.$el,
                getStateManagerCallback = this.getStateManager,
                getUIDCallback = this.getUID,
                refreshTableCallback = this.refreshTable,
                initSortCallback = this.initSort,
                initPagerCallback = this.initPager;
            this.$el.on('click', '.js_Add', function () {
                var state_data = getStateManagerCallback().getState(stateKey).data;
                var addingIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.add; });
                // Limit one add at a time
                if (addingIndex === -1) {
                    // Only one editable row at a time
                    _.each(state_data[dataSelector].data, function (d) { d.edit = false; });
                    // Push new item
                    state_data[dataSelector].data.push({ edit: true, add: true });
                    getStateManagerCallback().setState(stateKey, state_data);
                    // Refresh table
                    refreshTableCallback(wrapperReference, state_data);
                    if (pager) initPagerCallback(wrapperReference, state_data, true);
                    initSortCallback(wrapperReference);
                }
            });
            this.$el.on('click', '.js_SaveEdit', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Pass item to custom save callback
                saveCallback(state_data[dataSelector].data[uid]);
                if (state_data[dataSelector].data[uid].add)
                    state_data[dataSelector].data[uid].add = false;
                state_data[dataSelector].data[uid].edit = false;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh table
                refreshTableCallback(wrapperReference, state_data);
                if (pager) initPagerCallback(wrapperReference, state_data);
                initSortCallback(wrapperReference);
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
                // Refresh table
                refreshTableCallback(wrapperReference, state_data);
                if (pager) initPagerCallback(wrapperReference, state_data, true);
                initSortCallback(wrapperReference);
            });
            this.$el.on('click', '.js_ConfirmDelete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Remove item
                state_data[dataSelector].data.splice(uid, 1);
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh table
                refreshTableCallback(wrapperReference, state_data);
                if (pager) initPagerCallback(wrapperReference, state_data, true);
                initSortCallback(wrapperReference);
            });
            this.$el.on('click', '.js_CancelDelete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Cancel deletion
                state_data[dataSelector].data[uid].deleting = false;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh table
                refreshTableCallback(wrapperReference, state_data);
                if (pager) initPagerCallback(wrapperReference, state_data);
                initSortCallback(wrapperReference);
            });
            this.$el.on('click', '.js_Edit', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Only one editable row at a time
                _.each(state_data[dataSelector].data, function (d) { d.edit = false; });
                // If new item, remove it
                var addingIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.add; });
                if (addingIndex > -1) {
                    state_data[dataSelector].data.splice(addingIndex, 1);
                }
                state_data[dataSelector].data[uid].edit = true;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh table
                refreshTableCallback(wrapperReference, state_data);
                if (pager) initPagerCallback(wrapperReference, state_data);
                initSortCallback(wrapperReference);
            });
            this.$el.on('click', '.js_Delete', function () {
                var uid = getUIDCallback(this);
                var state_data = getStateManagerCallback().getState(stateKey).data;
                // Only one deletable row at a time
                _.each(state_data[dataSelector].data, function (d) { d.deleting = false; });
                state_data[dataSelector].data[uid].deleting = true;
                getStateManagerCallback().setState(stateKey, state_data);
                // Refresh table
                refreshTableCallback(wrapperReference, state_data);
                if (pager) initPagerCallback(wrapperReference, state_data);
                initSortCallback(wrapperReference);
            });

            // Inline Edit Table Change/Input Events
            this.$el.on('change', 'select.js_InlineEditTableInput', function () {
                // Update sort
                wrapperReference.find('.inline-edit-table').trigger('update');
            });
            this.$el.on('input', 'input.js_InlineEditTableInput', function () {
                // Update sort
                wrapperReference.find('.inline-edit-table').trigger('update');
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

            this.refreshTable(this.$el, state_data);

            this.initPager(this.$el, state_data);

            this.initSort(this.$el);

            return this;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.getUID = function (btn) {
            return $(btn).parents('tr').data('uid');
        };

        this.refreshTable = function (wrapper, state_data) {
            var data = {
                'parentContext': parentContext,
                'currentContext': { 'enabled': state_data[dataSelector].enabled, 'data': state_data[dataSelector].data },
                'templateInfos': templateInfos
            };
            wrapper.html(inlineEditTableTpl(data));
        };

        this.initSort = function (wrapper) {
            var nbColumns = wrapper.find('.inline-edit-table').find("tr:first th").length;
            var headersCfg = {};
            // Disable sort on last column
            headersCfg[nbColumns - 1] = { sorter: false };

            // Init sorting
            wrapper.find('.inline-edit-table').tablesorter({
                widgets: ['staticRow'] ,
                headers: headersCfg,
                sortList: currentSort,
                textExtraction: function (node) {
                    var ctrl = $(node).find('input, select');
                    if ($(ctrl).is('input'))
                        return $(ctrl).val();
                    else if ($(ctrl).is('select'))
                        return $(ctrl).children(':selected').text();
                    else
                        return node.innerHTML;
                }
            }).bind("sortEnd", function (sorter) {
                // Keeps track of the sort
                currentSort = sorter.target.config.sortList;

                // Refresh page after sorting
                if (pager) {
                    var currentPage = pager.getCurrentPage();
                    pager.goTo(wrapper.find('.table_pager'), currentPage);
                }
            });
        };

        this.initPager = function (wrapper, state_data, goToLast) {
            var pageToGo = 0
            // Keeps track of the page
            if (pager) 
                pageToGo = pager.getCurrentPage();

            pager = new TablePagerPartialView(state_data[dataSelector].data, PAGE_SIZE);

            // Render pager
            wrapper.find(pgSelector).html(pager.render().$el);

            pager.setTableReference(wrapper.find(tblSelector));

            // Change page for last page if asked to
            if (goToLast)
                pageToGo = pager.getLastPage();
            // Refresh page with new data
            pager.goTo(wrapper.find('.table_pager'), pageToGo);
        };

        this.initialize();

    };

});

