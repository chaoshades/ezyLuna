﻿define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return new Plugin(
        'YEP_CoreEngine',
        'Core Engine',
        'v1.16',
        'Needed for the majority of Yanfly Engine Scripts. Also contains bug fixes found inherently in RPG Maker.',
        'http://yanfly.moe/2015/10/09/yep-1-core-engine/',
        [
            new TagParser("hp", new BasicParser()),
            new TagParser("mp", new BasicParser()),
            new TagParser("atk", new BasicParser()),
            new TagParser("def", new BasicParser()),
            new TagParser("mat", new BasicParser()),
            new TagParser("mdf", new BasicParser()),
            new TagParser("agi", new BasicParser()),
            new TagParser("luk", new BasicParser()),
            new TagParser("exp", new BasicParser()),
            new TagParser("gold", new BasicParser())
        ]
    );

});