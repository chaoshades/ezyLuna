define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser"),
        BasicPercentParser = require("parser/BasicPercentParser");

    return [
            new TagParser("Bypass Armor Scaling", new TagOnlyParser()),
            new TagParser("Physical Armor Reduction", new BasicParser(), "Physical Armor Reduction"),
            new TagParser("Magical Armor Reduction", new BasicParser(), "Magical Armor Reduction"),
            new TagParser("Certain Armor Reduction", new BasicParser(), "Certain Armor Reduction"),
            new TagParser("Physical Armor Reduction#2", new BasicPercentParser(), "Physical Armor Reduction"),
            new TagParser("Magical Armor Reduction#2", new BasicPercentParser(), "Magical Armor Reduction"),
            new TagParser("Certain Armor Reduction#2", new BasicPercentParser(), "Certain Armor Reduction")
    ];

});