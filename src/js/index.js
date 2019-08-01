$(function () {
    clampText();

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

    // $('.genre-list').click(function (e) {
    //     e.preventDefault();

    //     $('html, body').animate({
    //         scrollTop: $('.tabfil-container').offset().top
    //     }, 500);
    // });

    $('.thumbnail-holder-portrait').each(function () {
        var mobileImage = $(this).attr('data-mobile-image');
        var desktopImage = $(this).attr('data-desktop-image');

        if (xs.matches) {
            if (mobileImage !== "") {
                $(this).css('background-image', 'url("' + mobileImage + '")');
            } else {
                $(this).css('background-image', 'url("' + desktopImage + '")');
            }
        }
        if (md.matches) {
            $('.thumbnail-holder-portrait').css('background-image', 'url("' + desktopImage + '")');
        }
    });

    $('.thumbnail-holder-landscape').each(function () {
        var mobileImage = $(this).attr('data-mobile-image')
        var desktopImage = $(this).attr('data-desktop-image')

        if (xs.matches) {
            if (mobileImage !== "") {
                $(this).css('background-image', 'url("' + mobileImage + '")')
            } else {
                $(this).css('background-image', 'url("' + desktopImage + '")')
            }
        }
        if (md.matches) {
            $('.thumbnail-holder-landscape').css('background-image', 'url("' + desktopImage + '")')
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

    $('a.nav-link.megamenu-genre').on('click', function () {
        $('.mm-content-item').find('.nav-item').removeClass('active');
        $(this).parent().addClass('active');

        var dataKey = $(this).data('key');
        // $('.genre-list').find('a#' + dataKey).click();
        $('#genreTabs').find('#' + dataKey).click();
    })


    


})

// $(window).load(function() {
//     // page is fully loaded, including all frames, objects and images
//     alert("window is loaded");
// });

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
(function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://embed.playbuzz.com/sdk.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'playbuzz-sdk'));





