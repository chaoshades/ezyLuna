define(["handlebars"], function (Handlebars) {

    "use strict";

    // format with id format
    // usage: {{idFormat value}}
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

    // add value if there is content
    // usage: {{valueIf value}}
    Handlebars.registerHelper("valueIf", function (context) {
        return (context) ? new Handlebars.SafeString('value="' + context + '"') : "";
    });

    // add selected if option is value
    // usage: {{selectedIf optionValue valueToSelect}}
    Handlebars.registerHelper('selectedIf', function (option, value) {
        return (option == value) ? "selected" : "";
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

});
