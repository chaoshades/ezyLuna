define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        generalSettingsHtml = require('text!partialtpl/enemies/generalSettings.htm'),

        generalSettingsTpl = Handlebars.compile(generalSettingsHtml),
            
        HP = "hp",
        MP = "mp",
        ATK = "atk",
        DEF = "def",
        MAT = "mat",
        MDF = "mdf",
        AGI = "agi",
        LUK = "luk";


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
                if (t.tag == HP) {
                    current.overrideparams[0] = true;
                    current.params[0] = t.data;
                }
                else if (t.tag == MP) {
                    current.overrideparams[1] = true;
                    current.params[1] = t.data;
                }
                else if (t.tag == ATK) {
                    current.overrideparams[2] = true;
                    current.params[2] = t.data;
                }
                else if (t.tag == DEF) {
                    current.overrideparams[3] = true;
                    current.params[3] = t.data;
                }
                else if (t.tag == MAT) {
                    current.overrideparams[4] = true;
                    current.params[4] = t.data;
                }
                else if (t.tag == MDF) {
                    current.overrideparams[5] = true;
                    current.params[5] = t.data;
                }
                else if (t.tag == AGI) {
                    current.overrideparams[6] = true;
                    current.params[6] = t.data;
                }
                else if (t.tag == LUK) {
                    current.overrideparams[7] = true;
                    current.params[7] = t.data;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setValueTag(tags, '#chkHP', HP, '#numHP');
            setValueTag(tags, '#chkMP', MP, '#numMP');
            setValueTag(tags, '#chkAtk', ATK, '#numAtk');
            setValueTag(tags, '#chkDef', DEF, '#numDef');
            setValueTag(tags, '#chkMat', MAT, '#numMat');
            setValueTag(tags, '#chkMdf', MDF, '#numMdf');
            setValueTag(tags, '#chkAgi', AGI, '#numAgi');
            setValueTag(tags, '#chkLuk', LUK, '#numLuk');

            return tags;
        };

        this.initialize();

    };

});

