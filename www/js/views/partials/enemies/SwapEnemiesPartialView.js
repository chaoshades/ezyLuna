define(function (require) {

    "use strict";

    var STATE_KEY = "swap_enemies",
        $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        UIConfig = require('ui-config'),
        Switch = require('bootstrap-switch'),
        InlineEditTablePartialView = require("partial/InlineEditTablePartialView"),
        PluginTooltipPartialView = require("partial/PluginTooltipPartialView"),
        YEPSwapEnemies = require("tag/yep-45-swap-enemies"),
        swapEnemiesHtml = require('text!partialtpl/enemies/swapEnemies.htm'),

        swapEnemiesTpl = Handlebars.compile(swapEnemiesHtml),

        SWAP = "Swap",
        SWAP_2 = "Swap#2";

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
                if (id === 'chkSwap')
                    dataSelector = 'swap';
                else if (id === 'chkSwapRange')
                    dataSelector = 'swapRange';

                if (dataSelector) {
                    var state_data = getStateManagerCallback().getState(STATE_KEY).data;
                    state_data[dataSelector].enabled = $(this).is(':checked');
                    getStateManagerCallback().setState(STATE_KEY, state_data);
                }
            });

        };

        this.render = function () {
            if (current.tags) {
                this.renderTags();
            }

            var data = {
                'current': current,
                'plugin': YEPSwapEnemies,
                'enemies': linked_data.enemies
            };

            var templateSets = [
                new InlineEditTableTemplateSet($(swapEnemiesHtml), "#tplSwap"),
                new InlineEditTableTemplateSet($(swapEnemiesHtml), "#tplSwapRange")
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
                'swap': new InlineEditTablePartialView(data, templateInfos["tplSwap"], $stateManager, STATE_KEY, "swap", this.saveSwap),
                'swap_range': new InlineEditTablePartialView(data, templateInfos["tplSwapRange"], $stateManager, STATE_KEY, "swapRange", this.saveSwapRange),
                'tooltipSwapEnemies': new PluginTooltipPartialView(YEPSwapEnemies)
            }

            this.$el.html(swapEnemiesTpl(data));

            // Render partial views
            var wrapperReference = this.$el;
            var renderedPartials = _.mapObject(partials, function (p, key) { wrapperReference.find('#' + key).html(p.render().$el); });

            // Initial Display
            openCollapse(this.$el.find('#collapseSwapEnemies'));
            this.$el.find('input[type="checkbox"]').bootstrapSwitch(UIConfig.switch.tag);
            this.$el.find('[data-toggle="popover"]').popover(UIConfig.popover.tag(YEPSwapEnemies));

            return this;
        };

        this.renderTags = function () {
            current.swap = {};
            current.swap.list = [];
            current.swapRange = {};
            current.swapRange.list = [];

            // Define new properties for tags display
            _.each(current.tags, function (t) {
                if (t.tag == SWAP) {
                    current.swap.enabled = true;

                    _.each(t.data, function (id) {
                        var enemy = _.find(linked_data.enemies, function (enemy) { return enemy.id == id; });

                        current.swap.list.push({
                            enemyID: id,
                            enemy: enemy.name
                        });
                    });
                }
                else if (t.tag == SWAP_2) {
                    current.swapRange.enabled = true;

                    var enemyStart = _.find(linked_data.enemies, function (enemy) { return enemy.id == t.data[0]; }),
                        enemyEnd = _.find(linked_data.enemies, function (enemy) { return enemy.id == t.data[1]; });

                    current.swapRange.list.push({
                        start: t.data[0],
                        enemyStart: enemyStart.name,
                        end: t.data[1],
                        enemyEnd: enemyEnd.name
                    });
                }
            });

            var data = {
                'swap': new InlineEditTableDataInfo(current.swap.enabled, current.swap.list),
                'swapRange': new InlineEditTableDataInfo(current.swapRange.enabled, current.swapRange.list),
            }
            this.getStateManager().setState(STATE_KEY, data);
        };

        this.generateTags = function () {
            var tags = [],
                state_data = this.getStateManager().getState(STATE_KEY).data;

            setObjectValuesTag(tags, state_data, 'swap', SWAP, function (item) { return item.enemyID; });
            setObjectTag(tags, state_data, 'swapRange', SWAP_2, function (item) { return [item.start, item.end]; });

            return tags;
        };

        this.getSupportedTag = function () {
            return YEPSwapEnemies;
        };

        this.getStateManager = function () {
            return $stateManager;
        };

        this.saveSwap = function (obj) {
            var enemyID = $('#ddlSwap').val();
            var enemy = _.find(linked_data.enemies, function (enemy) { return enemy.id == enemyID; });

            obj.enemyID = enemy.id;
            obj.enemy = enemy.name;
        };

        this.saveSwapRange = function (obj) {
            var enemyStartID = $('#ddlSwapRangeStart').val(),
                enemyEndID = $('#ddlSwapRangeEnd').val();
            var enemyStart = _.find(linked_data.enemies, function (enemy) { return enemy.id == enemyStartID; }),
                enemyEnd = _.find(linked_data.enemies, function (enemy) { return enemy.id == enemyEndID; });

            obj.start = enemyStart.id;
            obj.enemyStart = enemyStart.name;
            obj.end = enemyEnd.id;
            obj.enemyEnd = enemyEnd.name;
        };

        this.initialize();

    };

});

