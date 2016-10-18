require.config({

    baseUrl: 'lib',

    paths: {
        app: '../js',
        view: '../js/views',
        partial: '../js/views/partials',
        tpl: '../tpl',
        partialtpl: '../tpl/partials',
        tag: '../js/tags',
        parser: '../js/parsers',
        parsertpl: '../js/parsers/tpl'
    },

    map: {
        '*': {
            'ui-config': 'app/ui-config',
            'adapters/data': 'app/adapters/json-adapter'
        }
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-file-input': {
            deps: ['jquery', 'bootstrap']
        },
        'bootstrap-switch': {
            deps: ['jquery', 'bootstrap']
        },
        'bootstrap-typeahead': {
            deps: ['jquery', 'bootstrap']
        },
        'jquery-tablesorter': {
            deps: ['jquery']
        },
        'jquery-tablesorter-static-row': {
            deps: ['jquery-tablesorter']
        }
    }

});

require(['jquery', 'bootstrap', 'handlebars', 'app/handlebars-helpers', 'app/router'], function ($, Bootstrap, Handlebars, HandlebarsHelpers, router) {

    "use strict";

    // Start
    router.start();

});
