$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    $('.filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $("body").addClass("filter-open");
        $('.search').fadeOut();
        
    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $('.search').fadeIn();

        $("body").removeClass("filter-open");
    })

    $('.submit-filter').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#tabs-filter").offset().top
        }, 1500);
    })

})