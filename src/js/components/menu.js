$(function () {
    $('#hamb').on('click', function () {
        $('.mm-wrapper').addClass('active');
        $('.in-between-screen').addClass('active');
        $('body').addClass('no-scroll'); 
    })

    $('.close-btn-x').on('click', function () {
        $('.mm-wrapper').removeClass('active');
        $('.in-between-screen').removeClass('active');
        $('body').removeClass('no-scroll'); 
        $('body').removeClass('set-fixed');
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
        if($('#readSection').length > 0 || $('#tagResult').length > 0){
            var $nav = $(".nav");

            var $navTabs = $('.left-wrapper');

            // if ($nav.hasClass('back')) {
            //     $navTabs.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
            // }
            console.log('scrolllllll')
            $navTabs.toggleClass('scrolled', $(this).scrollTop() > $nav.height());            
        }

    });


    var $btnSearch = $('#btnSearch');
    var $closeSearch = $('#closeSearch');


    $btnSearch.on('click', function () {
        $('.search').fadeIn('fast');
        $('.in-between-screen').addClass('active').css({ 'background-color' : 'black', 'opacity' : '.5', 'left' : '0' });
        $('body').addClass('no-scroll'); 
    })
    $closeSearch.on('click', function () {
        $('.search').fadeOut('fast');
        $('.in-between-screen').removeClass('active').css({ 'background-color' : '', 'opacity' : '' });
        $('body').removeClass('no-scroll'); 
    })


    // $('a.nav-link.megamenu-genre').on('click', function () {
    //     $('a.nav-link.megamenu-genre').each(function () {
    //         $(this).parent().removeClass('active');

    //         console.log($(this));
    //     })
    //     $(this).parent().addClass('active');

    //     var dataKey = $(this).data('key');
    //     $('.genre-tabs .nav').find('a#' + dataKey).click();
    // })

    // var $menuBrowseBy =  $('.megamenu-browseby')
    // var $menuBrowseByKey = $menuBrowseBy.data('key')



    // $menuBrowseBy.on('click', function(){
    //     $menuBrowseBy.each(function(){  

    //         var $filterBrowseBy = $('.browse-by').find('.custom-contorl-input')
    //         var filterBrowseByKey = $filterBrowseBy.data('key')

    //         if ($(this).data('key') === filterBrowseByKey){

    //             $('a#'+filterBrowseByKey).is(":checked")
    //         }
    //     })
    // })


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