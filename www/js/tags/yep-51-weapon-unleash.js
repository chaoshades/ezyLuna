define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        SignedPercentParser = require("parser/SignedPercentParser"),
        TagArraySignedPercentParser = require("parser/TagArraySignedPercentParser");

    return new Plugin(
        'YEP_WeaponUnleash',
        'Weapon Unleash',
        'v1.02',
        'Replace the Attack command or give it the option of have a skill randomly occur when using it!',
        'http://yanfly.moe/2015/12/26/yep-51-weapon-unleash/',
        [
            new TagParser("Replace Attack", new BasicParser()),
            new TagParser("Replace Guard", new BasicParser()),
            new TagParser("Weapon Unleash", new SignedPercentParser(), "Weapon Unleash"),
            new TagParser("Weapon Unleash#2", new TagArraySignedPercentParser(2), "Weapon Unleash"),
            new TagParser("Guard Unleash", new SignedPercentParser(), "Guard Unleash"),
            new TagParser("Guard Unleash#2", new TagArraySignedPercentParser(2), "Guard Unleash")
        ]
    );

});