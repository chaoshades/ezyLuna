﻿define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        BasicPercentParser = require("parser/BasicPercentParser"),
        CoordParser = require("parser/CoordParser"),
        BasicArrayParser = require("parser/BasicArrayParser");

    return [
            new TagParser("Breathing", new TagOnlyParser()),
            new TagParser("No Breathing", new TagOnlyParser()),
            new TagParser("Breathing Speed", new BasicParser()),
            new TagParser("Breathing Rate X", new BasicParser()),
            new TagParser("Breathing Rate Y", new BasicParser()),
            new TagParser("Floating", new TagOnlyParser()),
            new TagParser("Floating Speed", new BasicParser()),
            new TagParser("Floating Height", new BasicParser()),
            new TagParser("Scale Sprite", new BasicPercentParser()),
            new TagParser("Scale Sprite Width", new BasicPercentParser()),
            new TagParser("Scale Sprite Height", new BasicPercentParser()),
            new TagParser("Sideview Battler", new BasicParser()),
            new TagParser("Sideview Anchor X", new CoordParser()),
            new TagParser("Sideview Anchor Y", new CoordParser()),
            new TagParser("Sideview Width", new BasicParser()),
            new TagParser("Sideview Height", new BasicParser()),
            new TagParser("Sideview Collapse", new TagOnlyParser()),
            new TagParser("Sideview No Collapse", new TagOnlyParser()),
            new TagParser("Sideview Frame Speed", new BasicParser()),
            new TagParser("Sideview Attack Motion", new BasicParser()),
            new TagParser("Sideview Weapon", new BasicArrayParser()),
            new TagParser("Sideview Idle Motion", new BasicParser()),
            new TagParser("Sideview Damage Motion", new BasicParser()),
            new TagParser("Sideview Evade Motion", new BasicParser()),
            new TagParser("Sideview Escape Motion", new BasicParser()),
            new TagParser("Sideview Guard Motion", new BasicParser()),
            new TagParser("Sideview Abnormal Motion", new BasicParser()),
            new TagParser("Sideview Sleep Motion", new BasicParser()),
            new TagParser("Sideview Dying Motion", new BasicParser()),
            new TagParser("Sideview Show Shadow", new TagOnlyParser()),
            new TagParser("Sideview Hide Shadow", new TagOnlyParser()),
            new TagParser("Sideview Shadow Width", new BasicPercentParser()),
            new TagParser("Sideview Shadow Height", new BasicPercentParser()),
            new TagParser("Hide Sideview Weapon", new TagOnlyParser())
    ];

});