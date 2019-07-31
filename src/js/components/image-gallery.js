$(function(){
    $('.image-gallery').slick({
        slidesToShow   : 1,
        slidesToScroll : 1, 
        arrows: true,
        prevArrow: $('.prev-slide'),
        nextArrow: $('.next-slide')      
    })

    $('[data-fancybox="gallery"]').fancybox({
        toolbar: false,
        hash: false,
    });   
})