define(function (require) {

    "use strict";

    var TagArraySignedParser = require("parser/TagArraySignedParser"),
        SignedParser = require("parser/SignedParser");

    return new Plugin(
        'YEP_X_LimitedSkillUses',
        'v1.02',
        '(Requires YEP_SkillCore.js) Make certain skills have a limited amount of times they can be used in battle.',
        'http://yanfly.moe/2016/01/09/yep-56-limited-skill-uses/',
        [
            new TagParser("Global Use Max", new SignedParser()),
            new TagParser("SType Use Max", new TagArraySignedParser(1)),
            new TagParser("Skill Use Max", new TagArraySignedParser(1))
        ]
    );

});