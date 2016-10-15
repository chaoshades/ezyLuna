define(function (require) {

    "use strict";

    var BasicParser = require("parser/BasicParser"),
        TagOnlyParser = require("parser/TagOnlyParser");

    return new Plugin(
        'YEP_X_VisualATBGauge',
        'Visual ATB Gauge',
        'v1.03',
        '(Requires YEP_BattleSysATB.js) Provides a visible ATB gauge for your enemies!',
        'http://yanfly.moe/2015/11/22/yep-31-visual-atb-gauge/',
        [
            new TagParser("Show ATB Gauge", new TagOnlyParser()),
            new TagParser("Hide ATB Gauge", new TagOnlyParser()),
            new TagParser("ATB Gauge Width", new BasicParser())
        ]
    );

});