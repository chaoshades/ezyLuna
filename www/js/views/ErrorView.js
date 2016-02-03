define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        errorHtml = require('text!tpl/error.htm'),

        errorTpl = Handlebars.compile(errorHtml);


    return function (err) {

        var errormsg = {}

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            //Define new properties for the error message
            if (err == "404")
            {
                errormsg.title = "Page not found";
                var home_url = "#";
                errormsg.message = "This page cannot be found. Do you want to go back to the <a href='" + home_url + "'>homepage</a> ?";
            }
            else
            {
                errormsg.title = "Ooops !";
                errormsg.message = "An error occured. Please tell us about it.";
            }

            // Handlebars helpers
            Handlebars.registerHelper('messageHtml', function () {
                return new Handlebars.SafeString(this.message);
            });
        };

        this.render = function () {
            this.$el.html(errorTpl(errormsg));
            return this;
        };

        this.initialize();

    };

});

