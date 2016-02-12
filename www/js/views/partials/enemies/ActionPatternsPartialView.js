define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        actionPatternsHtml = require('text!partialtpl/enemies/actionPatterns.htm'),

        actionPatternsTpl = Handlebars.compile(actionPatternsHtml);


    return function (current, linked_data) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {

            this.renderActions();

            this.$el.html(actionPatternsTpl(current));

            return this;
        };

        this.renderActions = function () {
            // Define new properties for actions display
            for (var i = 0; i < current.actions.length; i++) {
                var action = current.actions[i];

                // Get skill name
                var skill = _.find(linked_data.skills, function (s) { return s.id == action.skillId; });
                action.skill = skill.name;

                // State action only
                if (action.conditionType === 4) {
                    // Get state name
                    var state = _.find(linked_data.states, function (s) { return s.id == action.conditionParam1; });
                    action.state = state.name;
                }
            }
        };

        this.initialize();

    };

});

