$(function(){
    $('.image-gallery').slick({
        slidesToShow   : 1,
        slidesToScroll : 1,        
    })

    $('[data-fancybox="gallery"]').fancybox({
        toolbar: false,
        hash: false,
    });   
})