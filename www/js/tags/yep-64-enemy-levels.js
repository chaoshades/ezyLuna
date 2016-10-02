define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        SignedConstParser = require("parser/SignedConstParser"),
        BasicTagArrayParser = require("parser/BasicTagArrayParser"),
        PER_LEVEL = "per level";

    return new Plugin(
        'YEP_EnemyLevels',
        'v1.05',
        'This plugin enables giving your enemies levels and parameter changes with those levels.',
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
            new TagParser("maxhp Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("maxmp Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("atk Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("def Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("mat Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("mdf Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("agi Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("luk Rate", new SignedConstParser(PER_LEVEL)),
            new TagParser("maxhp Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("maxmp Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("atk Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("def Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("mat Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("mdf Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("agi Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("luk Flat", new SignedConstParser(PER_LEVEL)),
            new TagParser("Resist Level Change", new TagOnlyParser()),
            new TagParser("Skill Require Level", new BasicTagArrayParser(1))
        ]
    );

});