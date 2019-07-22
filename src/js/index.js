$(function () {
    clampText();

    $('#author-name').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: ($('#acknowledgements').offset().top) - ($('.nav-bar').height()) 
        }, 500);
    });

    // $('.genre-list').click(function (e) {
    //     e.preventDefault();

    //     $('html, body').animate({
    //         scrollTop: $('.tabfil-container').offset().top
    //     }, 500);
    // });

    var xs = window.matchMedia('(max-width: 768px)');
    var md = window.matchMedia('(min-width: 769px)');

    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;    

    $('.thumbnail-holder-potrait').each(function() {
        var mobileImage = $(this).attr('data-mobile-image')
        var desktopImage = $(this).attr('data-desktop-image')

        if(xs.matches)
        {  
            if(mobileImage !== ""){
                $(this).css('background-image', 'url("' +mobileImage+ '")')
            } else {
                $(this).css('background-image', 'url("' +desktopImage+ '")')
            }            
        }
        if(md.matches)
        {            
            $('.thumbnail-holder-potrait').css('background-image', 'url("' +desktopImage+ '")')
        }
    });

    $('.thumbnail-holder-landscape').each(function() {
        var mobileImage = $(this).attr('data-mobile-image')
        var desktopImage = $(this).attr('data-desktop-image')

        if(xs.matches)
        {  
            if(mobileImage !== ""){
                $(this).css('background-image', 'url("' +mobileImage+ '")')
            } else {
                $(this).css('background-image', 'url("' +desktopImage+ '")')
            }            
        }
        if(md.matches)
        {            
            $('.thumbnail-holder-landscape').css('background-image', 'url("' +desktopImage+ '")')
        }
    });

    // $('.banner-bg').each(function() {
    //     var carouselMobileImage = $(this).attr('data-mobile-image')
    //     var carouselDesktopImage = $(this).attr('data-desktop-image')
    
    //     if(xs.matches)
    //     {  
    //         if(carouselMobileImage !== ""){
    //             $(this).css('background-image', 'url("' +carouselMobileImage+ '")')
    //         } else {
    //             $(this).css('background-image', 'url("' +carouselDesktopImage+ '")')
    //         }
            
    //     }
    //     if(md.matches)
    //     {
    //         $(this).css('background-image', 'url("' +carouselDesktopImage+ '")')
    //     }
    // });

    $('.caption').each(function() {
        var mobileCaption = $(this).attr('data-mobile-caption')
        var desktopCaption = $(this).attr('data-desktop-caption')

        if(xs.matches)
        {   
            if(mobileCaption !== ""){
                $(this).html(mobileCaption)
            } else {
                $(this).html(desktopCaption)
            }
            
        }
        if(md.matches)
        {
            $(this).html(desktopCaption);
        }
    });

    //In the series 
    $('.multi-collapse').on('shown.bs.collapse', function () {
        $('#in-the-series button').addClass('d-none');
        clampText();
    })

    $('.multi-collapse').on('show.bs.collapse', function () {
        clampText();
    })

    $('.btn-back').on('click', function(){

        var getKey = localStorage.getItem('dataGenre');
        var genre = $('.genre-list').find('nav-link')

        genre.each(function(){
            if (getKey === null){
                console.log('nulllll')
            } else{
                $(this).data('key', getKey).click();
                console.log('fire')
            }
        })

        // $('.genre-list').find('nav-link [data-key='+ getKey +']').click();
//         $(".custom-checkkbox [data-key=" + getKey + "] ").prop("checked", true);
    })
})

// $(window).load(function() {
//     // page is fully loaded, including all frames, objects and images
//     alert("window is loaded");
// });

function clampText(){
    let item = $("*[class*='clamp-']")
    for(var i=1, len=$(item).length; i<len; i++){
        Ellipsis({
            className: '.clamp-' + i,
            break_word: false,
            lines: i,
            responsive: true
        });
    }
}

