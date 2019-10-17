$(function () {
    var $burgerMenu = $('#hamb');
    var $megaMenu = $('.mm-wrapper');
    var bodyScrollLock = require('body-scroll-lock');
    var disableBodyScroll = bodyScrollLock.disableBodyScroll;


    $burgerMenu.on('click', function () {
        // $('body').addClass('replace-scrollbar')
        
        $megaMenu.addClass('active');
        

        $('.in-between-screen').addClass('active-screen');

        disableBodyScroll($megaMenu, {
            allowTouchMove: el => {
                while (el && el !== document.body) {
                    if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                        return true
                    }

                    el = el.parentNode
                }
            },
        });
    })

    
    $('.close-btn-x').on('click', function () {
        

        $megaMenu.removeClass('active');
        $('.in-between-screen').click();
        // $('body').removeClass('replace-scrollbar')

        // $('body').removeClass('no-scroll');
        // $('body').removeClass('set-fixed');

        bodyScrollLock.clearAllBodyScrollLocks();
        $('body').css('overflow', 'auto');
    })



    // var $megaMenu = $('.mm-wrapper');

    // if ($megaMenu.hasClass('active')) {
    //     $('body').css('position', 'fixed');
    //     $('body').css('overflow', 'hidden');

    // }

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
    var bodyScrollLock = require('body-scroll-lock');
    var disableBodyScroll = bodyScrollLock.disableBodyScroll;
    var $searchContainer = $('#search-suggestion-list')
    // var $closeSearch = $('#closeSearch');

    $btnSearch.on('click', function () {
        $('.search').fadeIn('fast');
        $('.in-between-screen').addClass('active-darkscreen');
        // $('body').addClass('no-scroll'); 
        $('#search-input').focus();

        //body scroll lock
        // disableBodyScroll($searchContainer, {
        //     allowTouchMove: el => {
        //         while (el && el !== document.body) {
        //             if (el.getAttribute('body-scroll-lock-ignore') !== null) {
        //                 return true
        //             }

        //             el = el.parentNode
        //         }
        //     },
        // });
    })
    // $closeSearch.on('click', function () {
    //     $('.search').fadeOut('fast');
    //     $('.in-between-screen').removeClass('active').css({ 'background-color' : '', 'opacity' : '' });
    //     $('body').removeClass('no-scroll'); 
    // })


    $('a.nav-link.megamenu-genre').on('click', function () {
        // $('.loading-screen').css('display', 'block');
        $('.close-icon').click();
        $('.in-between-screen').removeClass('active-screen'); 

    })

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