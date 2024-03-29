﻿define(function (require) {

    "use strict";

    var NB_PARAMS = 8,
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPCoreEngine = require("tag/yep-1-core-engine"),
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

            // Change Event for checkboxes that enables tags
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'plugin': YEPCoreEngine
            };
            this.$el.html(generalSettingsTpl(data));

            var partials = {
                'tooltipGeneralSettings': new PluginTooltipPartialView(YEPCoreEngine)
            }

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPCoreEngine));

            return this;
        };

        this.renderTags = function () {
            current.overrideparams = _.range(NB_PARAMS).map(function () { return false });

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

        this.getSupportedTag = function () {
            return YEPCoreEngine;
        };

        this.initialize();

    };

});

