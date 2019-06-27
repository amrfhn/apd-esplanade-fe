$(function () {

    var $imageCarousel = $('.carousel-banner');
    var $slideCount = $('.slide-count-wrap');

    $imageCarousel.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        
        var i = (currentSlide ? currentSlide : 0) + 1;
        
        $slideCount.text('0'+i + '/' + slick.slideCount);
    });

    $('.carousel-banner').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });

});
