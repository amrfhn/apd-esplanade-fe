$(function () {
    "use strict";

    $('.image-gallery-wrapper').each(function (index, item) {
        var _this = $(this);

        var slider = "#" + $(item).attr('id');
        var fancyboxSelector = slider + ' .slick-slide:not(.slick-cloned) a'

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
            afterLoad: function (instance, current) {
                if (instance.group.length == 1) {
                    $('.fancybox-infobar, .fancybox-navigation').hide();
                }
            },
            afterShow: function (instance, current) {
                current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
            },
            clickContent: function (current, event) {
                return current.type === 'image' ? 'zoom' : 'close';
            },
            mobile: {
                clickContent: function (current, event) {
                    return current.type === 'image' ? 'zoom' : 'close';
                },
                clickSlide: function (current, event) {
                    return current.type === "image" ? "toggleControls" : "close";
                },
            }
        });

        // Slick
        // =====
        var slider = $(this).find(".image-gallery")

        slider.on("init", function (event, slick) {
            if ((slick.slideCount < 2) && (slick.slideCount = 1)) {
                _this.find('.slide-count-wrap, .banner-navigation').hide();
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