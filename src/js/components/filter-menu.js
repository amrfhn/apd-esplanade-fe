$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    var bodyScrollLock = require('body-scroll-lock');

    $('.in-between-screen').on('click', function () {
        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $('body').removeClass('no-scroll');
        $("body").removeClass("filter-open").removeClass('set-fixed');
        $('.mm-wrapper').removeClass('active');
        $('.search').fadeOut('fast');

        bodyScrollLock.clearAllBodyScrollLocks();
    })

    if ($('.in-between-screen').hasClass('active')) {
        $('#btnSearch').prop('disabled', true);
    } else {
        $('#btnSearch').prop('disabled', false);
    }

    //for mobile
    // if ($(window).width() < 960) {

    //     $('.submit-filter').on('click', function () {
    //         $filterMenu.removeClass('show-filter');
    //         $('.in-between-screen').removeClass('active');
    //         $('body').removeClass('no-scroll');
    //         $("body").removeClass("filter-open");
    //         $('html, body').animate({
    //             scrollTop: $(".tab-content").offset().top
    //         }, 360);
    //     });

    // } else {

    //     $('.submit-filter').on('click', function () {
    //         $filterMenu.removeClass('show-filter');
    //         $('.in-between-screen').removeClass('active');
    //         $('body').removeClass('no-scroll');
    //         $("body").removeClass("filter-open");

    //         $('html, body').animate({
    //             scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
    //         }, 1500);
    //     })
    // }

    

})
