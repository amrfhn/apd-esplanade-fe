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
        var $nav = $(".nav");

        var $navTabs = $('.left-wrapper');

        if ($nav.hasClass('back')) {
            $navTabs.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        }
    });


    var $btnSearch = $('#btnSearch');
    var $closeSearch = $('#closeSearch');


    $btnSearch.on('click', function () {
        $('#searchBar').toggleClass('active');
    })
    $closeSearch.on('click', function () {
        $('#searchBar').removeClass('active');
    })

    var $fixSideTab = $('.navtabs-filter-wrapper');

    if($fixSideTab.length > 0){
        $(document).on('scroll', function (e) {

            if ($(this).scrollTop() >= $fixSideTab.offset().top + 100  && !$(".navtabs-filter-wrapper").hasClass("fixedBar")) {
                $(".navtabs-filter-wrapper").addClass("fixedBar");
                console.log("triger")
            }
    
            if ($(this).scrollTop() < $fixSideTab.offset().top + 100  && $(".navtabs-filter-wrapper").hasClass("fixedBar")) {
                $(".navtabs-filter-wrapper").removeClass("fixedBar");
                console.log("not")
            }
        });
    }

    

});
