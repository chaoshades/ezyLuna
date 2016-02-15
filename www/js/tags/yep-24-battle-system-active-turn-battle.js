define(function (require) {

    "use strict";

    var SignedParser = require("parser/SignedParser"),
        SignedPercentParser = require("parser/SignedPercentParser");

    return [
            new TagParser("ATB Start", new SignedParser(), "ATB Start"),
            new TagParser("ATB Turn", new SignedParser(), "ATB Turn"),
            new TagParser("ATB Start#2", new SignedPercentParser(), "ATB Start"),
            new TagParser("ATB Turn#2", new SignedPercentParser(), "ATB Turn")
    ];

});