define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        limitedSkillUsesHtml = require('text!partialtpl/enemies/limitedSkillUses.htm'),

        limitedSkillUsesTpl = Handlebars.compile(limitedSkillUsesHtml),

        GLOBAL_USE_MAX = "Global Use Max",
        STYPE_USE_MAX = "SType x Use Max",
        SKILL_USE_MAX = "Skill x Use Max";


    return function (current, linked_data) {

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

            var data = {
                'current': current,
                'skillTypes': _.map(_.compact(linked_data.types.skillTypes), function (t, i) {return {id: i+1, name:t}}),
                'skills': linked_data.skills
            };
            this.$el.html(limitedSkillUsesTpl(data));

            // Initial Display
            openCollapse(this.$el.find('#collapseLimitedSkillUses'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == GLOBAL_USE_MAX) {
                    current.globalUseMax = t.data.replace('+', '');
                }
                else if (t.tag == STYPE_USE_MAX) {
                    current.skillTypeID = t.data;
                    current.skillTypeUseMax = t.data.replace('+', '');
                }
                else if (t.tag == SKILL_USE_MAX) {
                    current.skillID = t.data;
                    current.skillUseMax = t.data.replace('+', '');
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setSignedValueTag(tags, '#chkGlobalUseMax', GLOBAL_USE_MAX, '#numGlobalUseMax');
            setSignedValueTag(tags, '#chkSkillTypeUseMax', STYPE_USE_MAX, '#numSkillTypeUseMax');
            setSignedValueTag(tags, '#chkSkillUseMax', SKILL_USE_MAX, '#numSkillUseMax');

            return tags;
        };

        this.initialize();

    };

});

