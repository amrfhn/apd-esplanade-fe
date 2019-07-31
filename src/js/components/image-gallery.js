$(function () {
    "use strict";
    // // fancybox
    // $().fancybox({
    //     selector: '.image-gallery .slick-slide:not(.slick-cloned)',
    //     backFocus: false,
    //     afterShow: function (instance, current) {
    //         current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
    //     }
    // });

    // // Slick
    // // =====
    // $(".image-gallery").slick({
    //     slidesToShow: 1,
    //     infinite: true,
    //     dots: false,
    //     arrows: true,
    //     prevArrow: $('.prev-slide'),
    //     nextArrow: $('.next-slide')
    // });

    // Slick
    // =====
    $(".small-slider").slick({
        slidesToShow: 1,
        infinite: true,
        dots: false,
        arrows: false
    });

    // fancybox
    $().fancybox({
        selector: '.small-slider .slick-slide:not(.slick-cloned)',
        backFocus: false,
        afterShow: function (instance, current) {
            console.log('curr', current)
            console.log(current.opts.$orig.closest(".slick-initialized"), 'curr', current.index)
            current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
        }
    });
    
    
})