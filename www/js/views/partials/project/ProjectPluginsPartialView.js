define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        projectPluginsHtml = require('text!partialtpl/project/projectPlugins.htm'),

        projectPluginsTpl = Handlebars.compile(projectPluginsHtml);


    return function (detected_plugins, supported_plugins) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for radAdvanced button
            this.$el.on('change', '#radAdvanced', function () {
                $('#advanced_plugins').show();
            });

            // Change Event for radAll/radDetected button
            this.$el.on('change', '#radAll', function () {
                $('#advanced_plugins').hide();
            });
            this.$el.on('change', '#radDetectedOnly', function () {
                $('#advanced_plugins').hide();
            });
        };

        this.render = function () {

            // Merge detected & supported plugins
            _.each(detected_plugins, function (sp) { sp.detected = true; });
            _.each(supported_plugins, function (sp) { sp.supported = true; });

            var temp_plugins = detected_plugins.concat(supported_plugins);
            var dup_plugins = [];
            var merged_plugins = _.map(temp_plugins, function (p, i) {
                var index = _.findIndex(dup_plugins, function (d) { return d === p; });
                if (index > -1) {
                    return null;
                } else {
                    var dup = _.find(temp_plugins, function (p2, i2) { return i2 !== i && p2.name === p.name; });
                    if (dup) {
                        dup_plugins.push(dup);
                        if (dup.supported) p.supported = dup.supported;
                        if (dup.detected) p.detected = dup.detected;
                    }
                    return p;
                }
            });
            merged_plugins = _.compact(merged_plugins);

            this.$el.html(projectPluginsTpl(merged_plugins));

            // Initial Display
            this.$el.find('#advanced_plugins').hide();

            return this;
        };

        this.initialize();

    };

});

