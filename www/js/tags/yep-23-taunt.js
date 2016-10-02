define(function (require) {

    "use strict";

    var TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_Taunt',
        'v1.01',
        'Adds a Taunt mechanic to battle. Battlers with a taunt property become the target of enemy focus.',
        'http://yanfly.moe/2015/10/31/yep-23-taunt/',
        [
            new TagParser("Physical Taunt", new TagOnlyParser()),
            new TagParser("Magical Taunt", new TagOnlyParser()),
            new TagParser("Certain Taunt", new TagOnlyParser()),
            new TagParser("Null Physical Taunt", new TagOnlyParser()),
            new TagParser("Null Magical Taunt", new TagOnlyParser()),
            new TagParser("Null Certain Taunt", new TagOnlyParser()),
            new TagParser("Ignore Physical Taunt", new TagOnlyParser()),
            new TagParser("Ignore Magical Taunt", new TagOnlyParser()),
            new TagParser("Ignore Certain Taunt", new TagOnlyParser())
        ]
    );

});