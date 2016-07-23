define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        TablePagerPartialView = require("partial/TablePagerPartialView"),
        inlineEditTableHtml = require('text!partialtpl/inlineEditTable.htm'),

        inlineEditTableTpl = Handlebars.compile(inlineEditTableHtml);


    return function (parentContext, templateInfos, $stateManager, stateKey, dataSelector, saveCallback) {

        var pager = null;

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for table buttons
            var wrapperReference = this.$el,
                getStateManagerCallback = this.getStateManager,
                getUIDCallback = this.getUID,
                refreshTableCallback = this.refreshTable;
            this.$el.on('click', '.js_Add', function () {
                var data = getStateManagerCallback().getState(stateKey).data;
                var alreadyAdd = _.findIndex(data[dataSelector], function (d) { return d.add; });
                if (alreadyAdd === -1) {
                    data[dataSelector].push({ edit: true, add: true });
                    getStateManagerCallback().setState(stateKey, data);
                    refreshTableCallback(wrapperReference, data);
                }
            });
            this.$el.on('click', '.js_SaveEdit', function () {
                var uid = getUIDCallback(this);
                var data = getStateManagerCallback().getState(stateKey).data;
                saveCallback(data[dataSelector][uid]);
                if (data[dataSelector][uid].add)
                    data[dataSelector][uid].add = false;
                data[dataSelector][uid].edit = false;
                getStateManagerCallback().setState(stateKey, data);
                refreshTableCallback(wrapperReference, data);
            });
            this.$el.on('click', '.js_CancelEdit', function () {
                var uid = getUIDCallback(this);
                var data = getStateManagerCallback().getState(stateKey).data;
                if (data[dataSelector][uid].add)
                    data[dataSelector].splice(uid, 1);
                else
                    data[dataSelector][uid].edit = false;
                getStateManagerCallback().setState(stateKey, data);
                refreshTableCallback(wrapperReference, data);
            });
            this.$el.on('click', '.js_ConfirmDelete', function () {
                var uid = getUIDCallback(this);
                var data = getStateManagerCallback().getState(stateKey).data;
                data[dataSelector].splice(uid, 1);
                getStateManagerCallback().setState(stateKey, data);
                refreshTableCallback(wrapperReference, data);
            });
            this.$el.on('click', '.js_CancelDelete', function () {
                var uid = getUIDCallback(this);
                var data = getStateManagerCallback().getState(stateKey).data;
                data[dataSelector][uid].deleting = false;
                getStateManagerCallback().setState(stateKey, data);
                refreshTableCallback(wrapperReference, data);
            });
            this.$el.on('click', '.js_Edit', function () {
                var uid = getUIDCallback(this);
                var data = getStateManagerCallback().getState(stateKey).data;
                _.each(data[dataSelector], function (d) { d.edit = false; });
                data[dataSelector][uid].edit = true;
                getStateManagerCallback().setState(stateKey, data);
                refreshTableCallback(wrapperReference, data);
            });
            this.$el.on('click', '.js_Delete', function () {
                var uid = getUIDCallback(this);
                var data = getStateManagerCallback().getState(stateKey).data;
                _.each(data[dataSelector], function (d) { d.deleting = false; });
                data[dataSelector][uid].deleting = true;
                getStateManagerCallback().setState(stateKey, data);
                refreshTableCallback(wrapperReference, data);
            });

        };

        this.render = function () {
            //pager = new TablePagerPartialView(current.skillRequireLevel.list, 4);

            // Define new properties for data display
            var temp = this.getStateManager().getState(stateKey).data;
            _.each(temp[dataSelector], function (t) {
                t.edit = false;
                t.deleting = false;
            });
            this.getStateManager().setState(stateKey, temp);

            var data = {
                'parentContext': parentContext,
                'data': temp[dataSelector],
                'templateInfos': templateInfos
            };
            this.$el.html(inlineEditTableTpl(data));

            // Render pager
            //this.$el.find('#pgSkillRequiredLevel').html(pager.render().$el);

            //pager.setTableReference(this.$el.find('#tblSkillRequiredLevel'));

            return this;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.getUID = function (btn) {
            return $(btn).parents('tr').data('uid');
        };

        this.refreshTable = function (wrapper, new_data) {
            var data = {
                'parentContext': parentContext,
                'data': new_data[dataSelector],
                'templateInfos': templateInfos
            };
            wrapper.html(inlineEditTableTpl(data));
        };

        this.initialize();

    };

});

