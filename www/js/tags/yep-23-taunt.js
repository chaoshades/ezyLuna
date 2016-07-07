define(function (require) {

    "use strict";

    var TagOnlyParser = require("parser/TagOnlyParser");

    return [
            new TagParser("Physical Taunt", new TagOnlyParser()),
            new TagParser("Magical Taunt", new TagOnlyParser()),
            new TagParser("Certain Taunt", new TagOnlyParser()),
            new TagParser("Null Physical Taunt", new TagOnlyParser()),
            new TagParser("Null Magical Taunt", new TagOnlyParser()),
            new TagParser("Null Certain Taunt", new TagOnlyParser()),
            new TagParser("Ignore Physical Taunt", new TagOnlyParser()),
            new TagParser("Ignore Magical Taunt", new TagOnlyParser()),
            new TagParser("Ignore Certain Taunt", new TagOnlyParser())
    ];

});