define(function (require) {

    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handlebars'),
        dataAdapter = require('adapters/data'),
        StateManager = require("app/StateManager"),
        HomeView = require("view/HomeView"),
        ProjectView = require("view/ProjectView"),
        ProjectAddView = require("view/ProjectAddView"),
        EnemiesView = require("view/EnemiesView"),
        ItemsView = require("view/ItemsView"),
        SkillsView = require("view/SkillsView"),
        SkillsActionView = require("view/SkillsActionView"),
        WeaponsView = require("view/WeaponsView"),
        ArmorsView = require("view/ArmorsView"),
        ErrorView = require("view/ErrorView"),
        MasterView = require("view/MasterView"),

        routes = [
            { name: "projectURL", url: /^#project\/(\d{1,})$/ },
            { name: "projectAddURL", url: /^#project\/add$/ },
            { name: "enemiesURL", url: /^#project\/(\d{1,})\/enemies\/?(\d{1,})?$/ },
            { name: "itemsURL", url: /^#project\/(\d{1,})\/items\/?(\d{1,})?$/ },
            { name: "skillsURL", url: /^#project\/(\d{1,})\/skills\/?(\d{1,})?$/ },
            { name: "weaponsURL", url: /^#project\/(\d{1,})\/weapons\/?(\d{1,})?$/ },
            { name: "armorsURL", url: /^#project\/(\d{1,})\/armors\/?(\d{1,})?$/ },
            { name: "skillsActionURL", url: /^#project\/(\d{1,})\/skills\/action\/?(\d{1,})?$/ }
        ],
        stateManager = new StateManager(),
        _callback = null,

    route = function () {

        var hash = window.location.hash;

        // Default route
        if (!hash) {
            dataAdapter.getConfig()
            .done(function (config) {
                if (config.projects.length === 1) {
                    var project = _.first(config.projects);
                    dataAdapter.setConfig(project);
                    dataAdapter.getSystem()
                     .done(function (system) {
                         project.system = system;
                         changeContent(new HomeView(project));
                     })
                    .fail(errorHandler);
                } else if (config.projects.length > 1) {
                    var requests = [];
                    for (var i = 0; i < config.projects.length; i++) {
                        dataAdapter.setConfig(config.projects[i]);
                        requests.push(dataAdapter.getSystem());
                    }

                    $.when.apply($, requests)
                     .done(function () {
                         var data = arguments,
                             projects = _.map(config.projects, function (p, i) { p.system = data[i]; return p; });
                         changeContent(new HomeView(projects));
                     })
                    .fail(errorHandler);
                } else
                    changeContent(new HomeView([]));
            })
            .fail(errorHandler);
            return;
        }

        var mappedNormalRoute = _.find(routes, function (r) { return hash.match(r.url); });
        if (mappedNormalRoute) {
            stateManager.clearAllStates();

            if (mappedNormalRoute.name === "projectAddURL") {
                changeContent(new ProjectAddView());
            }
            else
                // Normal routes
                normalRoute(mappedNormalRoute.name, hash.match(mappedNormalRoute.url));
        }

        // Page not found
        if (!mappedNormalRoute) {
            changeContent(new ErrorView("404"));
        }
        return;
    },

    start = function (callback) {
        _callback = callback;

        $(window).on('hashchange', function () { route(false); });
        route();
    },

    changeContent = function (page) {
        // Render current page
        var view = page.render();

        // Render MasterPage with page content
        var masterView = new MasterView(view.$settings, view.$el).render();

        $("body").html(masterView.$el);

        if (_callback)
            _callback();
    },

    errorHandler = function (error) {
        var hash = window.location.hash,
            return_url = hash.substr(1);

        changeContent(new ErrorView(error, return_url));
    },

    normalRoute = function (route, args) {
        var project_id = args[1];

        dataAdapter.getProjectConfigById(project_id)
        .done(function (config) {

            dataAdapter.setConfig(config);

            switch (route) {

                case "projectURL":
                    dataAdapter.getSystem()
                    .done(function (system) {
                        changeContent(new ProjectView(config, system));
                    })
                    .fail(errorHandler);
                    break;

                case "enemiesURL":
                    dataAdapter.getEnemies()
                    .done(function (enemies) {
                        // Default to first one
                        var id = args[2];
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
                                dataAdapter.getMotions(),
                                dataAdapter.getLevelTypes()
                            ).done(function (items, armors, weapons, skills, states, animations, types, terms, weapon_sprites, motions, level_types) {
                                var linked_data = { "enemies": enemies, "items": items, "armors": armors, "weapons": weapons, "skills": skills, "states": states, "animations": animations, "types": types, "terms": terms, "weapon_sprites": weapon_sprites, "motions": motions, "levelTypes": level_types };
                                changeContent(new EnemiesView(config, enemies, current, linked_data, stateManager));
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
                        var id = args[2];
                        if (!id)
                            id = 1;
                        dataAdapter.getItemById(id)
                        .done(function (current) {
                            changeContent(new ItemsView(config, items, current));
                        })
                        .fail(errorHandler);
                    })
                    .fail(errorHandler);
                    break;

                case "skillsURL":
                    dataAdapter.getSkills()
                    .done(function (skills) {
                        // Default to first one
                        var id = args[2];
                        if (!id)
                            id = 1;
                        dataAdapter.getSkillById(id)
                        .done(function (current) {
                            changeContent(new SkillsView(config, skills, current));
                        })
                        .fail(errorHandler);
                    })
                    .fail(errorHandler);
                    break;

                case "skillsActionURL":
                    dataAdapter.getSkills()
                    .done(function (skills) {
                        // Default to first one
                        var id = args[2];
                        if (!id)
                            id = 1;
                        dataAdapter.getSkillById(id)
                        .done(function (current) {
                            changeContent(new SkillsActionView(config, skills, current));
                        })
                        .fail(errorHandler);
                    })
                    .fail(errorHandler);
                    break;

                case "weaponsURL":
                    dataAdapter.getWeapons()
                    .done(function (weapons) {
                        // Default to first one
                        var id = args[2];
                        if (!id)
                            id = 1;
                        dataAdapter.getWeaponById(id)
                        .done(function (current) {
                            changeContent(new WeaponsView(config, weapons, current));
                        })
                        .fail(errorHandler);
                    })
                    .fail(errorHandler);
                    break;

                case "armorsURL":
                    dataAdapter.getArmors()
                    .done(function (armors) {
                        // Default to first one
                        var id = args[2];
                        if (!id)
                            id = 1;
                        dataAdapter.getArmorById(id)
                        .done(function (current) {
                            changeContent(new ArmorsView(config, armors, current));
                        })
                        .fail(errorHandler);
                    })
                    .fail(errorHandler);
                    break;
            }
        })
        .fail(errorHandler);
    };

    // The public API
    return {
        start: start
    };

});