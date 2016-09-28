function initDelay(done) {
    setTimeout(function () {
        done();
    }, 2000); // allow some delay for app init
}

// Shortcuts

function goToDefaultPage(done) {
    clickOn($('.navbar a[href="#"]'))
    .done(function () {
        done();
    });
}

// UI helpers

function scrollTo(top) {
    return $.Deferred(function (deferred) {
        $('#content .content').animate({
            scrollTop: top
        }, 'easeOutExpo');

        setTimeout(function () {
            deferred.resolve();
        }, 1000);  // allow some delay for scrolling
    }).promise();
}

function clickOn(element) {
    return $.Deferred(function (deferred) {
        $(element).get(0).click();

        setTimeout(function () {
            deferred.resolve();
        }, 1000);  // allow some delay for click
    }).promise();
}

function slideAndClickOn(element) {
    return clickOn($('#deployButton'))
           .then(function () {
                return $.Deferred(function (deferred) {
                    clickOn(element)
                    .done(function () {
                        deferred.resolve();
                    });
                }).promise();
    });
}

function fillForm(callback) {
    callback();

    return $.Deferred(function (deferred) {
        setTimeout(function () {
            deferred.resolve();
        }, 1000);  // allow some delay for form refresh
    }).promise();
}

// Callbacks helpers

/*function loginCallback(user) {
    $('#contentPage #loginEmailField').val(user.email);
    $('#contentPage #loginPasswordField').val(user.pass);
}*/
