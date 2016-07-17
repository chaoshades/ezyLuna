define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        rowFormationHtml = require('text!partialtpl/enemies/rowFormation.htm'),

        rowFormationTpl = Handlebars.compile(rowFormationHtml),
            
        DEFAULT_ROW = "Default Row",
        ROW_LOCK = "Row Lock",
        NOT_ROW_LOCK = "Not Row Lock";


    return function (current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            this.$el.html(rowFormationTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseRowFormation'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == DEFAULT_ROW) {
                    current.defaultRow = t.data;
                }
                else if (t.tag == ROW_LOCK) {
                    current.rowLock.enabled = true;
                    current.rowLock.yes = true;
                }
                else if (t.tag == NOT_ROW_LOCK) {
                    current.rowLock.enabled = true;
                    current.rowLock.no = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkDefaultRow', DEFAULT_ROW, '#numDefaultRow');
            if ($('#chkRowLock').is(':checked')) {
                setTag(tags, '#radRowLock', ROW_LOCK);
                setTag(tags, '#radNoRowLock', NOT_ROW_LOCK);
            }

            return tags;
        };

        this.initialize();

    };

});

