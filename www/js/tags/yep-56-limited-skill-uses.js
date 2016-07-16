define(function (require) {

    "use strict";

    var SignedParser = require("parser/SignedParser");

    return new Plugin(
        'YEP_X_LimitedSkillUses',
        'v1.02',
        'http://yanfly.moe/2016/01/09/yep-56-limited-skill-uses/',
        [
            new TagParser("Global Use Max", new SignedParser()),
            new TagParser("SType x Use Max", new SignedParser()),
            new TagParser("Skill x Use Max", new SignedParser())
        ]
    );

});