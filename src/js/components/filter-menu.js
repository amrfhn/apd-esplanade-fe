$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    $('.filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $("body").addClass("filter-open");
    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $("body").removeClass("filter-open");
    })

    $('.submit-filter').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#tabs-filter").offset().top
        }, 1500);
        console.log("lol")
    })

})