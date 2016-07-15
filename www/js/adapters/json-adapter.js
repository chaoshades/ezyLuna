define(function (require) {

    "use strict";

    var config = null,

        // Ezy Luna Data API

        getConfig = function () {
            return $.getJSON("config.json")
                    .then(setIdCallback);
        },

        setConfig = function (c) {
            config = c;
        },

        getProjectConfigById = function (id) {
            return getConfig()
            .then(function (config) {
                return $.Deferred(function (deferred) {
                    var result = _.find(config.projects, function (project) { return project.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Project can't be found");
                }).promise();
            });
        },

        // RPG Maker MV Data API

        getEnemies = function () {
            return $.getJSON(config.url + "data/Enemies.json")
                    .then(compactDataCallback);
        },

        getEnemyById = function (id) {
            return getEnemies()
            .then(function (enemies) {
                return $.Deferred(function (deferred) {
                    var result = _.find(enemies, function (enemy) { return enemy.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Enemy can't be found");
                }).promise();
            });
        },

        getItems = function () {
            return $.getJSON(config.url + "data/Items.json")
                    .then(compactDataCallback);
        },
    
        getItemById = function(id) {
            return getItems()
            .then(function (items) {
                return $.Deferred(function (deferred) {
                    var result = _.find(items, function (item) { return item.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Item can't be found");
                }).promise();
            });
        },
        
        getSkills = function () {
            return $.getJSON(config.url + "data/Skills.json")
                    .then(compactDataCallback);
        },

        getSkillById = function (id) {
            return getSkills()
            .then(function (skills) {
                return $.Deferred(function (deferred) {
                    var result = _.find(skills, function (skill) { return skill.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Skill can't be found");
                }).promise();
            });
        },

        getWeapons = function () {
            return $.getJSON(config.url + "data/Weapons.json")
                    .then(compactDataCallback);
        },

        getWeaponById = function (id) {
            return getWeapons()
            .then(function (weapons) {
                return $.Deferred(function (deferred) {
                    var result = _.find(weapons, function (weapon) { return weapon.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Weapon can't be found");
                }).promise();
            });
        },

        getArmors = function () {
            return $.getJSON(config.url + "data/Armors.json")
                    .then(compactDataCallback);
        },

        getArmorById = function (id) {
            return getArmors()
            .then(function (armors) {
                return $.Deferred(function (deferred) {
                    var result = _.find(armors, function (armor) { return armor.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Armor can't be found");
                }).promise();
            });
        },
    
        getStates = function () {
            return $.getJSON(config.url + "data/States.json")
                    .then(compactDataCallback);
        },

        getStateById = function (id) {
            return getStates()
            .then(function (states) {
                return $.Deferred(function (deferred) {
                    var result = _.find(states, function (state) { return state.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("State can't be found");
                }).promise();
            });
        },

        getAnimations = function () {
            return $.getJSON(config.url + "data/Animations.json")
                    .then(compactDataCallback);
        },

        getAnimationById = function (id) {
            return getAnimations()
            .then(function (animations) {
                return $.Deferred(function (deferred) {
                    var result = _.find(animations, function (animation) { return animation.id == id; });
                    if (result)
                        deferred.resolve(result);
                    else
                        deferred.reject("Animation can't be found");
                }).promise();
            });
        },

        getSystem = function () {
            return $.getJSON(config.url + "data/System.json")
                    .then(simpleDataCallback);
        },

        getTypes = function () {
            return getSystem()
            .then(function (data) {
                return $.Deferred(function (deferred) {
                    var types = [
                        "armorTypes",
                        "elements",
                        "equipTypes",
                        "skillTypes",
                        "weaponTypes"
                    ];

                    var results = {};
                    for (var i = 0; i < types.length; i++) {
                        var type = types[i];
                        results[type] = data[type];
                    }

                    if (results)
                        deferred.resolve(results);
                    else
                        deferred.reject("Types can't be found");
                }).promise();
            });
        },

        getTerms = function () {
            return getSystem()
            .then(function (data) {
                return $.Deferred(function (deferred) {
                    var terms = [
                        "params"
                    ];

                    var results = {};
                    for (var i = 0; i < terms.length; i++) {
                        var term = terms[i];
                        results[term] = data["terms"][term];
                    }

                    if (results)
                        deferred.resolve(results);
                    else
                        deferred.reject("Terms can't be found");
                }).promise();
            });
        },

        getWeaponSprites = function () {
            var deferred = $.Deferred(),
                results = null;

            results = weapon_sprites;

            deferred.resolve(results);

            return deferred.promise();
        },

        getMotions = function () {
            var deferred = $.Deferred(),
                results = null;

            results = motions;

            deferred.resolve(results);

            return deferred.promise();
        },

        getPlugins = function () {
            return $.get(config.url + "js/plugins.js")
                    .then(extractJSONCallback);
        },

        //getTypesByName = function (typeName) {
        //    return getSystem()
        //    .then(function (data) {
        //        return $.Deferred(function (deferred) {
        //            var results = _.compact(data[typeName]);
        //            if (results)
        //                deferred.resolve(results);
        //            else
        //                deferred.reject("Types can't be found");
        //        }).promise();
        //    });
        //},

        // Private Methods

        simpleDataCallback = function (data) {
            return $.Deferred(function (deferred) {
                deferred.resolve(data);
            }).promise();
        },

        compactDataCallback = function (data) {
            return $.Deferred(function (deferred) {
                deferred.resolve(_.compact(data));
            }).promise();
        },

        setIdCallback = function (data) {
            return $.Deferred(function (deferred) {
                data.projects = _.map(data.projects, function (p, i) { p.id = i+1; return p; });
                deferred.resolve(data);
            }).promise();
        },

        extractJSONCallback = function (data) {
            return $.Deferred(function (deferred) {
                // Removes comments at the beginning + $plugins variable + line breaks around the array + last ;
                data = $.trim(data.substr(data.indexOf('=') + 1, data.length-1)).slice(0, -1);
                deferred.resolve(JSON.parse(data));
            }).promise();
        },
        
// Custom YEP Data

weapon_sprites = [
{ "id": 0, "name": "Nothing" },
{ "id": 1, "name": "Dagger" },
{ "id": 2, "name": "Sword" },
{ "id": 3, "name": "Flail" },
{ "id": 4, "name": "Axe" },
{ "id": 5, "name": "Whip" },
{ "id": 6, "name": "Staff" },
{ "id": 7, "name": "Long Bow" },
{ "id": 8, "name": "Crossbow" },
{ "id": 9, "name": "Gun" },
{ "id": 10, "name": "Claw" },
{ "id": 11, "name": "Glove" },
{ "id": 12, "name": "Spear" },
{ "id": 13, "name": "Mace" },
{ "id": 14, "name": "Rod" },
{ "id": 15, "name": "Club" },
{ "id": 16, "name": "Chain" },
{ "id": 17, "name": "Sword#2" },
{ "id": 18, "name": "Iron Pipe" },
{ "id": 19, "name": "Slingshot" },
{ "id": 20, "name": "Shotgun" },
{ "id": 21, "name": "Rifle" },
{ "id": 22, "name": "Chainsaw" },
{ "id": 23, "name": "Railgun" },
{ "id": 24, "name": "Stun Rod" },
{ "id": 25, "name": "Book" },
{ "id": 26, "name": "Custom" },
{ "id": 27, "name": "Custom#2" },
{ "id": 28, "name": "Custom#3" },
{ "id": 29, "name": "Custom#4" },
{ "id": 30, "name": "Custom#5" }
],

motions = [
{ "id": "walk", "name": "Walk" },
{ "id": "wait", "name": "Wait" },
{ "id": "chant", "name": "Chant" },
{ "id": "guard", "name": "Guard" },
{ "id": "damage", "name": "Damage" },
{ "id": "evade", "name": "Evade" },
{ "id": "thrust", "name": "Thrust" },
{ "id": "swing", "name": "Swing" },
{ "id": "missile", "name": "Missile" },
{ "id": "skill", "name": "Skill" },
{ "id": "spell", "name": "Spell" },
{ "id": "item", "name": "Item" },
{ "id": "escape", "name": "Escape" },
{ "id": "victory", "name": "Victory" },
{ "id": "dying", "name": "Dying" },
{ "id": "abnormal", "name": "Abnormal" },
{ "id": "sleep", "name": "Sleep" },
{ "id": "dead", "name": "Dead" }
];

    // The public API
    return {
        // Ezy Luna Data API
        getConfig: getConfig,
        setConfig: setConfig,
        getProjectConfigById: getProjectConfigById,
        // RPG Maker MV Data API
        getEnemies: getEnemies,
        getEnemyById: getEnemyById,
        getItems: getItems,
        getItemById: getItemById,
        getSkills: getSkills,
        getSkillById: getSkillById,
        getWeapons: getWeapons,
        getWeaponById: getWeaponById,
        getArmors: getArmors,
        getArmorById: getArmorById,
        getStates: getStates,
        getAnimations: getAnimations,
        getAnimationById: getAnimationById,
        getSystem: getSystem,
        getStateById: getStateById,
        getTypes: getTypes,
        getTerms: getTerms,
        getWeaponSprites: getWeaponSprites,
        getMotions: getMotions,
        getPlugins: getPlugins
    };

});