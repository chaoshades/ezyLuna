define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_X_VisualHpGauge',
        'v1.05',
        '(Requires YEP_BattleEngineCore.js) Reveal HP Gauges when a battler is selected or takes damage in battle.',
        'http://yanfly.moe/2015/11/21/yep-30-visual-hp-gauges/',
        [
            new TagParser("Show HP Gauge", new TagOnlyParser()),
            new TagParser("Hide HP Gauge", new TagOnlyParser()),
            new TagParser("HP Gauge Height", new BasicParser()),
            new TagParser("HP Gauge Width", new BasicParser()),
            new TagParser("HP Gauge Back Color", new BasicParser()),
            new TagParser("HP Gauge Color 1", new BasicParser()),
            new TagParser("HP Gauge Color 2", new BasicParser())
        ]
    );

});