$(function () {
    "use strict";

    // fancybox
    $().fancybox({
        toolbar: false,
        hash: false,
        selector: '.slick-slide:not(.slick-cloned) a',
        backFocus: false,
        infobar : false,
        buttons : false,
        afterShow: function (instance, current) {
            current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);

            if (instance.group.length > 1 && current.$content) {
                current.$content.append('<a data-fancybox-next class="button-next" href="javascript:;">→</a><a data-fancybox-previous class="button-previous" href="javascript:;">←</a>');
            }

            current.$content.append('<a data-fancybox-close class="button-close" href="javascript:;">×</a>');
        }
    });

    // Slick
    // =====
    $(".image-gallery").slick({
        slidesToShow: 1,
        infinite: false,
        dots: false,
        arrows: true,
        prevArrow: $('.prev-slide'),
        nextArrow: $('.next-slide')
    });

    // // // Slick
    // // // =====
    // $(".small-slider").slick({
    //     slidesToShow: 1,
    //     infinite: true,
    //     dots: false,
    //     arrows: false
    // });

    // // fancybox
    // $('[data-fancybox="gallery"]').fancybox({
    //     // selector: '.small-slider .slick-slide:not(.slick-cloned)',
    //     backFocus: false,
    //     // afterShow: function (instance, current) {
    //     //     console.log('curr', current)
    //     //     console.log(current.opts.$orig.closest(".slick-initialized"), 'curr', current.index)
    //     //     current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
    //     // }
    // });
})