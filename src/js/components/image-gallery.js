$(function(){
    $('.image-gallery').slick({
        slidesToShow   : 1,
        slidesToScroll : 1, 
        arrows: true        
    })

    $('[data-fancybox="gallery"]').fancybox({
        toolbar: false,
        hash: false,
    });   
})