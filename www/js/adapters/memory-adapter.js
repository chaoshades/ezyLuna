define(function (require) {

    "use strict";

    var t = null,

        // Ezy Luna Data API

        getConfig = function () {
            var deferred = $.Deferred(),
            results = null;

            results = config;

            deferred.resolve(results);

            return deferred.promise();
        },

        // RPG Maker MV Data API

        getEnemies = function () {
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(enemies);

            deferred.resolve(results);

            return deferred.promise();
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
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(items);

            deferred.resolve(results);

            return deferred.promise();
        },

        getItemById = function (id) {
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
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(skills);

            deferred.resolve(results);

            return deferred.promise();
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
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(weapons);

            deferred.resolve(results);

            return deferred.promise();
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
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(armors);

            deferred.resolve(results);

            return deferred.promise();
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
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(states);

            deferred.resolve(results);

            return deferred.promise();
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
            var deferred = $.Deferred(),
                results = null;

            results = _.compact(animations);

            deferred.resolve(results);

            return deferred.promise();
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
            var deferred = $.Deferred(),
                results = null;

            results = system;

            deferred.resolve(results);

            return deferred.promise();
        },

        getTypes = function () {
            var deferred = $.Deferred(),
                results = null;

            results = types;

            deferred.resolve(results);

            return deferred.promise();
        },

        getTerms = function () {
            var deferred = $.Deferred(),
                results = null;

            results = terms;

            deferred.resolve(results);

            return deferred.promise();
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

        //getTypesByName = function (typeName) {
        //    var deferred = $.Deferred(),
        //        results = null;

        //    results = types[typeName];

        //    deferred.resolve(results);

        //    return deferred.promise();
        //},

// Mocking Data

enemies = [
null,
{"id":1,"actions":[{"conditionParam1":0,"conditionParam2":1,"conditionType":3,"rating":5,"skillId":1}],"battlerHue":0,"battlerName":"Bat","dropItems":[{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0}],"exp":0,"traits":[{"code":22,"dataId":0,"value":0.95},{"code":22,"dataId":1,"value":0.05},{"code":31,"dataId":1,"value":0}],"gold":0,"name":"Bat","note":"Superb note!!!","params":[200,0,30,30,30,30,30,30]},
{"id":2,"actions":[{"conditionParam1":0,"conditionParam2":0,"conditionType":0,"rating":5,"skillId":1}],"battlerHue":0,"battlerName":"Slime","dropItems":[{"kind":1,"dataId":1,"denominator":1000},{"kind":2,"dataId":1,"denominator":1},{"kind":3,"dataId":1,"denominator":1}],"exp":0,"traits":[{"code":22,"dataId":0,"value":0.95},{"code":22,"dataId":1,"value":0.05},{"code":31,"dataId":1,"value":0}],"gold":0,"name":"Slime","note":"","params":[250,0,30,30,30,30,30,30]},
{"id":3,"actions":[{"conditionParam1":0,"conditionParam2":0,"conditionType":0,"rating":5,"skillId":1}],"battlerHue":0,"battlerName":"Orc","dropItems":[{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0}],"exp":0,"traits":[{"code":22,"dataId":0,"value":0.95},{"code":22,"dataId":1,"value":0.05},{"code":31,"dataId":1,"value":0},{"code":11,"dataId":1,"value":1},{"code":12,"dataId":0,"value":1},{"code":13,"dataId":1,"value":1},{"code":14,"dataId":1,"value":1},{"code":21,"dataId":0,"value":1},{"code":22,"dataId":0,"value":0},{"code":23,"dataId":0,"value":1},{"code":41,"dataId":1,"value":1},{"code":31,"dataId":1,"value":1},{"code":32,"dataId":1,"value":1},{"code":33,"dataId":0,"value":0},{"code":34,"dataId":0,"value":0},{"code":42,"dataId":1,"value":1},{"code":43,"dataId":1,"value":1},{"code":44,"dataId":1,"value":1},{"code":51,"dataId":1,"value":1},{"code":52,"dataId":1,"value":1},{"code":53,"dataId":1,"value":1},{"code":54,"dataId":1,"value":1},{"code":55,"dataId":0,"value":1},{"code":61,"dataId":0,"value":1},{"code":62,"dataId":0,"value":1},{"code":63,"dataId":0,"value":1},{"code":64,"dataId":0,"value":1}],"gold":0,"name":"Orc","note":"","params":[300,0,30,30,30,30,30,30]},
{"id":4,"actions":[{"conditionParam1":0,"conditionParam2":0,"conditionType":0,"rating":5,"skillId":1},{"conditionParam1":0,"conditionParam2":0,"conditionType":1,"rating":5,"skillId":1},{"conditionParam1":0,"conditionParam2":1,"conditionType":2,"rating":5,"skillId":1},{"conditionParam1":0,"conditionParam2":0.95,"conditionType":3,"rating":5,"skillId":1},{"conditionParam1":1,"conditionParam2":0,"conditionType":4,"rating":5,"skillId":1},{"conditionParam1":1,"conditionParam2":0,"conditionType":5,"rating":5,"skillId":1},{"conditionParam1":1,"conditionParam2":0,"conditionType":6,"rating":5,"skillId":1}],"battlerHue":0,"battlerName":"Minotaur","dropItems":[{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0},{"dataId":1,"denominator":1,"kind":0}],"exp":0,"traits":[{"code":22,"dataId":0,"value":0.95},{"code":22,"dataId":1,"value":0.05},{"code":31,"dataId":1,"value":0}],"gold":0,"name":"Minotaur","note":"","params":[500,0,30,30,30,30,30,30]}
],

items = [
null,
{ "id": 1, "animationId": 41, "consumable": true, "damage": { "critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20 }, "description": "", "effects": [{ "code": 11, "dataId": 0, "value1": 0, "value2": 500 }], "hitType": 0, "iconIndex": 176, "itypeId": 1, "name": "Potion", "note": "", "occasion": 0, "price": 50, "repeats": 1, "scope": 7, "speed": 0, "successRate": 100, "tpGain": 0 },
{ "id": 2, "animationId": 41, "consumable": true, "damage": { "critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20 }, "description": "", "effects": [{ "code": 12, "dataId": 0, "value1": 0, "value2": 200 }], "hitType": 0, "iconIndex": 176, "itypeId": 1, "name": "Magic Water", "note": "", "occasion": 0, "price": 100, "repeats": 1, "scope": 7, "speed": 0, "successRate": 100, "tpGain": 0 },
{ "id": 3, "animationId": 45, "consumable": true, "damage": { "critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20 }, "description": "", "effects": [{ "code": 22, "dataId": 4, "value1": 1, "value2": 0 }, { "code": 22, "dataId": 5, "value1": 1, "value2": 0 }, { "code": 22, "dataId": 6, "value1": 1, "value2": 0 }, { "code": 22, "dataId": 7, "value1": 1, "value2": 0 }, { "code": 22, "dataId": 8, "value1": 1, "value2": 0 }, { "code": 22, "dataId": 9, "value1": 1, "value2": 0 }, { "code": 22, "dataId": 10, "value1": 1, "value2": 0 }], "hitType": 0, "iconIndex": 176, "itypeId": 1, "name": "Dispel Herb", "note": "", "occasion": 0, "price": 200, "repeats": 1, "scope": 7, "speed": 0, "successRate": 100, "tpGain": 0 },
{ "id": 4, "animationId": 49, "consumable": true, "damage": { "critical": false, "elementId": 0, "formula": "b.mhp / 2", "type": 3, "variance": 20 }, "description": "", "effects": [{ "code": 22, "dataId": 1, "value1": 1, "value2": 0 }], "hitType": 0, "iconIndex": 176, "itypeId": 1, "name": "Stimulant", "note": "", "occasion": 0, "price": 300, "repeats": 1, "scope": 9, "speed": 0, "successRate": 100, "tpGain": 0 }
],

skills = [
null,
{ "id": 1, "animationId": -1, "damage": { "critical": true, "elementId": -1, "formula": "a.atk * 4 - b.def * 2", "type": 1, "variance": 20 }, "description": "", "effects": [{ "code": 21, "dataId": 0, "value1": 1, "value2": 0 }], "hitType": 1, "iconIndex": 76, "message1": " attacks!", "message2": "", "mpCost": 0, "name": "Attack", "note": "Skill #1 will be used when you select\nthe Attack command.", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 1, "speed": 0, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 10 },
{ "id": 2, "animationId": 0, "damage": { "critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20 }, "description": "", "effects": [{ "code": 21, "dataId": 2, "value1": 1, "value2": 0 }], "hitType": 0, "iconIndex": 81, "message1": " guards.", "message2": "", "mpCost": 0, "name": "Guard", "note": "Skill #2 will be used when you select\nthe Guard command.", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 11, "speed": 2000, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 10 },
{ "id": 3, "animationId": -1, "damage": { "critical": true, "elementId": -1, "formula": "a.atk * 4 - b.def * 2", "type": 1, "variance": 20 }, "description": "", "effects": [{ "code": 21, "dataId": 0, "value1": 1, "value2": 0 }], "hitType": 1, "iconIndex": 76, "message1": " attacks!", "message2": "", "mpCost": 0, "name": "Dual Attack", "note": "", "occasion": 1, "repeats": 2, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 1, "speed": 0, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 5 },
{ "id": 4, "animationId": -1, "damage": { "critical": true, "elementId": -1, "formula": "a.atk * 4 - b.def * 2", "type": 1, "variance": 20 }, "description": "", "effects": [{ "code": 21, "dataId": 0, "value1": 1, "value2": 0 }], "hitType": 1, "iconIndex": 76, "message1": " attacks!", "message2": "", "mpCost": 0, "name": "Double Attack", "note": "", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 4, "speed": 0, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 5 },
{ "id": 5, "animationId": -1, "damage": { "critical": true, "elementId": -1, "formula": "a.atk * 4 - b.def * 2", "type": 1, "variance": 20 }, "description": "", "effects": [{ "code": 21, "dataId": 0, "value1": 1, "value2": 0 }], "hitType": 1, "iconIndex": 76, "message1": " attacks!", "message2": "", "mpCost": 0, "name": "Triple Attack", "note": "", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 5, "speed": 0, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 4 },
{ "id": 6, "animationId": 0, "damage": { "critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20 }, "description": "", "effects": [{ "code": 41, "dataId": 0, "value1": 0, "value2": 0 }], "hitType": 0, "iconIndex": 82, "message1": " flees.", "message2": "", "mpCost": 0, "name": "Escape", "note": "", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 11, "speed": 0, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 0 },
{ "id": 7, "animationId": 0, "damage": { "critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20 }, "description": "", "effects": [], "hitType": 0, "iconIndex": 81, "message1": " waits.", "message2": "", "mpCost": 0, "name": "Wait", "note": "", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 0, "speed": 0, "stypeId": 0, "successRate": 100, "tpCost": 0, "tpGain": 10 },
{ "id": 8, "animationId": 41, "damage": { "critical": false, "elementId": 0, "formula": "200 + a.mat", "type": 3, "variance": 20 }, "description": "", "effects": [], "hitType": 0, "iconIndex": 72, "message1": " casts %1!", "message2": "", "mpCost": 5, "name": "Heal", "note": "", "occasion": 0, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 7, "speed": 0, "stypeId": 1, "successRate": 100, "tpCost": 0, "tpGain": 10 },
{ "id": 9, "animationId": 66, "damage": { "critical": false, "elementId": 2, "formula": "100 + a.mat * 2 - b.mdf * 2", "type": 1, "variance": 20 }, "description": "", "effects": [], "hitType": 2, "iconIndex": 64, "message1": " casts %1!", "message2": "", "mpCost": 5, "name": "Fire", "note": "", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 1, "speed": 0, "stypeId": 1, "successRate": 100, "tpCost": 0, "tpGain": 10 },
{ "id": 10, "animationId": 78, "damage": { "critical": false, "elementId": 4, "formula": "100 + a.mat * 2 - b.mdf * 2", "type": 1, "variance": 20 }, "description": "", "effects": [], "hitType": 2, "iconIndex": 66, "message1": " casts %1!", "message2": "", "mpCost": 5, "name": "Spark", "note": "", "occasion": 1, "repeats": 1, "requiredWtypeId1": 0, "requiredWtypeId2": 0, "scope": 2, "speed": 0, "stypeId": 1, "successRate": 100, "tpCost": 0, "tpGain": 10 }
],

weapons = [
null,
{ "id": 1, "animationId": 6, "description": "", "etypeId": 1, "traits": [{ "code": 31, "dataId": 1, "value": 0 }, { "code": 22, "dataId": 0, "value": 0 }], "iconIndex": 97, "name": "Sword", "note": "", "params": [0, 0, 10, 0, 0, 0, 0, 0], "price": 500, "wtypeId": 2 },
{ "id": 2, "animationId": 6, "description": "", "etypeId": 1, "traits": [{ "code": 31, "dataId": 1, "value": 0 }, { "code": 22, "dataId": 0, "value": 0 }], "iconIndex": 99, "name": "Axe", "note": "", "params": [0, 0, 10, 0, 0, 0, 0, 0], "price": 500, "wtypeId": 4 },
{ "id": 3, "animationId": 1, "description": "", "etypeId": 1, "traits": [{ "code": 31, "dataId": 1, "value": 0 }, { "code": 22, "dataId": 0, "value": 0 }], "iconIndex": 101, "name": "Cane", "note": "", "params": [0, 0, 10, 0, 0, 0, 0, 0], "price": 500, "wtypeId": 6 },
{ "id": 4, "animationId": 11, "description": "", "etypeId": 1, "traits": [{ "code": 31, "dataId": 1, "value": 0 }, { "code": 22, "dataId": 0, "value": 0 }], "iconIndex": 102, "name": "Bow", "note": "", "params": [0, 0, 10, 0, 0, 0, 0, 0], "price": 500, "wtypeId": 7 }
],

armors = [
null,
{ "id": 1, "atypeId": 5, "description": "", "etypeId": 2, "traits": [{ "code": 22, "dataId": 1, "value": 0 }], "iconIndex": 128, "name": "Shield", "note": "", "params": [0, 0, 0, 10, 0, 0, 0, 0], "price": 300 },
{ "id": 2, "atypeId": 1, "description": "", "etypeId": 3, "traits": [{ "code": 22, "dataId": 1, "value": 0 }], "iconIndex": 130, "name": "Hat", "note": "", "params": [0, 0, 0, 10, 0, 0, 0, 0], "price": 300 },
{ "id": 3, "atypeId": 1, "description": "", "etypeId": 4, "traits": [{ "code": 22, "dataId": 1, "value": 0 }], "iconIndex": 135, "name": "Cloth", "note": "", "params": [0, 0, 0, 10, 0, 0, 0, 0], "price": 300 },
{ "id": 4, "atypeId": 1, "description": "", "etypeId": 5, "traits": [{ "code": 22, "dataId": 1, "value": 0 }], "iconIndex": 145, "name": "Ring", "note": "", "params": [0, 0, 0, 0, 10, 0, 0, 0], "price": 300 }
],
        
states = [
null,
{ "id": 1, "autoRemovalTiming": 0, "chanceByDamage": 100, "iconIndex": 1, "maxTurns": 1, "message1": " has fallen!", "message2": " is slain!", "message3": "", "message4": " revives!", "minTurns": 1, "motion": 3, "name": "Knockout", "note": "State #1 will be automatically added when\nHP reaches 0.", "overlay": 0, "priority": 100, "releaseByDamage": false, "removeAtBattleEnd": false, "removeByDamage": false, "removeByRestriction": false, "removeByWalking": false, "restriction": 4, "stepsToRemove": 100, "traits": [{ "code": 23, "dataId": 9, "value": 0 }] },
{ "id": 2, "autoRemovalTiming": 2, "chanceByDamage": 100, "description": "", "iconIndex": 0, "maxTurns": 1, "message1": "", "message2": "", "message3": "", "message4": "", "minTurns": 1, "motion": 0, "name": "Guard", "note": "", "overlay": 0, "priority": 0, "removeAtBattleEnd": true, "removeByDamage": false, "removeByRestriction": true, "removeByWalking": false, "restriction": 0, "stepsToRemove": 100, "traits": [{ "code": 62, "dataId": 1, "value": 0 }] },
{ "id": 3, "autoRemovalTiming": 0, "chanceByDamage": 100, "description": "", "iconIndex": 0, "maxTurns": 1, "message1": "", "message2": "", "message3": "", "message4": "", "minTurns": 1, "motion": 0, "name": "Immortal", "note": "", "overlay": 0, "priority": 0, "removeAtBattleEnd": true, "removeByDamage": false, "removeByRestriction": false, "removeByWalking": false, "restriction": 0, "stepsToRemove": 100, "traits": [{ "code": 14, "dataId": 1, "value": 0 }] },
{ "id": 4, "autoRemovalTiming": 0, "chanceByDamage": 100, "iconIndex": 2, "maxTurns": 1, "message1": " is poisoned!", "message2": " is poisoned!", "message3": "", "message4": " is no longer poisoned!", "minTurns": 1, "motion": 1, "overlay": 1, "name": "Poison", "note": "", "priority": 50, "releaseByDamage": false, "removeAtBattleEnd": false, "removeByDamage": false, "removeByRestriction": false, "removeByWalking": false, "restriction": 0, "stepsToRemove": 100, "traits": [{ "code": 22, "dataId": 7, "value": -0.1 }] },
{ "id": 5, "autoRemovalTiming": 1, "chanceByDamage": 100, "iconIndex": 3, "maxTurns": 5, "message1": " is blinded!", "message2": " is blinded!", "message3": "", "message4": " is no longer blinded!", "minTurns": 3, "motion": 1, "name": "Blind", "note": "", "overlay": 2, "priority": 60, "releaseByDamage": false, "removeAtBattleEnd": true, "removeByDamage": false, "removeByRestriction": false, "removeByWalking": false, "restriction": 0, "stepsToRemove": 100, "traits": [{ "code": 22, "dataId": 0, "value": -0.5 }] },
{ "id": 6, "autoRemovalTiming": 1, "chanceByDamage": 100, "iconIndex": 4, "maxTurns": 5, "message1": " is silenced!", "message2": " is silenced!", "message3": "", "message4": " is no longer silenced!", "minTurns": 3, "motion": 1, "name": "Silence", "note": "", "overlay": 3, "priority": 65, "releaseByDamage": false, "removeAtBattleEnd": true, "removeByDamage": false, "removeByRestriction": false, "removeByWalking": false, "restriction": 0, "stepsToRemove": 100, "traits": [{ "code": 42, "dataId": 1, "value": 0 }] },
{ "id": 7, "autoRemovalTiming": 1, "chanceByDamage": 50, "iconIndex": 5, "maxTurns": 4, "message1": " is enraged!", "message2": " is enraged!", "message3": "", "message4": " is no longer enraged!", "minTurns": 2, "motion": 1, "name": "Rage", "note": "", "overlay": 4, "priority": 70, "releaseByDamage": false, "removeAtBattleEnd": true, "removeByDamage": true, "removeByRestriction": false, "removeByWalking": false, "restriction": 1, "stepsToRemove": 100, "traits": [] },
{ "id": 8, "autoRemovalTiming": 1, "chanceByDamage": 50, "iconIndex": 6, "maxTurns": 4, "message1": " is confused!", "message2": " is confused!", "message3": "", "message4": " is no longer confused!", "minTurns": 2, "motion": 1, "name": "Confusion", "note": "", "overlay": 5, "priority": 75, "releaseByDamage": false, "removeAtBattleEnd": true, "removeByDamage": true, "removeByRestriction": false, "removeByWalking": false, "restriction": 2, "stepsToRemove": 100, "traits": [] },
{ "id": 9, "autoRemovalTiming": 1, "chanceByDamage": 50, "iconIndex": 7, "maxTurns": 4, "message1": " is fascinated!", "message2": " is fascinated!", "message3": "", "message4": " is no longer fascinated!", "minTurns": 2, "motion": 1, "name": "Fascination", "note": "", "overlay": 6, "priority": 80, "releaseByDamage": false, "removeAtBattleEnd": true, "removeByDamage": true, "removeByRestriction": false, "removeByWalking": false, "restriction": 3, "stepsToRemove": 100, "traits": [] },
{ "id": 10, "autoRemovalTiming": 1, "chanceByDamage": 100, "iconIndex": 8, "maxTurns": 5, "message1": " falls asleep!", "message2": " falls asleep!", "message3": " is sleeping.", "message4": " wakes up!", "minTurns": 3, "motion": 2, "name": "Sleep", "note": "", "overlay": 7, "priority": 90, "releaseByDamage": true, "removeAtBattleEnd": true, "removeByDamage": true, "removeByRestriction": false, "removeByWalking": false, "restriction": 4, "stepsToRemove": 100, "traits": [{ "code": 22, "dataId": 1, "value": -1 }] }
],

animations = [
null,
{"id":1,"animation1Hue":0,"animation1Name":"Hit1","animation2Hue":0,"animation2Name":"","frames":[[],[[0,0,0,250,0,0,255,1],[-1,0,0,0,0,0,0,0],[-1,0,0,0,0,0,0,0],[-1,0,0,0,0,0,0,0]],[[1,0,0,200,0,0,255,1]],[[2,0,0,200,0,0,255,1]],[[3,0,0,200,0,0,255,1]]],"name":"Hit Physical","position":1,"timings":[{"flashColor":[255,255,255,255],"flashDuration":2,"flashScope":1,"frame":0,"se":{"name":"Blow3","pan":0,"pitch":100,"volume":90}}]},
{"id":2,"animation1Hue":0,"animation1Name":"Hit1","animation2Hue":0,"animation2Name":"HitPhoton","frames":[[],[[0,0,0,250,0,0,255,1],[100,-16,0,230,0,0,255,1],[-1,0,0,0,0,0,0,0],[-1,0,0,0,0,0,0,0],[-1,0,0,0,0,0,0,0],[-1,0,0,0,0,0,0,0],[-1,0,0,0,0,0,0,0]],[[1,0,0,200,0,0,255,1],[101,-16,0,230,0,0,255,1]],[[2,0,0,200,0,0,255,1],[102,-16,0,230,0,0,255,1]],[[3,0,0,200,0,0,255,1],[103,-16,0,230,0,0,255,1]],[[-1,0,0,0,0,0,0,0],[104,-16,0,230,0,0,180,1]]],"name":"Hit Effect","position":1,"timings":[{"flashColor":[255,255,255,255],"flashDuration":2,"flashScope":0,"frame":0,"se":{"name":"Evasion2","pan":0,"pitch":150,"volume":80}},{"flashColor":[255,255,255,255],"flashDuration":2,"flashScope":1,"frame":1,"se":{"name":"Damage4","pan":0,"pitch":120,"volume":90}},{"flashColor":[255,255,255,255],"flashDuration":5,"flashScope":0,"frame":2,"se":{"name":"Powerup","pan":0,"pitch":180,"volume":90}}]},
{"id":3,"animation1Hue":0,"animation1Name":"Hit2","animation2Hue":0,"animation2Name":"HitFire","frames":[[[0,0,-12,150,0,0,255,1]],[[1,0,-12,150,0,0,255,1]],[[2,0,-12,150,0,0,255,1],[100,0,-12,225,0,0,255,1]],[[2,0,-12,165,0,0,180,1],[101,0,-12,225,0,0,255,1]],[[2,0,-12,172,0,0,100,1],[102,0,-12,225,0,0,255,1]],[[-1,0,-12,172,0,0,100,1],[103,0,-12,225,0,0,255,1]],[[-1,0,-12,172,0,0,100,1],[104,0,-12,225,0,0,255,1]],[[-1,0,-12,172,0,0,100,1],[105,0,-12,225,0,0,255,1]],[[-1,0,-12,172,0,0,100,1],[106,0,-12,225,0,0,255,1]],[[-1,0,-12,172,0,0,100,1],[107,0,-12,225,0,0,255,1]]],"name":"Hit Fire","position":1,"timings":[{"flashColor":[255,255,255,255],"flashDuration":5,"flashScope":0,"frame":0,"se":{"name":"Fire1","pan":0,"pitch":100,"volume":100}},{"flashColor":[255,119,102,221],"flashDuration":3,"flashScope":1,"frame":0,"se":{"name":"Blow3","pan":0,"pitch":100,"volume":100}},{"flashColor":[255,136,51,153],"flashDuration":5,"flashScope":2,"frame":2,"se":null}]},
{"id":4,"animation1Hue":0,"animation1Name":"Hit2","animation2Hue":0,"animation2Name":"HitIce","frames":[[[0,0,-12,150,0,0,255,1]],[[1,0,-12,150,0,0,255,1]],[[2,0,-12,150,0,0,255,1],[101,0,-12,120,0,0,255,1],[102,0,-12,195,0,0,255,1]],[[2,0,-12,165,0,0,180,1],[100,0,-12,210,0,0,255,1],[103,0,-12,240,0,0,255,1]],[[2,0,-12,172,0,0,100,1],[100,0,-12,195,0,0,255,1],[104,0,-12,240,0,0,255,1],[105,0,0,225,0,0,255,1],[108,0,-12,225,0,0,255,1]],[[101,0,-12,195,0,0,255,1],[104,0,-12,255,0,0,255,1],[108,0,-12,255,0,0,255,1],[106,0,0,165,0,0,255,1]],[[100,0,-12,180,0,0,255,1],[104,0,-12,262,0,0,180,1],[109,0,-12,210,0,0,255,1],[106,0,0,180,0,0,255,1]],[[101,0,-12,195,0,0,255,1],[104,0,-12,270,0,0,100,1],[109,0,-12,225,0,0,200,1],[107,0,0,180,0,0,255,1]],[[100,0,-12,180,0,0,255,1],[109,0,-12,240,0,0,100,1],[106,0,0,180,0,0,255,1]],[[101,0,-12,195,0,0,180,1],[107,0,0,180,0,0,255,1]],[[101,0,-12,195,0,0,100,1]]],"name":"Hit Ice","position":1,"timings":[{"flashColor":[255,255,255,255],"flashDuration":5,"flashScope":0,"frame":0,"se":{"name":"Ice4","pan":0,"pitch":75,"volume":100}},{"flashColor":[119,187,255,221],"flashDuration":3,"flashScope":1,"frame":0,"se":{"name":"Blow3","pan":0,"pitch":100,"volume":100}},{"flashColor":[187,221,221,153],"flashDuration":5,"flashScope":2,"frame":2,"se":null}]},
{"id":5,"animation1Hue":0,"animation1Name":"Hit2","animation2Hue":0,"animation2Name":"HitThunder","frames":[[[0,0,-12,150,0,0,255,1]],[[1,0,-12,150,0,0,255,1]],[[2,0,-12,150,0,0,255,1],[100,0,-12,225,0,0,255,1]],[[2,0,-12,165,0,0,180,1],[101,0,-12,225,0,0,255,1]],[[2,0,-12,172,0,0,100,1],[102,0,-12,225,0,0,255,1]],[[103,0,-12,225,0,0,255,1]],[[104,0,-12,225,0,0,255,1]],[[105,0,-12,225,0,0,255,1]],[[106,0,-12,225,0,0,255,1]],[[-1,0,-12,225,0,0,255,1],[106,0,-12,232,20,0,150,1]]],"name":"Hit Thunder","position":1,"timings":[{"flashColor":[255,255,255,255],"flashDuration":5,"flashScope":0,"frame":0,"se":{"name":"Thunder8","pan":0,"pitch":80,"volume":100}},{"flashColor":[255,255,102,221],"flashDuration":3,"flashScope":1,"frame":0,"se":{"name":"Blow3","pan":0,"pitch":100,"volume":100}},{"flashColor":[255,255,119,153],"flashDuration":5,"flashScope":2,"frame":2,"se":null}]},
{"id":6,"animation1Hue":0,"animation1Name":"Slash","animation2Hue":0,"animation2Name":"","frames":[[[0,24,-42,180,0,0,255,1]],[[1,24,-42,180,0,0,255,1]],[[2,0,-18,180,0,0,255,1]],[[3,0,-18,180,0,0,255,1]],[[4,0,-18,180,0,0,255,1]]],"name":"Slash Physical","position":1,"timings":[{"flashColor":[255,255,255,187],"flashDuration":2,"flashScope":1,"frame":0,"se":{"name":"Slash1","pan":0,"pitch":140,"volume":80}}]},
{"id":7,"animation1Hue":0,"animation1Name":"Slash","animation2Hue":0,"animation2Name":"SlashPhoton","frames":[[[0,0,-42,180,0,0,255,1],[100,0,-2,180,0,0,255,1]],[[1,0,-42,180,0,0,255,1],[101,0,-2,180,0,0,255,1]],[[2,0,-18,180,0,0,255,1],[102,16,-2,180,0,0,255,1]],[[3,0,-18,180,0,0,255,1],[103,60.5,-25.5,180,0,0,255,1]],[[4,0,-18,180,0,0,255,1],[103,79,-17.5,180,2,0,127,1]]],"name":"Slash Effect","position":1,"timings":[{"flashColor":[255,255,255,187],"flashDuration":2,"flashScope":0,"frame":0,"se":{"name":"Evasion2","pan":0,"pitch":150,"volume":80}},{"flashColor":[255,255,255,187],"flashDuration":2,"flashScope":1,"frame":1,"se":{"name":"Slash1","pan":0,"pitch":150,"volume":80}},{"flashColor":[255,255,255,255],"flashDuration":5,"flashScope":0,"frame":2,"se":{"name":"Powerup","pan":0,"pitch":180,"volume":90}}]},
{"id":8,"animation1Hue":0,"animation1Name":"SlashFire","animation2Hue":0,"animation2Name":"","frames":[[[0,24,-72,180,0,0,255,1]],[[1,24,-72,180,0,0,255,1],[6,24,-72,195,0,0,255,1]],[[2,0,-48,180,0,0,255,1],[7,0,-48,195,0,0,255,1]],[[3,0,-48,180,0,0,255,1],[8,0,-48,195,0,0,255,1]],[[4,0,-48,180,0,0,255,1],[9,0,-48,195,0,0,255,1]],[[5,0,-48,180,0,0,255,1],[10,0,-48,195,0,0,255,1]],[[11,0,-48,195,0,0,255,1]],[[12,0,-48,195,0,0,255,1]],[[13,0,-48,195,0,0,255,1]]],"name":"Slash Fire","position":1,"timings":[{"flashColor":[255,255,255,187],"flashDuration":3,"flashScope":1,"frame":0,"se":{"name":"Slash1","pan":0,"pitch":100,"volume":100}},{"flashColor":[255,136,51,153],"flashDuration":5,"flashScope":2,"frame":1,"se":{"name":"Fire1","pan":0,"pitch":120,"volume":100}}]},
{"id":9,"animation1Hue":0,"animation1Name":"SlashIce","animation2Hue":0,"animation2Name":"","frames":[[[0,24,-72,180,0,0,255,1]],[[1,24,-72,180,0,0,255,1],[6,24,-72,195,0,0,255,1]],[[2,0,-48,180,0,0,255,1],[7,0,-48,195,0,0,255,1]],[[3,0,-48,180,0,0,255,1],[8,0,-48,195,0,0,255,1]],[[4,0,-48,180,0,0,255,1],[9,0,-48,195,0,0,255,1]],[[5,0,-48,180,0,0,255,1],[10,0,-48,195,0,0,255,1]],[[11,0,-48,195,0,0,255,1]],[[12,0,-48,195,0,0,255,1]]],"name":"Slash Ice","position":1,"timings":[{"flashColor":[255,255,255,187],"flashDuration":3,"flashScope":1,"frame":0,"se":{"name":"Slash1","pan":0,"pitch":100,"volume":100}},{"flashColor":[187,221,221,153],"flashDuration":5,"flashScope":2,"frame":1,"se":{"name":"Ice4","pan":0,"pitch":100,"volume":100}}]},
{"id":10,"animation1Hue":0,"animation1Name":"SlashThunder","animation2Hue":0,"animation2Name":"","frames":[[[0,24,-72,180,0,0,255,1]],[[1,24,-72,180,0,0,255,1],[6,24,-72,195,0,0,255,1]],[[2,0,-48,180,0,0,255,1],[7,0,-48,195,0,0,255,1]],[[3,0,-48,180,0,0,255,1],[8,0,-48,195,0,0,255,1]],[[4,0,-48,180,0,0,255,1],[9,0,-48,195,0,0,255,1]],[[5,0,-48,180,0,0,255,1],[10,0,-48,195,0,0,255,1]],[[11,0,-48,195,0,0,255,1]],[[12,0,-48,195,0,0,255,1]],[[13,0,-48,195,0,0,255,1]]],"name":"Slash Thunder","position":1,"timings":[{"flashColor":[255,255,255,187],"flashDuration":3,"flashScope":1,"frame":0,"se":{"name":"Slash1","pan":0,"pitch":100,"volume":100}},{"flashColor":[255,255,119,153],"flashDuration":5,"flashScope":2,"frame":1,"se":{"name":"Thunder8","pan":0,"pitch":100,"volume":100}}]}
],

system = {
"gameTitle": "Project1",
"title1Name": "Castle",
"title2Name": ""
},

types = {
"armorTypes": ["", "General Armor", "Magic Armor", "Light Armor", "Heavy Armor", "Small Shield", "Large Shield"],
"elements": ["", "Physical", "Fire", "Ice", "Thunder", "Water", "Earth", "Wind", "Light", "Darkness"],
"equipTypes": ["", "Weapon", "Shield", "Head", "Body", "Accessory"],
"skillTypes": ["", "Magic", "Special"],
"weaponTypes": ["", "Dagger", "Sword", "Flail", "Axe", "Whip", "Cane", "Bow", "Crossbow", "Gun", "Claw", "Glove", "Spear"],
"params": ["Max HP", "Max MP", "Attack", "Defense", "M.Attack", "M.Defense", "Agility", "Luck", "Hit", "Evasion"]
},
        
terms = {
"basic": ["Level", "Lv", "HP", "HP", "MP", "MP", "TP", "TP", "EXP", "EXP"],
"commands": ["Fight", "Escape", "Attack", "Guard", "Item", "Skill", "Equip", "Status", "Formation", "Save", "Game End", "Options", "Weapon", "Armor", "Key Item", "Equip", "Optimize", "Clear", "New Game", "Continue", null, "To Title", "Cancel", null, "Buy", "Sell"],
"params": ["Max HP", "Max MP", "Attack", "Defense", "M.Attack", "M.Defense", "Agility", "Luck", "Hit", "Evasion"],
"messages": { "actionFailure": "There was no effect on %1!", "actorDamage": "%1 took %2 damage!", "actorDrain": "%1 was drained of %2 %3!", "actorGain": "%1 gained %2 %3!", "actorLoss": "%1 lost %2 %3!", "actorNoDamage": "%1 took no damage!", "actorNoHit": "Miss! %1 took no damage!", "actorRecovery": "%1 recovered %2 %3!", "alwaysDash": "Always Dash", "bgmVolume": "BGM Volume", "bgsVolume": "BGS Volume", "buffAdd": "%1's %2 went up!", "buffRemove": "%1's %2 returned to normal!", "commandRemember": "Command Remember", "counterAttack": "%1 counterattacked!", "criticalToActor": "A painful blow!!", "criticalToEnemy": "An excellent hit!!", "debuffAdd": "%1's %2 went down!", "defeat": "%1 was defeated.", "emerge": "%1 emerged!", "enemyDamage": "%1 took %2 damage!", "enemyDrain": "%1 was drained of %2 %3!", "enemyGain": "%1 gained %2 %3!", "enemyLoss": "%1 lost %2 %3!", "enemyNoDamage": "%1 took no damage!", "enemyNoHit": "Miss! %1 took no damage!", "enemyRecovery": "%1 recovered %2 %3!", "escapeFailure": "However, it was unable to escape!", "escapeStart": "%1 has started to escape!", "evasion": "%1 evaded the attack!", "expNext": "To Next %1", "expTotal": "Current %1", "file": "File", "levelUp": "%1 is now %2 %3!", "loadMessage": "Load which file?", "magicEvasion": "%1 nullified the magic!", "magicReflection": "%1 reflected the magic!", "meVolume": "ME Volume", "obtainExp": "%1 %2 received!", "obtainGold": "%1\\G found!", "obtainItem": "%1 found!", "obtainSkill": "%1 learned!", "partyName": "%1's Party", "possession": "Possession", "preemptive": "%1 got the upper hand!", "saveMessage": "Save to which file?", "seVolume": "SE Volume", "substitute": "%1 protected %2!", "surprise": "%1 was surprised!", "useItem": "%1 uses %2!", "victory": "%1 was victorious!" }
},

config = {
"projects": [
    {"path": "file:///C:/Program Files/RPG Making/RPG Maker MV/Projects/Project1", "show_all_plugins": true},
    {"path": "file:///C:/Program Files/RPG Making/RPG Maker MV/Projects/Project1", "show_all_plugins": false}
]
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
        getStateById: getStateById,
        getAnimations: getAnimations,
        getAnimationById: getAnimationById,
        getSystem: getSystem,
        getTypes: getTypes,
        getTerms: getTerms,
        getWeaponSprites: getWeaponSprites,
        getMotions: getMotions
    };

});