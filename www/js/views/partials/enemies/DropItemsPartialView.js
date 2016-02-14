define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        dropItemsHtml = require('text!partialtpl/enemies/dropItems.htm'),

        dropItemsTpl = Handlebars.compile(dropItemsHtml);


    return function (current, linked_data) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {
            if (current.dropItems) {
                this.renderDropItems();
            }

            this.$el.html(dropItemsTpl(current));

            return this;
        };

        this.renderDropItems = function () {
            // Define new properties for drops display
            _.each(current.dropItems, function (drop) {
                if (drop.kind == 1) {
                    // Get item name
                    var item = _.find(linked_data.items, function (i) { return i.id == drop.dataId; });
                    drop.name = item.name;
                }
                else if (drop.kind == 2) {
                    // Get weapon name
                    var weapon = _.find(linked_data.weapons, function (w) { return w.id == drop.dataId; });
                    drop.name = weapon.name;
                }
                else if (drop.kind == 3) {
                    // Get armor name
                    var armor = _.find(linked_data.armors, function (a) { return a.id == drop.dataId; });
                    drop.name = armor.name;
                }
            });
        };

        this.initialize();

    };

});

