﻿define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_RowFormation',
        'v1.10',
        'http://yanfly.moe/2016/01/02/yep-54-row-formation/',
        [
            new TagParser("Default Row", new BasicParser()),
            new TagParser("Row Lock", new TagOnlyParser()),
            new TagParser("Not Row Lock", new TagOnlyParser())
        ]
    );

});