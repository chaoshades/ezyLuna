define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return new Plugin(
        'YEP_JobPoints',
        'v1.07',
        'http://yanfly.moe/2015/11/13/yep-27-job-points/',
        [
            new TagParser("JP", new BasicParser())
        ]
    );

});