define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        extensionToolboxHtml = require('text!partialtpl/extensionToolbox.htm'),

        extensionToolboxTpl = Handlebars.compile(extensionToolboxHtml);


    return function (plugins, ext_plugin) {

        var collapsed = true;

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for Add button
            this.$el.on('click', '.js_Add', function () {
                // TODO
                //var state_data = getStateManagerCallback().getState(stateKey).data;
                //var addingIndex = _.findIndex(state_data[dataSelector].data, function (d) { return d.add; });
                //// Limit one add at a time
                //if (addingIndex === -1) {
                //    // Only one editable row at a time
                //    _.each(state_data[dataSelector].data, function (d) { d.edit = false; });
                //    // Push new item
                //    state_data[dataSelector].data.push({ edit: true, add: true });
                //    getStateManagerCallback().setState(stateKey, state_data);
                //    // Refresh table
                //    refreshTableCallback(wrapperReference, state_data);
                //    if (pager) initPagerCallback(wrapperReference, state_data, true);
                //    initSortCallback(wrapperReference);
                //}
            });

            // Click Event for Toggle All button
            this.$el.on('click', '.js_ToggleAll', function () {
                var toolbox = $('.toolbox');
                collapsed = toggleAll(toolbox, collapsed);
            });

            // Toolbox Item Navigation Events
            this.$el.on('click', '.js_ToolboxLink', function () {
                var toolbox = $('.toolbox');
                clearActiveMenuItem(toolbox);
                $(this).addClass("active");
                return false;
            });
        };

        this.render = function () {
            // Filter plugins and keeps only the ones which have extensionsc for the plugin of the toolbox (ext_plugin)
            var filtered_plugins = _.filter(plugins, function(p) {
                    p.exts = _.filter(p.exts, function(e) { return e.plugin == ext_plugin; });
                    return p.exts && p.exts.length > 0; 
                });

            // Render view
            this.$el.html(extensionToolboxTpl(filtered_plugins));

            var partials = {};
            _.each(filtered_plugins, function(p) {
                partials['tooltip' + p.name] = new PluginTooltipPartialView(p);
            });

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            var container = this.$el;
            _.each(filtered_plugins, function(p) {
                container.find('#popover' + p.name).popover(UIConfig.popover.tag(p));
            });

            return this;
        };

        this.initialize();

    };

});

