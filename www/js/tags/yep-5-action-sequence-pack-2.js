define(function (require) {

    "use strict";

    var TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_X_ActSeqPack2',
        'Action Sequence Pack 2',
        'v1.11',
        '(Requires YEP_BattleEngineCore.js) Visual functions are added to the Battle Engine Core\'s action sequences.',
        'http://yanfly.moe/2015/10/12/yep-5-action-sequence-pack-2/',
        [
            new TagParser("Setup Action#2", new TagOnlyParser(), "Setup Action"),
            new TagParser("Whole Action#2", new TagOnlyParser(), "Whole Action"),
            new TagParser("Target Action#2", new TagOnlyParser(), "Target Action"),
            new TagParser("Follow Action#2", new TagOnlyParser(), "Follow Action"),
            new TagParser("Finish Action#2", new TagOnlyParser(), "Finish Action")
        ]
    );

});