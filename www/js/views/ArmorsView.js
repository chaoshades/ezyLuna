﻿define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        tagReader = require('app/tag-reader'),
        CarouselPartialView = require("partial/CarouselPartialView"),
        TagGeneratorPartialView = require("partial/TagGeneratorPartialView"),
        armorsHtml = require('text!tpl/armors.htm'),

        armorsTpl = Handlebars.compile(armorsHtml);


    return function (project, armors, current) {

        var base_url = "#project/" + project.id + "/armors",
            tag_partials = {
            },
            partials = {
                'carousel': new CarouselPartialView(base_url, armors, 15),
                'tag_generator': new TagGeneratorPartialView(tag_partials)
            }

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

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
            this.$el.html(armorsTpl(current));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            setActiveMenuItem(this.$el, base_url + '/' + current.id);

            return this;
        };

        this.initialize();

    };

});

