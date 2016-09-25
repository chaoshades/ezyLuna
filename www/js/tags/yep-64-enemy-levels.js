define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        SignedParser = require("parser/SignedParser"),
        BasicTagArrayParser = require("parser/BasicTagArrayParser");

    return new Plugin(
        'YEP_EnemyLevels',
        'v1.05',
        'http://yanfly.moe/2016/01/29/yep-64-enemy-levels/',
        [
            new TagParser("Show Level", new TagOnlyParser()),
            new TagParser("Hide Level", new TagOnlyParser()),
            new TagParser("Minimum Level", new BasicParser()),
            new TagParser("Maximum Level", new BasicParser()),
            new TagParser("Static Level", new BasicParser()),
            new TagParser("Starting Level Type", new BasicParser()),
            new TagParser("Positive Level Fluctuation", new BasicParser()),
            new TagParser("Negative Level Fluctuation", new BasicParser()),
            new TagParser("Level Fluctuation", new BasicParser()),
            new TagParser("maxhp Rate", new SignedParser()),
            new TagParser("maxmp Rate", new SignedParser()),
            new TagParser("atk Rate", new SignedParser()),
            new TagParser("def Rate", new SignedParser()),
            new TagParser("mat Rate", new SignedParser()),
            new TagParser("mdf Rate", new SignedParser()),
            new TagParser("agi Rate", new SignedParser()),
            new TagParser("luk Rate", new SignedParser()),
            new TagParser("maxhp Flat", new SignedParser()),
            new TagParser("maxmp Flat", new SignedParser()),
            new TagParser("atk Flat", new SignedParser()),
            new TagParser("def Flat", new SignedParser()),
            new TagParser("mat Flat", new SignedParser()),
            new TagParser("mdf Flat", new SignedParser()),
            new TagParser("agi Flat", new SignedParser()),
            new TagParser("luk Flat", new SignedParser()),
            new TagParser("Resist Level Change", new TagOnlyParser()),
            new TagParser("Skill Require Level", new BasicTagArrayParser(1))
        ]
    );

});