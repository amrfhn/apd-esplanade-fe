$(function () {
    "use strict";
    if ($('.image-gallery').length > 0) {
        // fancybox
        $().fancybox({
            toolbar: true,
            hash: false,
            selector: '.slick-slide:not(.slick-cloned) a',
            backFocus: false,
            infobar: true,
            buttons: false,
            loop: true,
            buttons: ['close'],
            btnTpl: {
                close:
                    '<button data-fancybox-close class="fancybox-button fancybox-button--close close" title="{{CLOSE}}">' +
                    '<img src="./assets/microsites/offstage/img/icons/Close/White.svg"/>' +
                    "</button>",
                arrowLeft:
                    '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left prev-slide custom-btn" title="{{PREV}}">' +
                    '<span class="icon esplanade-icon-Previous cust-icon arrow-light"></span>' +
                    "</button>",
                arrowRight:
                    '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right next-slide custom-btn" title="{{NEXT}}">' +
                    '<span class="icon esplanade-icon-Next cust-icon arrow-light">' +
                    "</button>",
            },
            afterShow: function (instance, current) {
                current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);

                // if (instance.group.length > 1 && current.$content) {
                //     current.$content.append('<a data-fancybox-next class="button-next" href="javascript:;">→</a><a data-fancybox-previous class="button-previous" href="javascript:;">←</a>');
                // }

                //current.$content.append('<a data-fancybox-close class="button-close close" href="javascript:;"><img src="./assets/microsites/offstage/img/icons/Close/White.svg></a>');
            },

        });

        // Slick
        // =====
        var slider = $(".image-gallery")

        slider.slick({
            slidesToShow: 1,
            infinite: true,
            dots: false,
            arrows: true,
            prevArrow: $('.prev-slide'),
            nextArrow: $('.next-slide')
        });


        function getIndex(){
            slider.find(function () {
                var text = $(this).find('.slick-current .gallery-index').text()
                console.log(text)
                $(this).find('.slide-count-wrap').text(text);
            })            
        }

        getIndex();
        
        $('.next-slide, .prev-slide').click(function () {
            getIndex();
        })
    }
})