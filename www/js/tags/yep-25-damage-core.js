define(function (require) {

    "use strict";

    var TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_DamageCore',
        'v1.04',
        'http://yanfly.moe/2015/11/07/yep-25-damage-core/',
        [
            new TagParser("Bypass Damage Cap", new TagOnlyParser())
        ]
    );

});