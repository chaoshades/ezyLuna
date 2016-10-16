define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        Clipboard = require('clipboard'),
        tagReader = require('app/tag-reader'),
        tagGeneratorHtml = require('text!partialtpl/tagGenerator.htm'),

        tagGeneratorTpl = Handlebars.compile(tagGeneratorHtml);


    return function (partials) { 

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for GenerateTags button
            var generateTagsCallback = this.generateTags;
            this.$el.on('click', '#btnGenerateTags', function () {
                generateTagsCallback();
            });

            // Click Event for GenerateTags button
            this.$el.on('click', '#btnCopyClipboard', function () {
                $('#successCopy').hide();
                $('#errorCopy').hide();
                $('#errorNoCopy').hide();
                var output = $('#txtOutput').val();
                if (!output)
                    $('#errorNoCopy').show();
                else
                    Clipboard.copy(output).then(function () {
                        $('#successCopy').show();
                    }, function (err) {
                        $('#errorCopy').show();
                    });
            });
        };

        this.render = function () {
            // Render view
            this.$el.html(tagGeneratorTpl());

            // Initial Display
            this.$el.find('#successTags').hide();
            this.$el.find('#errorNoTags').hide();
            this.$el.find('#successCopy').hide();
            this.$el.find('#errorCopy').hide();
            this.$el.find('#errorNoCopy').hide();

            return this;
        };

        this.generateTags = function () {
            var tags = [];

            // Generate tags from every partials (if method is defined)
            _.each(partials, function (p) {
                if (p.generateTags)
                    tags = tags.concat(p.generateTags());
            });

            // Run parsers on tags to output notetags
            var output = tagReader.getStringFromNoteTags(tags);

            $('#successTags').hide();
            $('#errorNoTags').hide();
            $('#successCopy').hide();
            $('#errorNoCopy').hide();
            if (output)
                $('#successTags').show();
            else
                $('#errorNoTags').show();

            $('#txtOutput').val(output);
        };

        this.initialize();

    };

});

