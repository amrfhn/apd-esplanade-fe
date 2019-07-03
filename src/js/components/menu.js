$(function () {
    $('#hamb').on('click', function () {
        $('.mm-wrapper').addClass('active');
    })

    $('.close-btn-x').on('click', function () {
        $('.mm-wrapper').removeClass('active');
    })

    var $megaMenu = $('.mm-wrapper');

    if ($megaMenu.hasClass('active')) {
        console.log("active")
        $('body').css('position', 'fixed');
        $('body').css('overflow', 'hidden');

    }

    $('#searchBar').modal({
        backdrop: false,
        show: false,
        focus: false
    });

    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");

        var $navTabs = $('#navTab');

        if (!$navTabs.hasClass('nav-tabs')) {
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        }
    });


    // var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    // if(width <= 768){
    //     console.log(width);
    //     $('.search-icon').attr('src', './assets/microsites/offstage/img/icons/Search/White.svg');
    // }
    // else{
    //     $('.search-icon').attr('src', './assets/microsites/offstage/img/icons/Search/Black.svg');
    // }


    var $btnSearch = $('#btnSearch');
    var $closeSearch = $('#closeSearch');


    $btnSearch.on('click', function () {
        $('#searchBar').toggleClass('active');
    })
    $closeSearch.on('click', function () {
        $('#searchBar').removeClass('active');
    })

    var fixSideTab = $('#mobileNavTab').offset().top;
    // var stickyGenre = $('#sticky').offset().top ;

    $(document).on('scroll', function (e) {

        if ($(this).scrollTop() >= fixSideTab && !$("#mobileNavTab").hasClass("fixedBar")) {
            $("#mobileNavTab").addClass("fixedBar");
            console.log("triger")
        }

        if ($(this).scrollTop() < fixSideTab && $("#mobileNavTab").hasClass("fixedBar")) {
            $("#mobileNavTab").removeClass("fixedBar");
            console.log("not")
        }


        if ($(this).scrollTop() >= stickyGenre && !$("#sticky").hasClass("sticky")) {
            $("#sticky").addClass("sticky");
            console.log("triger")
        }

        if ($(this).scrollTop() < stickyGenre && $("#sticky").hasClass("sticky")) {
            $("#sticky").removeClass("sticky");
            console.log("not")
        }

    });

});
