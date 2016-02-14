define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        tagReader = require('app/tag-reader'),
        noteHtml = require('text!partialtpl/note.htm'),

        noteTpl = Handlebars.compile(noteHtml);


    return function (current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {
            // Run parsers on note to filter tags that aren't parsed
            var tags = tagReader.getNoteTagsFromString(current.note),
                output = tagReader.getStringFromNoteTags(tags),
                temp = current.note;

            _.each(output.split("\n"), function (t) {
                temp = temp.replace(t, "");
            });
            current.note = temp;

            this.$el.html(noteTpl(current));

            return this;
        };

        this.initialize();

    };

});

