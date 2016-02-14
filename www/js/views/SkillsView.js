﻿define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        dataAdapter = require('adapters/data'),
        tagReader = require('app/tag-reader'),
        skillsHtml = require('text!tpl/skills.htm'),

        skillsTpl = Handlebars.compile(skillsHtml);


    return function (skills, current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for sidebar buttons
            this.$el.on('click', '.list-group-item', function () {
                $('.list-group > .active').removeClass('active');
                $(this).addClass('active');
            });

            // Click Event for sidebar buttons
            this.$el.on('click', '#btnGenerateTags', function () {
                $('#txtOutput').val(tagAdapter.stringify([{ "tag": "hp", "data": 10000 }, { "tag": "mp", "data": 12345 }]));
            });

            // Carousel Navigation Events
            this.$el.on('click', '.next-slider', function () {
                $('.carousel').carousel('next');
                return false;
            });
            this.$el.on('click', '.prev-slider', function () {
                $('.carousel').carousel('prev');
                return false;
            });
        };

        this.render = function () {

            var paged_skills = [];
            var temp = skills.slice(0);
            while (temp.length > 0) {
                paged_skills.push(temp.splice(0, 15));
            }

            var data = {
                'paged_skills': paged_skills,
                'current': current
            };
            this.$el.html(skillsTpl(data));

            this.setActiveMenuItem(current.id);

            this.$el.find('.carousel').carousel({
                interval: false
            });

            this.$el.find('.carousel .item:has(.list-group a.active)').addClass('active');

            return this;
        };

        this.clearActiveMenuItem = function () {
            this.$el.find('.list-group > .active').removeClass('active');
        };

        this.setActiveMenuItem = function (id) {
            this.clearActiveMenuItem();
            this.$el.find('.list-group a[href="#skills/' + id + '"]').addClass('active');
        };

        this.initialize();

    };

});

