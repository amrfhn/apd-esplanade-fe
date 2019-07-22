$(function () {
    $('#hamb').on('click', function () {
        $('.mm-wrapper').addClass('active');
        $('.in-between-screen').addClass('active');

    })

    $('.close-btn-x').on('click', function () {
        $('.mm-wrapper').removeClass('active');
        $('.in-between-screen').removeClass('active');

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
        $('#searchBar').addClass('active');
        $('.in-between-screen').addClass('active');
    })
    $closeSearch.on('click', function () {
        $('#searchBar').removeClass('active');
    })


    $('a.nav-link.megamenu-genre').on('click', function () {
        $('a.nav-link.megamenu-genre').each(function () {
            $(this).parent().removeClass('active');

            console.log($(this));
        })
        $(this).parent().addClass('active');

        var dataKey = $(this).data('key');
        $('a#' + dataKey).click();
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

    $(".mm-content a").click(function () {
        var dataKey = $(this).attr("data-key");
    
        event.preventDefault();

        $(".custom-checkkbox .custom-control-input ").prop("checked", false);
        $(".custom-checkkbox [data-key=" + dataKey + "] ").prop("checked", true);
        $(".mm-wrapper").removeClass("active");
        $( ".submit-filter" ).click();
        //localStorage.setItem("dataKey", dataKey);
      //  localStorage.setItem( $(this).attr('name'), $(this).is(':checked') );
    
    });

    // $( document ).ready(function() {
    //     if (localStorage.getItem("dataKey") === null) {
    //         localStorage.setItem("dataKey", null);
    //       }else{
    //         var getKey =localStorage.getItem('dataKey')
    //         $(".custom-checkkbox [data-key=" + getKey + "] ").prop("checked", true);
    //       }

    // });


});