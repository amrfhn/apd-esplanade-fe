$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    $('.filter').on('click', function (event) {
        event.preventDefault();
        $filterMenu.toggleClass('show-filter');
        $("body").addClass("filter-open");
        $('.in-between-screen').addClass('active');
    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $("body").removeClass("filter-open");
    })

    $('.submit-filter').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#tabs-filter").offset().top
        }, 1500);
    })

    $('.in-between-screen').on('click', function(){
        $filterMenu.toggleClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $("body").removeClass("filter-open");
    })

    $('.submit-filter').on('click', function(){
        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $("body").removeClass("filter-open");
    })


})