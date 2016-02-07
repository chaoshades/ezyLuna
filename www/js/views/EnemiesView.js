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

            // Click Event for checkboxes that enables tags
            this.$el.on('click', '.js_Tags', function () {
                var ctrl = $(this).parent().next(),
                    attr = null;
                if ($(this).is(':checked')) {
                    if (ctrl.is('select') || ctrl.hasClass('radio') || ctrl.hasClass('checkbox'))
                        attr = 'disabled';
                    else
                        attr = 'readonly';

                    if (ctrl.hasClass('radio'))
                        $(ctrl).find('input[type=radio]').removeAttr(attr);
                    else if (ctrl.hasClass('checkbox'))
                        $(ctrl).find('input[type=checkbox]').removeAttr(attr);

                    $(ctrl).removeAttr(attr);
                } else {
                    if (ctrl.is('select') || ctrl.hasClass('radio') || ctrl.hasClass('checkbox'))
                        attr = 'disabled';
                    else
                        attr = 'readonly';

                    if (ctrl.hasClass('radio'))
                        $(ctrl).find('input[type=radio]').attr(attr, attr);
                    else if (ctrl.hasClass('checkbox'))
                        $(ctrl).find('input[type=checkbox]').attr(attr, attr);

                    $(ctrl).attr(attr, attr);
                }
            });

            // Click Event for GenerateTags button
            var setTagCallback = this.setTag;
            var setValueTagCallback = this.setValueTag;
            var setPercentValueTagCallback = this.setPercentValueTag;
            var generateTagsCallback = this.generateTags;
            this.$el.on('click', '#btnGenerateTags', function () {
                generateTagsCallback(setValueTagCallback, setTagCallback, setPercentValueTagCallback);
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

            if (current.tags) {
                this.renderTags();
            }

            if (current.dropItems) {
                this.renderDropItems();
            }
            this.renderTraits();
            this.renderActions();

            var data = {
                'paged_enemies': paged_enemies,
                'current': current,
                'animations': linked_data.animations
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

        this.setTag = function (tags, chkSelector, tag) {
            if ($(chkSelector).is(':checked'))
                tags.push(new NoteTag(tag));
        };

        this.setValueTag = function (tags, chkSelector, tag, valSelector) {
            var value = $(valSelector).val();
            if ($(chkSelector).is(':checked') && value)
                tags.push(new NoteTag(tag, value));
        };

        this.setPercentValueTag = function (tags, chkSelector, tag, valSelector) {
            var value = $(valSelector).val();
            if ($(chkSelector).is(':checked') && value)
                tags.push(new NoteTag(tag, value/100));
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

        this.renderTags = function () {
            current.overrideparams = _.range(8).map(function () { return false });
            current.overrideexp = false;
            current.overridegold = false;
            current.breathing = {};
            current.floating = {};

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                // Core Settings
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

                if (t.tag == "exp") {
                    current.overrideexp = true;
                    current.exp = t.data;
                }
                else if (t.tag == "gold") {
                    current.overridegold = true;
                    current.gold = t.data;
                }

                // Battle Settings
                if (t.tag == "Reflect Animation ID") {
                    current.reflectAnimationID = t.data;
                }
                else if (t.tag == "Sprite Cannot Move") {
                    current.spriteCannotMove = true;
                }

                // Animated SideView Settings
                if (t.tag == "Breathing") {
                    current.breathing.enabled = true;
                    current.breathing.yes = true;
                }
                else if (t.tag == "No Breathing") {
                    current.breathing.enabled = true;
                    current.breathing.no = true;
                }
                else if (t.tag == "Breathing Speed") {
                    current.breathing.speed = t.data;
                }
                else if (t.tag == "Breathing Rate X") {
                    current.breathing.rateX = t.data*100;
                }
                else if (t.tag == "Breathing Rate Y") {
                    current.breathing.rateY = t.data*100;
                }

                if (t.tag == "Floating") {
                    current.floating.enabled = true;
                }
                else if (t.tag == "Floating Speed") {
                    current.floating.speed = t.data;
                }
                else if (t.tag == "Floating Height") {
                    current.floating.height = t.data;
                }

            });
        };

        this.generateTags = function (setValueTagCallback, setTagCallback, setPercentValueTagCallback) {
            var tags = [];
            // Core Settings
            setValueTagCallback(tags, '#chkHP', 'hp', '#numHP');
            setValueTagCallback(tags, '#chkMP', 'mp', '#numMP');
            setValueTagCallback(tags, '#chkAtk', 'atk', '#numAtk');
            setValueTagCallback(tags, '#chkDef', 'def', '#numDef');
            setValueTagCallback(tags, '#chkMat', 'mat', '#numMat');
            setValueTagCallback(tags, '#chkMdf', 'mdf', '#numMdf');
            setValueTagCallback(tags, '#chkAgi', 'agi', '#numAgi');
            setValueTagCallback(tags, '#chkLuk', 'luk', '#numLuk');

            setValueTagCallback(tags, '#chkExp', 'exp', '#numExp');
            setValueTagCallback(tags, '#chkGold', 'gold', '#numGold');

            // Battle Settings
            setValueTagCallback(tags, '#chkReflectAnimation', 'Reflect Animation ID', '#ddlReflectAnimation');
            setTagCallback(tags, '#chkSpriteCannotMove', 'Sprite Cannot Move');

            // Animated SideView Settings
            if ($('#chkBreathing').is(':checked')) {
                setTagCallback(tags, '#radBreathing', 'Breathing');
                setTagCallback(tags, '#radNoBreathing', 'No Breathing');
            }
            setValueTagCallback(tags, '#chkBreathingSpeed', 'Breathing Speed', '#numBreathingSpeed');
            setPercentValueTagCallback(tags, '#chkBreathingRateX', 'Breathing Rate X', '#numBreathingRateX');
            setPercentValueTagCallback(tags, '#chkBreathingRateY', 'Breathing Rate Y', '#numBreathingRateY');

            setTagCallback(tags, '#chkFloating', 'Floating');
            setValueTagCallback(tags, '#chkFloatingSpeed', 'Floating Speed', '#numFloatingSpeed');
            setValueTagCallback(tags, '#chkFloatingHeight', 'Floating Height', '#numFloatingHeight');

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
        };

        this.initialize();

    };

});

