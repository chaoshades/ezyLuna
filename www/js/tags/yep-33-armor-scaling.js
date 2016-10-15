define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        PercentParser = require("parser/PercentParser");

    return new Plugin(
        'YEP_X_ArmorScaling',
        'Armor Scaling',
        'v1.02',
        '(Requires YEP_DamageCore.js) Scale defensive stats relative to a universal scale.',
        'http://yanfly.moe/2015/11/28/yep-33-armor-scaling/',
        [
            new TagParser("Bypass Armor Scaling", new TagOnlyParser()),
            new TagParser("Physical Armor Reduction", new BasicParser(), "Physical Armor Reduction"),
            new TagParser("Magical Armor Reduction", new BasicParser(), "Magical Armor Reduction"),
            new TagParser("Certain Armor Reduction", new BasicParser(), "Certain Armor Reduction"),
            new TagParser("Physical Armor Reduction#2", new PercentParser(), "Physical Armor Reduction"),
            new TagParser("Magical Armor Reduction#2", new PercentParser(), "Magical Armor Reduction"),
            new TagParser("Certain Armor Reduction#2", new PercentParser(), "Certain Armor Reduction")
        ]
    );

});