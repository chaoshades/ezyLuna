define(function (require) {

    "use strict";

    var PercentParser = require("parser/PercentParser"),
        TagArrayPercentParser = require("parser/TagArrayPercentParser"),
        TagArraySignedParser = require("parser/TagArraySignedParser"),
        SignedParser = require("parser/SignedParser");

    return new Plugin(
        'YEP_X_SkillCooldowns',
        'v1.08',
        'http://yanfly.moe/2015/10/14/yep-9-skill-cooldowns/',
        [
            new TagParser("Skill Cooldown Duration", new TagArrayPercentParser(1)),
            new TagParser("SType Cooldown Duration", new TagArrayPercentParser(1)),
            new TagParser("Global Cooldown Duration", new PercentParser()),
            new TagParser("Skill Cooldown Rate", new TagArrayPercentParser(1)),
            new TagParser("SType Cooldown Rate", new TagArrayPercentParser(1)),
            new TagParser("Global Cooldown Rate", new PercentParser()),
            new TagParser("Skill Cooldown", new TagArraySignedParser(1)),
            new TagParser("SType Cooldown", new TagArraySignedParser(1)),
            new TagParser("Global Cooldown", new SignedParser()),
            new TagParser("Skill Warmup", new TagArraySignedParser(1)),
            new TagParser("SType Warmup", new TagArraySignedParser(1)),
            new TagParser("Global Warmup", new SignedParser())
        ]
    );

});