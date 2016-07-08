define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        dataAdapter = require('adapters/data'),
        HomeView = require("view/HomeView"),
        EnemiesView = require("view/EnemiesView"),
        ItemsView = require("view/ItemsView"),
        SkillsView = require("view/SkillsView"),
        WeaponsView = require("view/WeaponsView"),
        ArmorsView = require("view/ArmorsView"),
        ErrorView = require("view/ErrorView"),
        MasterView = require("view/MasterView"),

        routes = [
            { name: "enemiesURL", url: /^#enemies\/?(\d{1,})?$/ },
            { name: "itemsURL", url: /^#items\/?(\d{1,})?$/ },
            { name: "skillsURL", url: /^#skills\/?(\d{1,})?$/ },
            { name: "weaponsURL", url: /^#weapons\/?(\d{1,})?$/ },
            { name: "armorsURL", url: /^#armors\/?(\d{1,})?$/ },
        ],

    route = function () {

        var hash = window.location.hash;

        // Default route
        if (!hash) {
            dataAdapter.getConfig()
            .done(function (config) {
                var requests = [];
                for (var i = 0; i < config.projects.length; i++) {
                    requests.push(dataAdapter.getSystem(config.projects[i].path));
                }

                $.when.apply($, requests)
                 .done(function () {
                     var data = _.map(arguments, function(a) {return _.first(a)}),
                         projects = _.map(config.projects, function (p, i) { p.system = data[i]; return p; });
                     console.log(projects);
                    changeContent(new HomeView(projects));
                });
            })
            .fail(errorHandler);
            return;
        }

        var mappedNormalRoute = _.find(routes, function (r) { return hash.match(r.url); });
        if (mappedNormalRoute) {
            // Normal routes
            normalRoute(mappedNormalRoute.name, hash.match(mappedNormalRoute.url));
        }

        // Page not found
        if (!mappedNormalRoute) {
            changeContent(new ErrorView("404"));
        }
        return;
    },

    start = function () {

        $(window).on('hashchange', function () { route(false); });
        route();
    },

    changeContent = function (page) {
        // Render current page
        var view = page.render();

        // Render MasterPage with page content
        var masterView = new MasterView(view.$el).render();

        $("body").html(masterView.$el);
    },

    errorHandler = function (error) {
        var hash = window.location.hash,
            return_url = hash.substr(1);

        changeContent(new ErrorView(error, return_url));
    },

    normalRoute = function (route, args) {

        switch (route) {

            case "enemiesURL":
                dataAdapter.getEnemies()
                .done(function (enemies) {
                    // Default to first one
                    var id = args[1];
                    if (!id)
                        id = 1;
                    dataAdapter.getEnemyById(id)
                    .done(function (current) {
                        $.when(
                            dataAdapter.getItems(),
                            dataAdapter.getArmors(),
                            dataAdapter.getWeapons(),
                            dataAdapter.getSkills(),
                            dataAdapter.getStates(),
                            dataAdapter.getAnimations(),
                            dataAdapter.getTypes(),
                            dataAdapter.getTerms(),
                            dataAdapter.getWeaponSprites(),
                            dataAdapter.getMotions()
                        ).done(function (items, armors, weapons, skills, states, animations, types, terms, weapon_sprites, motions) {
                            var linked_data = { "items": items, "armors": armors, "weapons": weapons, "skills": skills, "states": states, "animations": animations, "types": types, "terms": terms, "weapon_sprites": weapon_sprites, "motions": motions };
                            changeContent(new EnemiesView(enemies, current, linked_data));
                        });
                    })
                    .fail(errorHandler);
                })
                .fail(errorHandler);
                break;

            case "itemsURL":
                dataAdapter.getItems()
                .done(function (items) {
                    // Default to first one
                    var id = args[1];
                    if (!id)
                        id = 1;
                    dataAdapter.getItemById(id)
                    .done(function (current) {
                        changeContent(new ItemsView(items, current));
                    })
                    .fail(errorHandler);
                })
                .fail(errorHandler);
                break;

            case "skillsURL":
                dataAdapter.getSkills()
                .done(function (skills) {
                    // Default to first one
                    var id = args[1];
                    if (!id)
                        id = 1;
                    dataAdapter.getSkillById(id)
                    .done(function (current) {
                        changeContent(new SkillsView(skills, current));
                    })
                    .fail(errorHandler);
                })
                .fail(errorHandler);
                break;

            case "weaponsURL":
                dataAdapter.getWeapons()
                .done(function (weapons) {
                    // Default to first one
                    var id = args[1];
                    if (!id)
                        id = 1;
                    dataAdapter.getWeaponById(id)
                    .done(function (current) {
                        changeContent(new WeaponsView(weapons, current));
                    })
                    .fail(errorHandler);
                })
                .fail(errorHandler);
                break;

            case "armorsURL":
                dataAdapter.getArmors()
                .done(function (armors) {
                    // Default to first one
                    var id = args[1];
                    if (!id)
                        id = 1;
                    dataAdapter.getArmorById(id)
                    .done(function (current) {
                        changeContent(new ArmorsView(armors, current));
                    })
                    .fail(errorHandler);
                })
                .fail(errorHandler);
                break;
        }
    };

    // The public API
    return {
        start: start
    };

});