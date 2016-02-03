define(function (require) {

    "use strict";

    var t = null,

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

        getSystem = function () {
            var deferred = $.Deferred(),
                results = null;

            //results = system;

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
        getStateById: getStateById,
        getSystem: getSystem,
        getTypes: getTypes,
        getTerms: getTerms
    };

});