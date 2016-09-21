define(function (require) {

    "use strict";

    var STATE_KEY = "extra_drops",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        dropItemsHtml = require('text!partialtpl/enemies/dropItems.htm'),

        dropItemsTpl = Handlebars.compile(dropItemsHtml),

        ITEM = "Item",
        WEAPON = "Weapon",
        ARMOR = "Armor";


    return function (current, linked_data, $stateManager) {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');

            // Change Event for checkboxes that enables tags
            var getStateManagerCallback = this.getStateManager;
            this.$el.on('change', '.js_Tags', function () {
                enableInputs(this);

                var id = $(this).attr('id'),
                    dataSelector = null;
                if (id === 'chkExtraDrops')
                    dataSelector = 'extraDrops';

                var state_data = getStateManagerCallback().getState(STATE_KEY).data;
                state_data[dataSelector].enabled = $(this).is(':checked');
                getStateManagerCallback().setState(STATE_KEY, state_data);
            });
        };

        this.render = function () {
            if (current.dropItems) {
                this.renderDropItems();
            }

            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'items': linked_data.items,
                'weapons': linked_data.weapons,
                'armors': linked_data.armors
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(dropItemsHtml),"#tplExtraDrops")
            ];
            var templateInfos = {};

            // Register partials for every template in template sets
            _.each(templateSets, function (set) {
                _.each(set.templates, function(t) {
                    Handlebars.registerPartial(t.name, t.template);
                });
                templateInfos[set.setID] = new InlineEditTableTemplateInfo(set);
            });

            var partials = {
                'extra_drops': new InlineEditTablePartialView(data, templateInfos["tplExtraDrops"], $stateManager, STATE_KEY, "extraDrops", this.saveExtraDrops)
            }

            this.$el.html(dropItemsTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);

            return this;
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

        this.renderTags = function () {
            current.extraDrops = {}
            current.extraDrops.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == ITEM) {
                    current.extraDrops.enabled = true;

                    var item = _.find(linked_data.items, function (item) { return item.id == t.data[0]; });

                    current.extraDrops.list.push({
                        kind: 1,
                        itemID: t.data[0],
                        item: item.name,
                        probability: t.data[1]
                    });
                }
                else if (t.tag == WEAPON) {
                    current.extraDrops.enabled = true;

                    var weapon = _.find(linked_data.weapons, function (weapon) { return weapon.id == t.data[0]; });

                    current.extraDrops.list.push({
                        kind: 2,
                        itemID: t.data[0],
                        item: weapon.name,
                        probability: t.data[1]
                    });
                }
                else if (t.tag == ARMOR) {
                    current.extraDrops.enabled = true;

                    var armor = _.find(linked_data.armors, function (armor) { return armor.id == t.data[0]; });

                    current.extraDrops.list.push({
                        kind: 3,
                        itemID: t.data[0],
                        item: armor.name,
                        probability: t.data[1]
                    });
                }
            });

            var data = {
                'extraDrops': new InlineEditTableDataInfo(current.extraDrops.enabled, current.extraDrops.list)
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            if (state_data['extraDrops'].enabled) {
                _.each(state_data['extraDrops'].data, function (item) { 
                    var tag;
                    if (item.kind == 1)
                        tag = ITEM
                    else if (item.kind == 2)
                        tag = WEAPON;
                    else if (item.kind == 3)
                        tag = ARMOR;

                    tags.push(new NoteTag(tag, [item.itemID, item.probability]));
                });
            }

            return tags;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveExtraDrops = function (obj) {
            var kind = $('#ddlExtraDropItem').find(':selected').closest('optgroup').data('kind'),
                item = null;
            if (kind == 1) {
                var itemID = $('#ddlExtraDropItem').val();
                item = _.find(linked_data.items, function (i) { return i.id == itemID; });
            }
            else if (kind == 2) {
                var weaponID = $('#ddlExtraDropItem').val();
                item = _.find(linked_data.weapons, function (w) { return w.id == weaponID; });
            }
            else if (kind == 3) {
                var armorID = $('#ddlExtraDropItem').val();
                item = _.find(linked_data.armors, function (a) { return a.id == armorID; });
            }

            obj.kind = kind;
            obj.itemID = item.id,
            obj.item = item.name,
            obj.probability = $('#numExtraDropItemProbability').val()
        };

        this.initialize();

    };

});

