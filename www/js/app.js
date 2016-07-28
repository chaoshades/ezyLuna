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
        'jquery-tablesorter': {
            deps: ['jquery']
        },
        'jquery-tablesorter-static-row': {
            deps: ['jquery-tablesorter']
        }
    }

});

require(['jquery', 'bootstrap', 'handlebars', 'app/router'], function ($, Bootstrap, Handlebars, router) {

    "use strict";

    // format with id format
    // usage: {{idFormat money}}
    Handlebars.registerHelper('idFormat', function (context) {
        return pad(context, 4);
    });

    // add curly braces around content
    // usage: {{curly true}}{{name}}{{curly}}
    Handlebars.registerHelper('curly', function (object, open) {
        return open ? '{' : '}';
    });

    // format with percentage format
    // usage: {{percentFormat value}}
    Handlebars.registerHelper('percentFormat', function (context) {
        return (context * 100) + '%';
    });

    // add checked if condition is true
    // usage: {{checkedIf value}}
    Handlebars.registerHelper("checkedIf", function (condition) {
        return (condition) ? "checked" : "";
    });

    // add readonly if condition is false
    // usage: {{readonlyIfNot value}}
    Handlebars.registerHelper("readonlyIfNot", function (condition) {
        return (!condition) ? "readonly" : "";
    });

    // add disabled if condition is false
    // usage: {{disabledIfNot value}}
    Handlebars.registerHelper("disabledIfNot", function (condition) {
        return (!condition) ? "disabled" : "";
    });

    // add basic compare operators
    // usage: {{compare number ">" 10}}
    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

        var operators, result;

        if (arguments.length < 3) {
            throw new Error("Handlebars Helper 'compare' needs 2 parameters");
        }

        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }

        operators = {
            '==': function (l, r) { return l == r; },
            '===': function (l, r) { return l === r; },
            '!=': function (l, r) { return l != r; },
            '!==': function (l, r) { return l !== r; },
            '<': function (l, r) { return l < r; },
            '>': function (l, r) { return l > r; },
            '<=': function (l, r) { return l <= r; },
            '>=': function (l, r) { return l >= r; },
            'typeof': function (l, r) { return typeof l == r; }
        };

        if (!operators[operator]) {
            throw new Error("Handlebars Helper 'compare' doesn't know the operator " + operator);
        }

        result = operators[operator](lvalue, rvalue);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });

    // Start
    router.start();

});
