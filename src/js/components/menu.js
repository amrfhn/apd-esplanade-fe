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
        $('#searchBar').toggleClass('active');
    })


    $('a.nav-link.megamenu-genre').on('click', function () {
         $('a.nav-link.megamenu-genre').each(function () {
             $(this).parent().removeClass('active');
             
         console.log($(this));
         })
         $(this).parent().addClass('active');

         var datakey = $(this).data('key');
         $('a#'+datakey).click();
    })

});
