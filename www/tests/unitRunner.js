require.config({

    baseUrl: '../lib',

    paths: {
        app: '../js',
        view: '../js/views',
        partial: '../js/views/partials',
        tpl: '../tpl',
        partialtpl: '../tpl/partials',
        tag: '../js/tags',
        parser: '../js/parsers',
        parsertpl: '../js/parsers/tpl',
        jasmine: '../tests/lib/jasmine-2.5.2/jasmine',
        'jasmine-html': '../tests/lib/jasmine-2.5.2/jasmine-html',
        'jasmine-boot': '../tests/lib/jasmine-2.5.2/boot',
        spec: '../tests/spec/unit'
    },

    map: {
        '*': {
            'adapters/data': 'app/adapters/json-adapter'
        }
    },

    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'underscore': {
            exports: '_'
        }
    }

});

require(['jquery', 'jasmine-boot', 'handlebars', 'app/handlebars-helpers'], function ($, Jasmine, Handlebars, HandlebarsHelpers) {

    "use strict";

    var specs = [];
    // include spec files here...
    specs.push('spec/BasicParserSpec');

    // Execute unit tests
    $(function () {
        require(specs, function (spec) {
            window.onload();
        });
    });

});
