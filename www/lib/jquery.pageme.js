$.fn.pageMe = function (opts) {
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector != "undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector != "undefined") {
        pager = settings.pagerSelector;
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems / perPage);

    pager.data("curr", 0);

    if (settings.showPrevNext) {
        $('<li class="prev_link"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>').appendTo(pager);
    }

    var curr = 0;
    while (numPages > curr && (settings.hidePageNumbers == false)) {
        $('<li class="page_link"><a href="#">' + (curr + 1) + '</a></li>').appendTo(pager);
        curr++;
    }

    if (settings.showPrevNext) {
        $('<li class="next_link"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link, .prev_link a').addClass("disabled");
    if (numPages <= 1) {
        pager.find('.next_link, .next_link a').addClass("disabled");
    }
    pager.children().eq(1).addClass("active");

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li.page_link a').click(function () {
        var clickedPage = $(this).html().valueOf() - 1;
        goTo(clickedPage, perPage);
        return false;
    });
    pager.find('li.prev_link a').click(function () {
        if ($(this).hasClass('disabled')) return false;
        previous();
        return false;
    });
    pager.find('li.next_link a').click(function () {
        if ($(this).hasClass('disabled')) return false;
        next();
        return false;
    });

    function previous() {
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next() {
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page) {
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display', 'none').slice(startAt, endOn).show();

        if (page >= 1) {
            pager.find('.prev_link, .prev_link a').removeClass("disabled");
        }
        else {
            pager.find('.prev_link, .prev_link a').addClass("disabled");
        }

        if (page < (numPages - 1)) {
            pager.find('.next_link, .next_link a').removeClass("disabled");
        }
        else {
            pager.find('.next_link, .next_link a').addClass("disabled");
        }

        pager.data("curr", page);
        pager.children().removeClass("active");
        pager.children().eq(page + 1).addClass("active");

    }
};