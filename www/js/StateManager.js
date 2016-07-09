define(function (require) {

    "use strict";

    var _ = require('underscore');

    return function StateManager() {

        var stateManager = [];

        this.clearAllStates = function () {
            this.clearState();
        };

        this.clearState = function (key) {
            if (stateManager.length > 0) {
                if (key) {
                    var state = _.find(stateManager, function (c) { return c.key == key; });
                    if (state)
                        stateManager = _.without(stateManager, state);
                }
                else
                    stateManager = [];
            }
        };

        this.getState = function (key) {
            var state = null;

            if (stateManager.length > 0) {
                state = _.find(stateManager, function (c) { return c.key == key; });
            }

            return state;
        };

        this.setState = function (key, data) {
            var index = _.findIndex(stateManager, function (c) { return c.key == key; }),
                state = null;

            state = { key: key, data: data };
            if (index > -1)
                stateManager[index] = state;
            else
                stateManager.push(state);
        };

    }

});