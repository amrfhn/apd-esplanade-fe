$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    var xs = window.matchMedia('(max-width: 768px)');

    $('.in-between-screen').on('click', function (e) {
        e.preventDefault()

        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active-screen').removeClass('active-darkscreen');
        $('body').removeClass('no-scroll');
        $("body").removeClass("filter-open").removeClass('set-fixed');
        $('.mm-wrapper').removeClass('active');
        $('.search').fadeOut('fast');
        $('body').css('overflow','');


        // if(xs.matches) {
        //     $('body').removeClass('position-fixed')
           
        //     var homepageFilter = $('.filter-bar').closest('.container-fluid')
        //     if ($('.filter-bar').length > 0){
        //         homepageFilter.removeClass('stick')
        //     }
            
        // } else {
        //     $('.filter-bar').closest('.container-fluid').removeClass("stick");
        // }
    })

    if ($('.in-between-screen').hasClass('active-screen')) {
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
