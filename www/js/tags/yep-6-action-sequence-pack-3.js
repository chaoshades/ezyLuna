define(function (require) {

    "use strict";

    var TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_X_ActSeqPack3',
        'Action Sequence Pack 3',
        'v1.03',
        '(Requires YEP_BattleEngineCore.js) Camera control is added to the Battle Engine Core\'s action sequences.',
        'http://yanfly.moe/2015/10/12/yep-6-action-sequence-pack-3/',
        [
            new TagParser("Setup Action#3", new TagOnlyParser(), "Setup Action"),
            new TagParser("Whole Action#3", new TagOnlyParser(), "Whole Action"),
            new TagParser("Target Action#3", new TagOnlyParser(), "Target Action"),
            new TagParser("Follow Action#3", new TagOnlyParser(), "Follow Action"),
            new TagParser("Finish Action#3", new TagOnlyParser(), "Finish Action")
        ]
    );

});