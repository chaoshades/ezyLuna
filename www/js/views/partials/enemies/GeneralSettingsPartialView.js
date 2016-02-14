define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        generalSettingsHtml = require('text!partialtpl/enemies/generalSettings.htm'),

        generalSettingsTpl = Handlebars.compile(generalSettingsHtml);


    return function (current) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for checkboxes that enables tags
            this.$el.on('click', '.js_Tags', function () {
                enableInputs(this);
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            this.$el.html(generalSettingsTpl(current));

            return this;
        };

        this.renderTags = function () {
            current.overrideparams = _.range(8).map(function () { return false });

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == "hp") {
                    current.overrideparams[0] = true;
                    current.params[0] = t.data;
                }
                else if (t.tag == "mp") {
                    current.overrideparams[1] = true;
                    current.params[1] = t.data;
                }
                else if (t.tag == "atk") {
                    current.overrideparams[2] = true;
                    current.params[2] = t.data;
                }
                else if (t.tag == "def") {
                    current.overrideparams[3] = true;
                    current.params[3] = t.data;
                }
                else if (t.tag == "mat") {
                    current.overrideparams[4] = true;
                    current.params[4] = t.data;
                }
                else if (t.tag == "mdf") {
                    current.overrideparams[5] = true;
                    current.params[5] = t.data;
                }
                else if (t.tag == "agi") {
                    current.overrideparams[6] = true;
                    current.params[6] = t.data;
                }
                else if (t.tag == "luk") {
                    current.overrideparams[7] = true;
                    current.params[7] = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkHP', 'hp', '#numHP');
            setValueTag(tags, '#chkMP', 'mp', '#numMP');
            setValueTag(tags, '#chkAtk', 'atk', '#numAtk');
            setValueTag(tags, '#chkDef', 'def', '#numDef');
            setValueTag(tags, '#chkMat', 'mat', '#numMat');
            setValueTag(tags, '#chkMdf', 'mdf', '#numMdf');
            setValueTag(tags, '#chkAgi', 'agi', '#numAgi');
            setValueTag(tags, '#chkLuk', 'luk', '#numLuk');

            return tags;
        };

        this.initialize();

    };

});

