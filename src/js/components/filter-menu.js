$(function () {

    var $filterMenu = $('.filter-menu-wrapper');

    $('.filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $("body").addClass("filter-open");
    })

    $('.close-filter').on('click', function () {
        $filterMenu.toggleClass('show-filter');
        $("body").removeClass("filter-open");
    })


    
})