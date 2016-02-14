define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        BasicPercentParser = require("parser/BasicPercentParser"),
        CoordParser = require("parser/CoordParser"),
        BasicArrayParser = require("parser/BasicArrayParser");

    return [
            { tag: "Breathing", parser: new TagOnlyParser() },
            { tag: "No Breathing", parser: new TagOnlyParser() },
            { tag: "Breathing Speed", parser: new BasicParser() },
            { tag: "Breathing Rate X", parser: new BasicParser() },
            { tag: "Breathing Rate Y", parser: new BasicParser() },
            { tag: "Floating", parser: new TagOnlyParser() },
            { tag: "Floating Speed", parser: new BasicParser() },
            { tag: "Floating Height", parser: new BasicParser() },
            { tag: "Scale Sprite", parser: new BasicPercentParser() },
            { tag: "Scale Sprite Width", parser: new BasicPercentParser() },
            { tag: "Scale Sprite Height", parser: new BasicPercentParser() },
            { tag: "Sideview Battler", parser: new BasicParser() },
            { tag: "Sideview Anchor X", parser: new CoordParser() },
            { tag: "Sideview Anchor Y", parser: new CoordParser() },
            { tag: "Sideview Width", parser: new BasicParser() },
            { tag: "Sideview Height", parser: new BasicParser() },
            { tag: "Sideview Collapse", parser: new TagOnlyParser() },
            { tag: "Sideview No Collapse", parser: new TagOnlyParser() },
            { tag: "Sideview Frame Speed", parser: new BasicParser() },
            { tag: "Sideview Attack Motion", parser: new BasicParser() },
            { tag: "Sideview Weapon", parser: new BasicArrayParser() },
            { tag: "Sideview Idle Motion", parser: new BasicParser() },
            { tag: "Sideview Damage Motion", parser: new BasicParser() },
            { tag: "Sideview Evade Motion", parser: new BasicParser() },
            { tag: "Sideview Escape Motion", parser: new BasicParser() },
            { tag: "Sideview Guard Motion", parser: new BasicParser() },
            { tag: "Sideview Abnormal Motion", parser: new BasicParser() },
            { tag: "Sideview Sleep Motion", parser: new BasicParser() },
            { tag: "Sideview Dying Motion", parser: new BasicParser() }
    ];

});