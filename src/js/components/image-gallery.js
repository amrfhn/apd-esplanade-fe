$(function () {
    "use strict";

    $('.image-gallery-wrapper').each(function (index, item) {
        var _this = $(this);

        var slider = "#" + $(item).attr('id');
        var fancyboxSelector = slider + ' .slick-slide:not(.slick-cloned) a'
        console.log(fancyboxSelector)

        // fancybox
        $().fancybox({
            toolbar: true,
            hash: false,
            selector: fancyboxSelector,
            backFocus: false,
            infobar: true,
            buttons: false,
            loop: true,
            buttons: ['close'],
            btnTpl: {
                close:
                    '<button data-fancybox-close class="fancybox-button fancybox-button--close close" title="{{CLOSE}}">' +
                    '<img src="/assets/microsites/offstage/img/icons/Close/White.svg"/>' +
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

                var f = $.fancybox.getInstance();

                // if (instance.currIndex++){
                //     getIndex();
                // }
                // if (instance.group.length > 1 && current.$content) {
                //     current.$content.append('<a data-fancybox-next class="button-next" href="javascript:;">→</a><a data-fancybox-previous class="button-previous" href="javascript:;">←</a>');
                // }

                //current.$content.append('<a data-fancybox-close class="button-close close" href="javascript:;"><img src="./assets/microsites/offstage/img/icons/Close/White.svg></a>');
            },

        });

        // Slick
        // =====
        var slider = $(this).find(".image-gallery")

        slider.on("init", function (event, slick) {
            if ((slick.slideCount < 2) && (slick.slideCount = 1)) {
                _this.find('.slide-count-wrap, .next-slide, .prev-slide').hide();
                $('.slide-count-container').removeClass('d-flex').addClass('d-none');
            }
        });

        slider.slick({
            slidesToShow: 1,
            infinite: true,
            dots: false,
            arrows: true,
            prevArrow: $(this).find('.prev-slide'),
            nextArrow: $(this).find('.next-slide'),
        });

        slider.on('swipe', function (event, slick, direction) {
            console.log(direction);
            getIndex();

            console.log(slick)
            // left
            $(this).find('.slick-current a').click();
        });

        slider.on('afterChange', function (slick, currentSlide) {
            getIndex();
        });

        function getIndex() {
            slider.find(function () {
                var text = _this.find('.slick-current .gallery-index').text();
                _this.find('.slide-count-wrap').text(text);
            })
        }

        getIndex();

        $(this).find('.next-slide, .prev-slide').click(function () {
            getIndex();
        })
    })
})