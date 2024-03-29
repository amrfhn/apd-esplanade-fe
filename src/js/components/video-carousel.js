$(function () {

    $('.video-component').each(function () {
        $(this).find('.video-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            // asNavFor: '.video-carousel-nav',
            responsive: [
                {
                    breakpoint: 991,
                    settings: 'unslick'
                }
            ]
        });

        var _this = this 
        let slide = $(this).find('.video-carousel .slick-slide').length;

        if (slide < 2) {
            $(this).find('.video-carousel-nav').addClass('d-none')
            $(this).find('.video-carousel-nav-wrappper').removeClass('d-md-block')
        } else {
            $(this).find('.video-carousel-nav').slick({
                slidesToShow: slide,
                slidesToScroll: slide,
                // asNavFor: '.video-carousel',
                dots: false,
                // autoplay: true,
                // autoplaySpeed: 2000,
                touchMove: false,
                draggable: false,
                focusOnSelect: false,
                infinite: false,
                centerMode: false,
            });
        }

        $(this).find('.video-carousel-nav').on('click', '.slick-slide', function (event) {
            event.preventDefault();
            var goToSingleSlide = $(this).data('slick-index');

            // $(this).find('.video-carousel').slick('slickGoTo', goToSingleSlide);
            $(_this).find('.video-carousel').slick('slickGoTo', goToSingleSlide);
        });

        var $videoTitle = $(this).find(".video-title");
        if ($videoTitle.is(':empty')){
            $videoTitle.removeClass('pt-25')
        }
    });
})