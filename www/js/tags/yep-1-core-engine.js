define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser");

    return [
            { tag: "hp", parser: new BasicParser() },
            { tag: "mp", parser: new BasicParser() },
            { tag: "atk", parser: new BasicParser() },
            { tag: "def", parser: new BasicParser() },
            { tag: "mat", parser: new BasicParser() },
            { tag: "mdf", parser: new BasicParser() },
            { tag: "agi", parser: new BasicParser() },
            { tag: "luk", parser: new BasicParser() },
            { tag: "exp", parser: new BasicParser() },
            { tag: "gold", parser: new BasicParser() }
    ];

});