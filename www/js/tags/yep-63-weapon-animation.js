define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return new Plugin(
        'YEP_WeaponAnimation',
        'Weapon Animation',
        'v1.03',
        'This plugin allows you to go past the standard weapon images and even using custom images.',
        'http://yanfly.moe/2016/01/28/yep-63-weapon-animation/',
        [
            new TagParser("Weapon Image", new BasicParser(), "Weapon Image"),
            new TagParser("Weapon Image#2", new BasicParser(), "Weapon Image"),
            new TagParser("Weapon Motion", new BasicParser()),
            new TagParser("Weapon Hue", new BasicParser()),
            new TagParser("Weapon Animation", new BasicParser())
        ]
    );

});