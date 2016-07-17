define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

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
            //new TagParser("stat Rate: +x% per level", new SignedPercentParser()), TODO
            //new TagParser("stat Rate: +x.y per level", new SignedParser()), TODO
            //new TagParser("stat Flat: +x per level", new SignedParser()), TODO
            //new TagParser("stat Flat: +x.y per level", new SignedParser()), TODO
            new TagParser("Resist Level Change", new TagOnlyParser()),
            //new TagParser("Skill x Require Level: y", new BasicParser()) TODO
        ]
    );

});