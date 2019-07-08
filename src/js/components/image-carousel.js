$(function () {

    var $imageCarousel = $('.carousel-banner');
    var $slideCount = $('.slide-count-wrap');
    var carouselIndex = 1;
    $imageCarousel.each(function(){
        
        $(this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        
            var i = (currentSlide ? currentSlide : 0) + 1;
            
            $(this).find('.slide-count-wrap').text('0'+i + '/' + '0'+slick.slideCount);

        });

        if ($(this).find('.banner-bg').length < 2){
            $(this).find('.slide-count-wrap').hide();
        }

        $('.carousel-'+carouselIndex).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: 1500,
            dots: false,
            focusOnSelect: true,
            arrows: true,
            prevArrow:$(this).find('.prev-slide'),
            nextArrow:$(this).find('.next-slide')
        });
        carouselIndex++;
    })


    
    

});
