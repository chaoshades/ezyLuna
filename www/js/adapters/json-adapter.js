define(function (require) {

    "use strict";

    var t = null,

        // RPG Maker MV Data API

        getEnemies = function () {
            return $.getJSON("data/Enemies.json")
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
            return $.getJSON("data/Items.json")
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
            return $.getJSON("data/Skills.json")
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
            return $.getJSON("data/Weapons.json")
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
            return $.getJSON("data/Armors.json")
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
            return $.getJSON("data/States.json")
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
            return $.getJSON("data/Animations.json")
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
            return $.getJSON("data/System.json");
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

        compactDataCallback = function (data) {
            return $.Deferred(function (deferred) {
                deferred.resolve(_.compact(data));
            }).promise();
        };

    // The public API
    return {
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
        getTerms: getTerms
    };

});