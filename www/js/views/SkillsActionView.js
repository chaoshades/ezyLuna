define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Clipboard = require('clipboard'),
        Sortable = require('sortable'),
        tagReader = require('app/tag-reader'),
        CarouselPartialView = require("partial/CarouselPartialView"),
        skillsActionHtml = require('text!tpl/skillsAction.htm'),

        skillsActionTpl = Handlebars.compile(skillsActionHtml);


    return function (project, skills, current) {

        var base_url = "#project/" + project.id + "/skills/action",
            partials = {
                'carousel': new CarouselPartialView(base_url, skills, 15)
            }

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for GenerateTags button
            var generateTagsCallback = this.generateTags;
            this.$el.on('click', '#btnGenerateTags', function () {
                generateTagsCallback();
            });

            // Click Event for ScrollUp button
            this.$el.on('click', '#btnScrollUp', function () {
                scrollUp();
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

            this.$settings = {
                menu: {
                    active: base_url
                },
                project: project
            };
        };

        this.render = function () {
            // Run parsers on note to read tags
            current.tags = tagReader.getNoteTagsFromString(current.note);
            current.url = project.url;

            // Render view
            this.$el.html(skillsActionTpl(current));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('#sidebar').affix(UIConfig.affix.sidebar);
            setActiveMenuItem(this.$el, base_url + '/' + current.id);
            Sortable.create(this.$el.find(".timeline").get(0));
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

