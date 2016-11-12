define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        TypeAhead = require('bootstrap-typeahead'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        extensionToolboxHtml = require('text!partialtpl/extensionToolbox.htm'),

        extensionToolboxTpl = Handlebars.compile(extensionToolboxHtml);


    return function (plugins, ext_plugin, page_size) {

        var builder = null;

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for Add button
            var getCurrentExtCallback = this.getCurrentExt;
            this.$el.on('click', '.js_Add', function () {
                var ext = getCurrentExtCallback(this);
                if (ext && builder)
                    builder.addExtension(ext);
            });

            // Click Event for Change Plugin buttons
            this.$el.on('click', '.js_SaveChangePlugin', function () {
                var selected = $('#txtChangePlugin').typeahead("getActive");
                if (selected) {
                    $('.toolbox').find('div.list-group').not('.hidden').addClass("hidden");
                    $('#grp' + selected.id).removeClass("hidden");
                    $('#txtChangePlugin').val('');
                }
            });
            this.$el.on('click', '.js_ClearChangePlugin', function () {
                $('#txtChangePlugin').val('');
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
            // Filter plugins and keeps only the ones which have extensions for the plugin of the toolbox (ext_plugin)
            var filtered_plugins = _.filter(plugins, function (p) {
                    // Removes duplicates (because different extensions can generate the same extension tag)
                    p.exts = _.uniq(_.filter(p.exts, function (e) { return e.plugin == ext_plugin; }), function (e) { return e.ext; });
                    return p.exts && p.exts.length > 0; 
                });

            // Split data into pages
            var paged_plugins = [];
            _.each(filtered_plugins, function (p) {
                if (p.exts.length > page_size) {
                    var i = 1,
                        temp = p.exts.slice(0);
                    while (temp.length > 0) {
                        var new_p = _.extend({}, p);
                        // Change longname here instead of template because it is used for typeahead
                        new_p.longname += " (page " + i + ")"; 
                        // Helper properties for template
                        new_p.num_page = i;
                        new_p.pagename = new_p.name + "_page" + i;
                        // Split extensions by page
                        new_p.exts = temp.splice(0, page_size);
                        paged_plugins.push(new_p);
                        i++;
                    }
                }
                else {
                    // Helper properties for template
                    p.pagename = p.name; 
                    p.num_page = 1;
                    paged_plugins.push(p);
                }
            });

            var data = {
                'toolboxPluginID': _.first(paged_plugins).pagename,
                'plugins': paged_plugins
            };
            this.$el.html(extensionToolboxTpl(data));

            var partials = {};
            _.each(filtered_plugins, function(p) {
                partials['tooltip' + p.name] = new PluginTooltipPartialView(p);
            });

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            var container = this.$el;
            _.each(paged_plugins, function (p) {
                container.find('#popover' + p.pagename).popover(UIConfig.popover.tag(p));
            });

            var source = _.map(paged_plugins, function (p) { return { id: p.pagename, name: p.longname }; });
            this.$el.find('#txtChangePlugin').typeahead(UIConfig.typeahead.custom(source));

            return this;
        };

        this.getCurrentExt = function (btn) {
            return $(btn).parents('#extension_toolbox').find('.active').data('ext');
        };

        this.setExtensionBuilderReference = function (bldr) {
            builder = bldr;
        };

        this.initialize();

    };

});

