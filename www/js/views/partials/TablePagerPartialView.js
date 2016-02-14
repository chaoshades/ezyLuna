define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        tablePagerHtml = require('text!partialtpl/tablePager.htm'),

        tablePagerTpl = Handlebars.compile(tablePagerHtml);


    return function (data, page_size) {

        var numPages = Math.ceil(data.length / page_size),
            table_data = null;

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Table Pager Navigation Events
            var previousCallback = this.previous;
            var nextCallback = this.next;
            var goToCallback = this.goTo;
            this.$el.on('click', '.js_TablePageLink', function () {
                var pager = $(this).parents('.table_pager'),
                    clickedPage = $(this).html().valueOf() - 1;
                goToCallback(pager, clickedPage);
                return false;
            });
            this.$el.on('click', '.js_TablePrevLink', function () {
                if ($(this).hasClass('disabled')) return false;
                var pager = $(this).parents('.table_pager');
                previousCallback(pager, goToCallback);
                return false;
            });
            this.$el.on('click', '.js_TableNextLink', function () {
                if ($(this).hasClass('disabled')) return false;
                var pager = $(this).parents('.table_pager');
                nextCallback(pager, goToCallback);
                return false;
            });
        };

        this.render = function () {
            // Determines number of pages
            var pages = _.range(1, numPages+1);

            this.$el.html(tablePagerTpl(pages));

            var pager = this.$el.find('.table_pager');
            
            // Init data contained within pager
            pager.data("curr", 0);

            // Initial Display
            pager.find('.prev_link, .prev_link a').addClass("disabled");
            if (numPages <= 1) {
                this.$el.find('.next_link, .next_link a').addClass("disabled");
            }
            pager.children().eq(1).addClass("active");

            return this;
        };

        this.setTableReference = function (tbl) {
            table_data = tbl.children();
            table_data.hide();
            table_data.slice(0, page_size).show();
        };

        this.previous = function (pager, goToCallback) {
            var goToPage = parseInt(pager.data("curr")) - 1;
            goToCallback(pager, goToPage);
        };

        this.next = function (pager, goToCallback) {
            var goToPage = parseInt(pager.data("curr")) + 1;
            goToCallback(pager, goToPage);
        };

        this.goTo = function (pager, page) {
            var startAt = page * page_size,
                endOn = startAt + page_size;

            table_data.css('display', 'none').slice(startAt, endOn).show();

            if (page >= 1) {
                pager.find('.prev_link, .prev_link a').removeClass("disabled");
            }
            else {
                pager.find('.prev_link, .prev_link a').addClass("disabled");
            }

            if (page < (numPages - 1)) {
                pager.find('.next_link, .next_link a').removeClass("disabled");
            }
            else {
                pager.find('.next_link, .next_link a').addClass("disabled");
            }

            pager.data("curr", page);
            pager.children().removeClass("active");
            pager.children().eq(page + 1).addClass("active");
        };

        this.initialize();

    };

});

