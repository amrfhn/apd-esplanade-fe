$(function () {


    for (var i = 1; i <= 5; i++) {
        Ellipsis({
            className: '.clamp-' + i,
            break_word: false,
            lines: i,
            responsive: true
        });
    }

    $('#author-name').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('#acknowledgements').offset().top
        }, 500);
    });

    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    var mobileCaption = $('.caption').attr('data-mobile-caption')
    var desktopCaption = $('.caption').attr('data-desktop-caption')
    var mobileImage = $('.thumbnail-holder').attr('data-mobile-image')
    var desktopImage = $('.thumbnail-holder').attr('data-desktop-image')
    var carouselMobileImage = $('.banner-bg').attr('data-mobile-image')
    var carouselDesktopImage = $('.banner-bg').attr('data-desktop-image')

    console.log(carouselMobileImage);

    if(width <= 768)
    {   
        
        if(mobileCaption !== ""){
            $('.banner-bg').css('background-image', 'url("' +mobileCaption+ '")')
        } else {
            $('.banner-bg').css('background-image', 'url("' +desktopCaption+ '")')
        }


        if(mobileImage !== ""){
            $('.banner-bg').css('background-image', 'url("' +mobileImage+ '")')
        } else {
            $('.banner-bg').css('background-image', 'url("' +desktopImage+ '")')
        }


        if(carouselMobileImage !== ""){
            $('.banner-bg').css('background-image', 'url("' +carouselMobileImage+ '")')
        } else {
            $('.banner-bg').css('background-image', 'url("' +carouselDesktopImage+ '")')
        }
        
    }
    if(width > 768)
    {
        $('.caption').html(desktopCaption);
        $('.thumbnail-holder').css('background-image', 'url("' +desktopImage+ '")')
        $('.banner-bg').css('background-image', 'url("' +carouselDesktopImage+ '")')
    }

    // var params = {
    //     "browse": "ddygsyfs",
    //     "contentType": "uydsgfysgfys",
    //     "timeTaken": "ssfgsdyfg",
    //     "sort": "trending"
    // }
    $('.multi-collapse').on('shown.bs.collapse', function () {
        var text = $('#in-the-series button').text();
        $('#in-the-series button').text(text.replace('View All', 'View Less'));
    })

    $('.multi-collapse').on('hidden.bs.collapse', function () {
        var text = $('#in-the-series button').text();
        $('#in-the-series button').text(text.replace('View Less', 'View All'));
    })
})
