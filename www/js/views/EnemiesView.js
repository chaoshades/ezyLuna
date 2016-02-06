define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Handlebars = require('handlebars'),
        PageMe = require('jquery.pageme'),
        tagAdapter = require('adapters/tag'),
        enemiesHtml = require('text!tpl/enemies.htm'),

        enemiesTpl = Handlebars.compile(enemiesHtml),
            
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
            "",
            "Auto Battle",
            "Guard",
            "Substitute",
            "Preserve TP"
        ],
        COLLAPSE_EFFECTS = [
            "",
            "Normal",
            "Boss",
            "Instant",
            "No Disappear"
        ],
        PARTY_ABILITIES = [
            "",
            "Encounter Half",
            "Encounter None",
            "Cancel Surprise",
            "Raise Preemptive",
            "Gold Double",
            "Drop Item Double"
        ];


    return function (enemies, current, linked_data) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Click Event for sidebar buttons
            this.$el.on('click', '.list-group-item', function () {
                $('.list-group > .active').removeClass('active');
                $(this).addClass('active');
            });

            // Click Event for checkboxes
            this.$el.on('click', '.js_Stat', function () {
                var txt = $(this).parent().next();
                if ($(this).is(':checked')) {
                    $(txt).removeAttr('readonly');
                } else {
                    $(txt).attr('readonly', 'readonly');
                }
            });

            // Click Event for sidebar buttons
            this.$el.on('click', '#btnGenerateTags', function () {
                var tags = [];
                if ($('#chkHP').is(':checked'))
                    tags.push(new NoteTag("hp", $('#numHP').val()));
                if ($('#chkMP').is(':checked'))
                    tags.push(new NoteTag("mp", $('#numMP').val()));
                if ($('#chkAtk').is(':checked'))
                    tags.push(new NoteTag("atk", $('#numAtk').val()));
                if ($('#chkDef').is(':checked'))
                    tags.push(new NoteTag("def", $('#numDef').val()));
                if ($('#chkMat').is(':checked'))
                    tags.push(new NoteTag("mat", $('#numMat').val()));
                if ($('#chkMdf').is(':checked'))
                    tags.push(new NoteTag("mdf", $('#numMdf').val()));
                if ($('#chkAgi').is(':checked'))
                    tags.push(new NoteTag("agi", $('#numAgi').val()));
                if ($('#chkLuk').is(':checked'))
                    tags.push(new NoteTag("luk", $('#numLuk').val()));

                tagAdapter.getStringFromNoteTags(tags)
                .done(function (output) {

                    $('#successTags').hide();
                    $('#errorNoTags').hide();
                    if (output)
                        $('#successTags').show();
                    else
                        $('#errorNoTags').show();

                    $('#txtOutput').val(output);
                });
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
            var paged_enemies = [];
            var temp = enemies.slice(0);
            while (temp.length > 0) {
                paged_enemies.push(temp.splice(0, 15));
            }

            if (current.dropItems) {
                this.renderDropItems();
            }
            this.renderTraits();
            this.renderActions();

            var data = {
                'paged_enemies': paged_enemies,
                'current': current
            };
            this.$el.html(enemiesTpl(data));

            this.setActiveMenuItem(current.id);

            this.$el.find('#successTags').hide();
            this.$el.find('#errorNoTags').hide();

            // Enables carousel
            this.$el.find('.carousel').carousel({
                interval: false
            });
            
            this.$el.find('.carousel .item:has(.list-group a.active)').addClass('active');

            // Adds pagers to tables
            this.$el.find('#tblTraits').pageMe({ pagerSelector: this.$el.find('#pgTraits'), showPrevNext: true, hidePageNumbers: false, perPage: 12 });
            this.$el.find('#tblActions').pageMe({ pagerSelector: this.$el.find('#pgActions'), showPrevNext: true, hidePageNumbers: false, perPage: 8 });

            return this;
        };

        this.clearActiveMenuItem = function () {
            this.$el.find('.list-group > .active').removeClass('active');
        };

        this.setActiveMenuItem = function (id) {
            this.clearActiveMenuItem();
            this.$el.find('.list-group a[href="#enemies/' + id + '"]').addClass('active');
        };

        this.renderDropItems = function () {
            // Define new properties for drops display
            _.each(current.dropItems, function (drop) {
                if (drop.kind == 1) {
                    // Get item name
                    var item = _.find(linked_data.items, function (i) { return i.id == drop.dataId; });
                    drop.name = item.name;
                }
                else if (drop.kind == 2) {
                    // Get weapon name
                    var weapon = _.find(linked_data.weapons, function (w) { return w.id == drop.dataId; });
                    drop.name = weapon.name;
                }
                else if (drop.kind == 3) {
                    // Get armor name
                    var armor = _.find(linked_data.armors, function (a) { return a.id == drop.dataId; });
                    drop.name = armor.name;
                }
            });
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
                    trait.label = SPECIAL_FLAGS[trait.value];
                }

                // Collapse effect trait only
                if (trait.code === 63) {
                    // Get effect
                    trait.label = COLLAPSE_EFFECTS[trait.value];
                }

                // Party ability trait only
                if (trait.code === 64) {
                    // Get ability
                    trait.label = PARTY_ABILITIES[trait.value];
                }
            }
        };

        this.renderActions = function () {
            // Define new properties for actions display
            for (var i = 0; i < current.actions.length; i++) {
                var action = current.actions[i];

                // Get skill name
                var skill = _.find(linked_data.skills, function (s) { return s.id == action.skillId; });
                action.skill = skill.name;

                // State action only
                if (action.conditionType === 4) {
                    // Get state name
                    var state = _.find(linked_data.states, function (s) { return s.id == action.conditionParam1; });
                    action.state = state.name;
                }
            }
        };

        this.initialize();

    };

});

