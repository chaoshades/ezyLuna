define(function (require) {

    "use strict";

    var NB_PARAMS = 8,
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        buffsStatesSettingsHtml = require('text!partialtpl/enemies/buffsStatesSettings.htm'),

        buffsStatesSettingsTpl = Handlebars.compile(buffsStatesSettingsHtml),

        MAX_HP_BUFF = "Max maxhp Buff",
        MAX_MP_BUFF = "Max maxmp Buff",
        MAX_ATK_BUFF = "Max atk Buff",
        MAX_DEF_BUFF = "Max def Buff",
        MAX_MAT_BUFF = "Max mat Buff",
        MAX_MDF_BUFF = "Max mdf Buff",
        MAX_AGI_BUFF = "Max agi Buff",
        MAX_LUK_BUFF = "Max luk Buff",
        MAX_HP_DEBUFF = "Max maxhp Debuff",
        MAX_MP_DEBUFF = "Max maxmp Debuff",
        MAX_ATK_DEBUFF = "Max atk Debuff",
        MAX_DEF_DEBUFF = "Max def Debuff",
        MAX_MAT_DEBUFF = "Max mat Debuff",
        MAX_MDF_DEBUFF = "Max mdf Debuff",
        MAX_AGI_DEBUFF = "Max agi Debuff",
        MAX_LUK_DEBUFF = "Max luk Debuff",
        SHOW_STATE_TURN = "Show State Turn";


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

            this.$el.html(buffsStatesSettingsTpl(current));

            // Initial Display
            openCollapse(this.$el.find('#collapseBuffsStatesSettings'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
        };

        this.renderTags = function () {
            current.maxbuffparams = _.range(NB_PARAMS).map(function () { return null });
            current.maxdebuffparams = _.range(NB_PARAMS).map(function () { return null });

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == MAX_HP_BUFF) {
                    current.maxbuffparams[0] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_MP_BUFF) {
                    current.maxbuffparams[1] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_ATK_BUFF) {
                    current.maxbuffparams[2] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_DEF_BUFF) {
                    current.maxbuffparams[3] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_MAT_BUFF) {
                    current.maxbuffparams[4] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_MDF_BUFF) {
                    current.maxbuffparams[5] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_AGI_BUFF) {
                    current.maxbuffparams[6] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_LUK_BUFF) {
                    current.maxbuffparams[7] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_HP_DEBUFF) {
                    current.maxdebuffparams[0] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_MP_DEBUFF) {
                    current.maxdebuffparams[1] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_ATK_DEBUFF) {
                    current.maxdebuffparams[2] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_DEF_DEBUFF) {
                    current.maxdebuffparams[3] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_MAT_DEBUFF) {
                    current.maxdebuffparams[4] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_MDF_DEBUFF) {
                    current.maxdebuffparams[5] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_AGI_DEBUFF) {
                    current.maxdebuffparams[6] = t.data.replace('+', '');
                }
                else if (t.tag == MAX_LUK_DEBUFF) {
                    current.maxdebuffparams[7] = t.data.replace('+', '');
                }
                else if (t.tag == SHOW_STATE_TURN) {
                    current.showStateTurn.enabled = true;
                }
            });
        };

        this.generateTags = function () {
            var tags = [];
  
            setSignedValueTag(tags, '#chkMaxHPBuff', MAX_HP_BUFF, '#numMaxHPBuff');
            setSignedValueTag(tags, '#chkMaxMPBuff', MAX_MP_BUFF, '#numMaxMPBuff');
            setSignedValueTag(tags, '#chkMaxAtkBuff', MAX_ATK_BUFF, '#numMaxAtkBuff');
            setSignedValueTag(tags, '#chkMaxDefBuff', MAX_DEF_BUFF, '#numMaxDefBuff');
            setSignedValueTag(tags, '#chkMaxMatBuff', MAX_MAT_BUFF, '#numMaxMatBuff');
            setSignedValueTag(tags, '#chkMaxMdfBuff', MAX_MDF_BUFF, '#numMaxMdfBuff');
            setSignedValueTag(tags, '#chkMaxAgiBuff', MAX_AGI_BUFF, '#numMaxAgiBuff');
            setSignedValueTag(tags, '#chkMaxLukBuff', MAX_LUK_BUFF, '#numMaxLukBuff');
            setSignedValueTag(tags, '#chkMaxHPDebuff', MAX_HP_DEBUFF, '#numMaxHPDebuff');
            setSignedValueTag(tags, '#chkMaxMPDebuff', MAX_MP_DEBUFF, '#numMaxMPDebuff');
            setSignedValueTag(tags, '#chkMaxAtkDebuff', MAX_ATK_DEBUFF, '#numMaxAtkDebuff');
            setSignedValueTag(tags, '#chkMaxDefDebuff', MAX_DEF_DEBUFF, '#numMaxDefDebuff');
            setSignedValueTag(tags, '#chkMaxMatDebuff', MAX_MAT_DEBUFF, '#numMaxMatDebuff');
            setSignedValueTag(tags, '#chkMaxMdfDebuff', MAX_MDF_DEBUFF, '#numMaxMdfDebuff');
            setSignedValueTag(tags, '#chkMaxAgiDebuff', MAX_AGI_DEBUFF, '#numMaxAgiDebuff');
            setSignedValueTag(tags, '#chkMaxLukDebuff', MAX_LUK_DEBUFF, '#numMaxLukDebuff');
            setTag(tags, '#chkShowStateTurn', SHOW_STATE_TURN);

            return tags;
        };

        this.initialize();

    };

});

