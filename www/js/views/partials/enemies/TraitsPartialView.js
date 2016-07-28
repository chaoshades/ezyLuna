define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        TablePagerPartialView = require("partial/TablePagerPartialView"),
        traitsHtml = require('text!partialtpl/enemies/traits.htm'),

        traitsTpl = Handlebars.compile(traitsHtml),
     
        PAGE_SIZE = 12,
        EX_PARAMETERS = [
            "Hit Rate",
            "Evasion Rate",
            "Critical Rate",
            "Critical Evasion",
            "Magic Evasion",
            "Magic Reflection",
            "Counter Attack",
            "HP Regeneration",
            "MP Regeneration",
            "TP Regeneration"
        ],
        SP_PARAMETERS = [
            "Target Rate",
            "Guard Effect",
            "Recovery Effect",
            "Pharmacology",
            "MP Cost Rate",
            "TP Charge Rate",
            "Physical Damage",
            "Magical Damage",
            "Floor Damage",
            "Experience"
        ],
        SLOT_TYPES = [
            "Normal",
            "Dual Wield"
        ],
        SPECIAL_FLAGS = [
            "Auto Battle",
            "Guard",
            "Substitute",
            "Preserve TP"
        ],
        COLLAPSE_EFFECTS = [
            "Normal",
            "Boss",
            "Instant",
            "No Disappear"
        ],
        PARTY_ABILITIES = [
            "Encounter Half",
            "Encounter None",
            "Cancel Surprise",
            "Raise Preemptive",
            "Gold Double",
            "Drop Item Double"
        ];


    return function (current, linked_data) {

        var pager = new TablePagerPartialView(current.traits, PAGE_SIZE);

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
        };

        this.render = function () {
            this.renderTraits();

            this.$el.html(traitsTpl(current));

            // Render pager
            this.$el.find('#pgTraits').html(pager.render().$el);

            pager.setTableReference(this.$el.find('#tblTraits'));

            return this;
        };

        this.renderTraits = function () {
            // Define new properties for traits display
            for (var i = 0; i < current.traits.length; i++) {
                var trait = current.traits[i];

                // Element trait only
                if (trait.code === 11 || trait.code === 31) {
                    // Get element name
                    trait.element = linked_data.types.elements[trait.dataId];
                }

                // Parameter trait only
                if (trait.code === 12 || trait.code === 21) {
                    // Get param
                    trait.param = linked_data.terms.params[trait.dataId];
                }

                // Ex-Parameter trait only
                if (trait.code === 22) {
                    // Get param
                    trait.param = EX_PARAMETERS[trait.dataId];
                }

                // Sp-Parameter trait only
                if (trait.code === 23) {
                    // Get param
                    trait.param = SP_PARAMETERS[trait.dataId];
                }

                // State trait only
                if (trait.code === 13 || trait.code === 14 || trait.code === 32) {
                    // Get state name
                    var state = _.find(linked_data.states, function (s) { return s.id == trait.dataId; });
                    trait.state = state.name;
                }

                // Skill type trait only
                if (trait.code === 41 || trait.code === 42) {
                    // Get skill type
                    trait.type = linked_data.types.skillTypes[trait.dataId];
                }

                // Skill trait only
                if (trait.code === 43 || trait.code === 44) {
                    // Get skill name
                    var skill = _.find(linked_data.skills, function (s) { return s.id == trait.dataId; });
                    trait.skill = skill.name;
                }

                // Weapon type trait only
                if (trait.code === 51) {
                    // Get weapon type
                    trait.type = linked_data.types.weaponTypes[trait.dataId];
                }

                // Armor type trait only
                if (trait.code === 52) {
                    // Get armor type
                    trait.type = linked_data.types.armorTypes[trait.dataId];
                }

                // Equip type trait only
                if (trait.code === 53 || trait.code === 54) {
                    // Get equip type
                    trait.type = linked_data.types.equipTypes[trait.dataId];
                }

                // Slot type trait only
                if (trait.code === 55) {
                    // Get slot type
                    trait.type = SLOT_TYPES[trait.dataId];
                }

                // Special flag trait only
                if (trait.code === 62) {
                    // Get flag
                    trait.label = SPECIAL_FLAGS[trait.dataId];
                }

                // Collapse effect trait only
                if (trait.code === 63) {
                    // Get effect
                    trait.label = COLLAPSE_EFFECTS[trait.dataId];
                }

                // Party ability trait only
                if (trait.code === 64) {
                    // Get ability
                    trait.label = PARTY_ABILITIES[trait.dataId];
                }
            }
        };

        this.initialize();

    };

});

