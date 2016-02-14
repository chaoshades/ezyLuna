define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        carouselHtml = require('text!partialtpl/carousel.htm'),

        carouselTpl = Handlebars.compile(carouselHtml);


    return function (base_url, all_data, page_size) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for sidebar buttons
            this.$el.on('click', '.js_DataItem', function () {
                $('.list-group > .active').removeClass('active');
                $(this).addClass('active');
            });

            // Carousel Navigation Events
            this.$el.on('click', '.js_NextSlider', function () {
                $('.carousel').carousel('next');
                return false;
            });
            this.$el.on('click', '.js_PrevSlider', function () {
                $('.carousel').carousel('prev');
                return false;
            });
        };

        this.render = function () {
            // Split data into pages
            var paged_data = [],
                temp = all_data.slice(0);
            while (temp.length > 0) {
                paged_data.push(temp.splice(0, page_size));
            }
            
            var data = {
                'paged_data': paged_data,
                'base_url': base_url
            };
            this.$el.html(carouselTpl(data));

            // Enables carousel
            this.$el.find('.carousel').carousel({
                interval: false
            });

            return this;
        };

        this.initialize();

    };

});

