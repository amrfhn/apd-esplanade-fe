$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    $('.filter').on('click', function () {
        $('.in-between-screen').addClass('active'); 
        $('body').addClass('no-scroll'); 

        $('.mm-wrapper').removeClass('active');
        
        $( ".filter-menu-wrapper" ).scrollTop( 0 );
        $filterMenu.toggleClass('show-filter');

    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $('.in-between-screen').removeClass('active');  
        $('body').removeClass('no-scroll'); 
        $("body").removeClass("filter-open"); 
    })

    $('.in-between-screen').on('click', function(){
        $filterMenu.removeClass('show-filter');
        $('.in-between-screen').removeClass('active');
        $('body').removeClass('no-scroll'); 
        $("body").removeClass("filter-open").removeClass('set-fixed');
        $('.mm-wrapper').removeClass('active');
        $('.search-bar').removeClass('active');
    })

    //for mobile
    if ($(window).width() < 960) {
    
        $('.submit-filter').on('click', function(){
            $filterMenu.removeClass('show-filter');
            $('.in-between-screen').removeClass('active');
            $('body').removeClass('no-scroll'); 
            $("body").removeClass("filter-open");
            $('html, body').animate({
                scrollTop: $(".tab-content").offset().top
            }, 360);
        });

    }else{

        $('.submit-filter').on('click', function(){
            $filterMenu.removeClass('show-filter');
            $('.in-between-screen').removeClass('active');
            $('body').addClass('no-scroll'); 
            $("body").removeClass("filter-open");
            
            $('html, body').animate({
                scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
            }, 1500);
        })
    }




    if ($('.in-between-screen').hasClass('active')){
        $('#btnSearch').prop('disabled', true);
    }
    

})
