define(function (require) {

    "use strict";

    var BasicPercentParser = require("parser/BasicPercentParser"),
        BasicTagArrayPercentParser = require("parser/BasicTagArrayPercentParser"),
        BasicTagArraySignedParser = require("parser/BasicTagArraySignedParser"),
        SignedParser = require("parser/SignedParser");

    return new Plugin(
        'YEP_X_SkillCooldowns',
        'v1.08',
        'http://yanfly.moe/2015/10/14/yep-9-skill-cooldowns/',
        [
            new TagParser("Skill Cooldown Duration", new BasicTagArrayPercentParser(1)),
            new TagParser("SType Cooldown Duration", new BasicTagArrayPercentParser(1)),
            new TagParser("Global Cooldown Duration", new BasicPercentParser()),
            new TagParser("Skill Cooldown Rate", new BasicTagArrayPercentParser(1)),
            new TagParser("SType Cooldown Rate", new BasicTagArrayPercentParser(1)),
            new TagParser("Global Cooldown Rate", new BasicPercentParser()),
            new TagParser("Skill Cooldown", new BasicTagArraySignedParser(1)),
            new TagParser("SType Cooldown", new BasicTagArraySignedParser(1)),
            new TagParser("Global Cooldown", new SignedParser()),
            new TagParser("Skill Warmup", new BasicTagArraySignedParser(1)),
            new TagParser("SType Warmup", new BasicTagArraySignedParser(1)),
            new TagParser("Global Warmup", new SignedParser())
        ]
    );

});