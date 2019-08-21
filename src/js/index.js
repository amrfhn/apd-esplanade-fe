$(function () {
    clampText();

    //svg4everybody
    // svg4everybody({
    //     polyfill: !0
    // })

    var xs = window.matchMedia('(max-width: 768px)');
    var md = window.matchMedia('(min-width: 769px)');
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (md.matches) {
        if ($("#tabs-filter")[0]) {
            $('body').addClass('hidden-scrollbar')
        }
    }

    $('#author-name').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: ($('#acknowledgements').offset().top) - ($('.nav-bar').height())
        }, 500);
    });

    $('.thumbnail-holder').each(function () {
        var mobileImageType = $(this).attr('data-mobile-image-type');
        var mobileImage = $(this).attr('data-mobile-image');
        var desktopImage = $(this).attr('data-desktop-image');

        if (xs.matches) {
            if (mobileImageType === "landscape") {
                $(this).css('background-image', 'url("' + mobileImage + '")');
                $(this).addClass('thumbnail-holder-landscape').removeClass('thumbnail-holder-portrait')
            } else {
                $(this).css('background-image', 'url("' + desktopImage + '")');
                $(this).removeClass('thumbnail-holder-landscape').addClass('thumbnail-holder-portrait')
            }
        }
        if (md.matches) {
            $('.thumbnail-holder').css('background-image', 'url("' + desktopImage + '")');
        }
    });

    // $('.thumbnail-holder').each(function () {
    //     var mobileImage = $(this).attr('data-mobile-image')
    //     var desktopImage = $(this).attr('data-desktop-image')

    //     if (xs.matches) {
    //         if (mobileImage !== "") {
    //             $(this).css('background-image', 'url("' + mobileImage + '")')
    //         } else {
    //             $(this).css('background-image', 'url("' + desktopImage + '")')
    //         }
    //     }
    //     if (md.matches) {
    //         $('.thumbnail-holder-landscape').css('background-image', 'url("' + desktopImage + '")')
    //     }
    // });

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

    $('.caption').each(function () {
        var mobileCaption = $(this).attr('data-mobile-caption')
        var desktopCaption = $(this).attr('data-desktop-caption')

        if (xs.matches) {
            if (mobileCaption !== "") {
                $(this).html(mobileCaption)
            } else {
                $(this).html(desktopCaption)
            }

        }
        if (md.matches) {
            $(this).html(desktopCaption);
        }
    });

    //In the series 
    $('.multi-collapse').on('shown.bs.collapse', function () {
        $('#in-the-series .view-button').removeClass('d-flex').addClass('d-none');
        $('#in-the-series .card-tile').addClass('pb-4');
        clampText();
    })

    $('.multi-collapse').on('show.bs.collapse', function () {
        clampText();
    })

    var articleGenre = $('.genre-text').find('.genre-link')

    articleGenre.on('click', function (e) {
        e.preventDefault();
        let articleGenreId = $(this).data('key');
        sessionStorage.setItem('genreId', articleGenreId);

        window.location = $(this).attr('href');
    })

    // var homeUrl = (window.location.href = "/")
    // console.log(homeUrl)

    $('a.nav-link.megamenu-genre').on('click', function () {

        $('.mm-content-item').find('.nav-item').removeClass('active');
        $(this).parent().addClass('active');

        var dataKey = $(this).data('key');
        // $('.genre-list').find('a#' + dataKey).click();
        $('.genre-tabs .nav').find('#' + dataKey).click();

    })


    //show animation when click - to on stage
    let btnOnStage = $('#go-onstage')
    
    let redirectTime = '3000'
    let redirectUrl = ''
    
    if (btnOnStage.length > 0){
        redirectUrl = btnOnStage.attr('data-key');
    }

    btnOnStage.on('click', function(e){
        let toOnStageScreen = $('#animationToOnstage')
        e.preventDefault();
        toOnStageScreen.removeClass('d-none').addClass('d-block')
        // toOnStageScreen.addClass('active')
        setTimeout(function () {
            location.href=redirectUrl
        }, redirectTime);
    })

    // solution: set flag, not to display back button if user browse details page from external
    if(sessionStorage.getItem('pageBrowsed') && document.referrer !== ""){
        var backBtn = $('.nav.back');
        $(backBtn).addClass('d-md-block');
        $(backBtn).on('click', function(e){
            e.preventDefault();
            window.location.href = document.referrer;
        });

    }
    sessionStorage.setItem('pageBrowsed', true);
})


function clampText() {

    let item = $("*[class*='clamp-']")
    for (var i = 1, len = $(item).length; i < len; i++) {
        let line = $($(item)[i]).attr('data-clamp');
        Ellipsis({
            className: '.clamp-' + i,
            break_word: false,
            lines: i,
            responsive: true
        });
    }
}

//btn click
function buttonClick(a) {
    if (!$(a).data("toggle") && $(a).data("link")) {
        window.open($(a).data("link"), $(a).data("target"))
    }
    setButtonTextData(a, $(a).text())
}

//playbuzz
// (function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://embed.playbuzz.com/sdk.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'playbuzz-sdk'));





