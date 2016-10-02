define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPJobPoints = require("tag/yep-27-job-points"),
        jobPointsHtml = require('text!partialtpl/enemies/jobPoints.htm'),

        jobPointsTpl = Handlebars.compile(jobPointsHtml),
            
        JP = "JP";


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

            this.$el.html(jobPointsTpl(current));

            var partials = {
                'tooltipJobPoints': new PluginTooltipPartialView(YEPJobPoints)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseJobPoints'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPJobPoints));

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == JP) {
                    current.jobPoints = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkJobPoints', JP, '#numJobPoints');

            return tags;
        };

        this.initialize();

    };

});

