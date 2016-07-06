﻿define(function (require) {

    "use strict";

    var SignedParser = require("parser/SignedParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return [
            new TagParser("Max maxhp Buff", new SignedParser()),
            new TagParser("Max maxmp Buff", new SignedParser()),
            new TagParser("Max atk Buff", new SignedParser()),
            new TagParser("Max def Buff", new SignedParser()),
            new TagParser("Max mat Buff", new SignedParser()),
            new TagParser("Max mdf Buff", new SignedParser()),
            new TagParser("Max agi Buff", new SignedParser()),
            new TagParser("Max luk Buff", new SignedParser()),
            new TagParser("Max maxhp Debuff", new SignedParser()),
            new TagParser("Max maxmp Debuff", new SignedParser()),
            new TagParser("Max atk Debuff", new SignedParser()),
            new TagParser("Max def Debuff", new SignedParser()),
            new TagParser("Max mat Debuff", new SignedParser()),
            new TagParser("Max mdf Debuff", new SignedParser()),
            new TagParser("Max agi Debuff", new SignedParser()),
            new TagParser("Max luk Debuff", new SignedParser()),
            new TagParser("Show State Turn", new TagOnlyParser())
    ];

});