$(function () {
    clampText();


    var xs = window.matchMedia('(max-width: 768px)');
    var md = window.matchMedia('(min-width: 769px)');
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    //hide loading screen
    // $('#offstageLoading').fadeOut();
    // setTimeout(function () { $('body').removeClass('overflow-hidden'); }, 1000);

    //Homepage: Hide Scrollbar
    if (md.matches) {
        if ($("#tabs-filter")[0]) {
            $('body').addClass('hidden-scrollbar')
        }
    }

    //Comparison: Match Height
    $('.comparison').each(function () {
        var $avatarWrapper = $(this).find('.avatar-wrapper');
        $avatarWrapper.matchHeight();
    })

    //Author Componenet: Anchoring 
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
    $('a.nav-link.megamenu-genre').on('click', function () {

        $('.mm-content-item').find('.nav-item').removeClass('active');
        $(this).parent().addClass('active');

        var dataKey = $(this).data('key');
        // $('.genre-list').find('a#' + dataKey).click();
        $('.genre-tabs .nav').find('#' + dataKey).click();

    })

    //REMOVE D-NONE CLASS IN ADP
    if ($('.sticky-footer').length < 1) {
        $('footer').removeClass('d-none');
    }

    //show animation when click - to on stage
    // let btnOnStage = $('#go-onstage')
    let redirectTime = '3000'
    // let redirectUrl = 'https://www.esplanade.com/'

    $('a').on('click', function (e) {
        if ($(this).attr('href')) {
            let redirectUrl = $(this).attr('href');
            let toOnStageScreen = $('#animationToOnstage')

            if (($(this).attr('href').includes('esplanade.com') && !$(this).attr('href').includes('mailto') || $(this).attr('href').startsWith("/")) && !$(this).attr('href').includes('offstage') && !$(this).hasClass('nav-item')) {
                e.preventDefault();
                toOnStageScreen.removeClass('d-none').addClass('d-block')
                // toOnStageScreen.addClass('active')
                setTimeout(function () {
                    location.href = redirectUrl
                }, redirectTime);
            } else {
                e.currentTarget.click();
            }
        }
    });

    // solution: set flag, not to display back button if user browse details page from external
    if (sessionStorage.getItem('pageBrowsed') && document.referrer !== "") {
        var backBtn = $('.nav.back');
        $(backBtn).addClass('d-md-block');
        $(backBtn).on('click', function (e) {
            e.preventDefault();
            window.location.href = document.referrer;
        });

    }
    sessionStorage.setItem('pageBrowsed', true);


    //404 page js
    if ($('#error').length > 0) {
        window.addEventListener('load', eventWindowLoaded, false);

        var Debugger = function () { };

        Debugger.log = function (message) {
            try {
                console.log(message);
            } catch (exception) {
                return;
            }
        }

        function eventWindowLoaded() {
            canvasApp();
        }

        function canvasApp() {

            var canvas = document.getElementById('error');
            var ctx = canvas.getContext('2d');

            var w = canvas.width = window.innerWidth;
            var h = canvas.height = window.innerHeight;

            function reOffset() {
                var BB = canvas.getBoundingClientRect();
                offsetX = BB.left;
                offsetY = BB.top;
            }

            var offsetX, offsetY;
            reOffset();

            window.onscroll = function (e) {
                reOffset();
            }

            window.onresize = function (e) {
                reOffset();
            }

            canvas.addEventListener('mousemove', mouseMove, false);
            canvas.addEventListener('touchmove', mouseMove, false);

            function draw(cx, cy, radius) {
                ctx.save();

                var radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);

                radialGradient.addColorStop(0, '#fff');
                radialGradient.addColorStop(.65, '#fff');
                radialGradient.addColorStop(1, '#fff');

                ctx.clearRect(0, 0, w, h);

                ctx.beginPath();

                ctx.fillStyle = 'rgba(0, 0, 0, .8)';
                ctx.fillRect(0, 0, w, h);

                ctx.globalCompositeOperation = 'destination-out';

                ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
                ctx.fillStyle = '#fff';
                ctx.fill();

                ctx.restore();
            }

            function mouseMove(e) {
                e.preventDefault();
                e.stopPropagation();

                mouseX = parseInt(e.clientX - offsetX);
                mouseY = parseInt(e.clientY - offsetY);

                draw(mouseX, mouseY, 100);
            }


            draw(w / 2, h / 2, 100);
            $('canvas').addClass('set-fixed')

        }

    }

    //generic page footer to bottom
    if ($('#genericPage'.length > 0) && $('#tagResult').length < 1) {
        $('#genericPage').closest('main').addClass('custom-generic-page ');
        $('#genericPage').parent().closest('.container').addClass('m-auto');
    }

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



