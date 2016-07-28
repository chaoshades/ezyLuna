﻿define(function (require) {

    "use strict";

    var BasicPercentParser = require("parser/BasicPercentParser"),
        SignedParser = require("parser/SignedParser");

    return new Plugin(
        'YEP_X_SkillCooldowns',
        'v1.08',
        'http://yanfly.moe/2015/10/14/yep-9-skill-cooldowns/',
        [
            //new TagParser("Skill x Cooldown Duration", new BasicPercentParser()), TODO
            //new TagParser("SType x Cooldown Duration", new BasicPercentParser()), TODO
            new TagParser("Global Cooldown Duration", new BasicPercentParser()),
            //new TagParser("Skill x Cooldown Rate", new BasicPercentParser()), TODO
            //new TagParser("SType x Cooldown Rate", new BasicPercentParser()), TODO
            new TagParser("Global Cooldown Rate", new BasicPercentParser()),
            //new TagParser("Skill x Cooldown Rate", new BasicPercentParser()), TODO
            //new TagParser("SType x Cooldown Rate", new BasicPercentParser()), TODO
            new TagParser("Global Cooldown Rate", new BasicPercentParser()),
            //new TagParser("Skill x Cooldown", new SignedParser()), TODO
            //new TagParser("SType x Cooldown", new SignedParser()), TODO
            new TagParser("Global Cooldown", new SignedParser()),
            //new TagParser("Skill x Warmup", new SignedParser()), TODO
            //new TagParser("SType x Warmup", new SignedParser()), TODO
            new TagParser("Global Warmup", new SignedParser())
        ]
    );

});