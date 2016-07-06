define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return [
            new TagParser("CTB Icon", new BasicParser()),
            new TagParser("CTB Border Color", new BasicParser()),
            new TagParser("CTB Background Color", new BasicParser())
    ];

});