$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    $('.filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $("body").addClass("filter-open");
        $('.in-between-screen').addClass('active');
        $('.mm-wrapper').removeClass('active');
        
        $( ".filter-menu-wrapper" ).scrollTop( 0 );

    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $("body").removeClass("filter-open");
    })

    $('.in-between-screen').on('click', function(){
        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $("body").removeClass("filter-open");
        $('.mm-wrapper').removeClass('active');
        $('.search-bar').removeClass('active')
    })

    $('.submit-filter').on('click', function(){
        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $("body").removeClass("filter-open");
        $('html, body').animate({
            scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
        }, 1500);
        $('html, body').animate({
            scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
        }, 1500);
        // $(".filter-menu-wrapper").scrollTop();
    })

    if ($('.in-between-screen').hasClass('active')){
        $('#btnSearch').prop('disabled', true);
    }
    

})