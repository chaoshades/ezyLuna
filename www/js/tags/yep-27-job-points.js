define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return new Plugin(
        'YEP_JobPoints',
        'v1.07',
        'This plugin by itself doesn\'t do much, but it enables actors to acquire JP (job points) used for other plugins.',
        'http://yanfly.moe/2015/11/13/yep-27-job-points/',
        [
            new TagParser("JP", new BasicParser())
        ]
    );

});