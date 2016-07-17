define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        SignedPercentParser = require("parser/SignedPercentParser");

    return new Plugin(
        'YEP_WeaponUnleash',
        'v1.02',
        'http://yanfly.moe/2015/12/26/yep-51-weapon-unleash/',
        [
            new TagParser("Replace Attack", new BasicParser()),
            new TagParser("Replace Guard", new BasicParser()),
            new TagParser("Weapon Unleash", new SignedPercentParser()),
            //new TagParser("Weapon Unleash x", new SignedPercentParser()), TODO
            new TagParser("Guard Unleash", new SignedPercentParser()),
            //new TagParser("Guard Unleash x", new SignedPercentParser()), TODO
            new TagParser("Command Text", new BasicParser()),
            new TagParser("Attack Text", new BasicParser()),
            new TagParser("Guard Text", new BasicParser())
        ]
    );

});