$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    var bodyScrollLock = require('body-scroll-lock');
    var disableBodyScroll = bodyScrollLock.disableBodyScroll;
    var enableBodyScroll = bodyScrollLock.enableBodyScroll;
    const targetElement = document.querySelector(".show-filter");


    $('.filter').on('click', function () {
        $('.in-between-screen').addClass('active');
        // $('body').addClass('no-scroll');

        $('.mm-wrapper').removeClass('active');



        //body-scroll-lock


        $(".filter-menu-wrapper").scrollTop(0);
        $filterMenu.toggleClass('show-filter')
        disableBodyScroll(targetElement);
        // $('.tabfil-container').bind('touchmove', function(e){
        //     e.preventDefault();
        // })
    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $('.in-between-screen').removeClass('active');
        // $('body').removeClass('no-scroll');
        // $("body").removeClass("filter-open");
        enableBodyScroll(targetElement);

        // $('.tabfil-container').unbind('touchmove')
    })

    $('.in-between-screen').on('click', function () {
        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $('body').removeClass('no-scroll');
        $("body").removeClass("filter-open").removeClass('set-fixed');
        $('.mm-wrapper').removeClass('active');
        $('.search').fadeOut('fast');

        enableBodyScroll(targetElement);

    })

    //for mobile
    if ($(window).width() < 960) {

        $('.submit-filter').on('click', function () {
            $filterMenu.removeClass('show-filter');
            $('.in-between-screen').removeClass('active');
            $('body').removeClass('no-scroll');
            $("body").removeClass("filter-open");
            $('html, body').animate({
                scrollTop: $(".tab-content").offset().top
            }, 360);
        });

    } else {

        $('.submit-filter').on('click', function () {
            $filterMenu.removeClass('show-filter');
            $('.in-between-screen').removeClass('active');
            $('body').removeClass('no-scroll');
            $("body").removeClass("filter-open");

            $('html, body').animate({
                scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
            }, 1500);
        })
    }

    if ($('.in-between-screen').hasClass('active')) {
        $('#btnSearch').prop('disabled', true);
    }

})
