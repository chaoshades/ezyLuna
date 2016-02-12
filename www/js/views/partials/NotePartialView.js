define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        noteHtml = require('text!partialtpl/note.htm'),

        noteTpl = Handlebars.compile(noteHtml);


    return function (current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {

            this.$el.html(noteTpl(current));

            return this;
        };

        this.initialize();

    };

});

