$(function () {
    var $burgerMenu = $('#hamb');
    var $megaMenu = $('.mm-wrapper');

    $burgerMenu.on('click', function () {
        // $('body').addClass('replace-scrollbar')
        $('body').css('overflow','hidden');
        $megaMenu.addClass('active');
        

        $('.in-between-screen').addClass('active-screen');
    })

    
    $('.close-btn-x').on('click', function () {
        
        $('body').css('overflow','');

        $megaMenu.removeClass('active');
        $('.in-between-screen').click();
        // $('body').removeClass('no-scroll');
        // $('body').removeClass('set-fixed');
    })



    $('#searchBar').modal({
        backdrop: false,
        show: false,
        focus: false
    });

    $(document).scroll(function () {
        if ($('#readSection').length > 0 || $('#tagResult').length > 0 ||
            $('#landingPage').length > 0) {
            var $nav = $(".nav");

            var $navTabs = $('.left-wrapper');

            $navTabs.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        }

    });

    var $btnSearch = $('#btnSearch');
    var $searchContainer = $('#search-suggestion-list')
    // var $closeSearch = $('#closeSearch');

    $btnSearch.on('click', function () {
        $('.mm-wrapper').removeClass('active');
        $('.in-between-screen').removeClass('active-screen');
        $('.search').fadeIn('fast');
        $('.in-between-screen').addClass('active-darkscreen');
        // $('body').addClass('no-scroll'); 
        $('#search-input').focus();
        $('body').css('overflow', '');

    })

    $('a.nav-link.megamenu-genre').on('click', function () {
        // $('.loading-screen').css('display', 'block');
        $('.close-icon').click();
        $('.in-between-screen').removeClass('active-screen'); 

    })

    //menuburger key link to filter data checkbox
    //karyann

    $(".mm-content a.filter").click(function () {
        var dataKey = $(this).attr("data-key");

        event.preventDefault();

        $(".custom-checkkbox .custom-control-input ").prop("checked", false);
        $(".custom-checkkbox [data-key=" + dataKey + "] ").prop("checked", true);
        $(".mm-wrapper").removeClass("active");
        $(".submit-filter").click();

    });

});