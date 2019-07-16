$(function(){
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

    let slide = $('.video-carousel .slick-slide').length;

    if (slide < 2) {
        $('.video-carousel-nav').addClass('d-none')
    } else {
        $('.video-carousel-nav').slick({
            slidesToShow: slide,
            slidesToScroll: 1,
            asNavFor: '.video-carousel',
            dots: true,
            // autoplay: true,
            // autoplaySpeed: 2000,
            focusOnSelect: true
        });        
    }
})