$(function(){
    // var $videoCarousel = $('.video-carousel-nav');
    // var $slideCount = $('.slide-count-wrap');

    // $videoCarousel.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        
    //     var i = (currentSlide ? currentSlide : 0) + 1;
        
    //     $slideCount.text('0'+i + '/' + slick.slideCount);
    // });   

    $('.video-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.video-carousel-nav',
        responsive: [
            {
                breakpoint: 767, 
                settings: 'unslick'
            }
        ]
    });
    $('.video-carousel-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.video-carousel',
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        focusOnSelect: true
    });
})