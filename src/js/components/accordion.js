$(function () {
    'use strict'
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function () {
        $(this).prev("a").find(".icon").addClass("icon-minus").removeClass("icon-plus");
    });

    //Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function () {
        $(this).prev("a").find(".icon").removeClass("icon-plus").addClass("icon-minus");
    }).on('hidden.bs.collapse', function () {
        $(this).prev("a").find(".icon").removeClass("icon-minus").addClass("icon-plus");
    });


    $(".acknowledgement-accordion").each(function () {
        if ($(this).find('.icon-plus').hasClass('d-none')) {
            $(this).attr('data-toggle', 'false');
        }
    });
});

