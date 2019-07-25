$(function () {
    var $videoModal = $("#video-modal"),
        $window = $(window),
        $body = $("body"),
        scrollDistance = 0;

    $videoModal.on('show.bs.modal', function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.nav-bar-wrapper').css('padding-right', '17px')
            $('.detail-search').css('right', '57px')
            $('.home-search').css('right', '57px')
        }
    })

    $videoModal.on('shown.bs.modal', function (e) {
        $('html').addClass('freeze-page');
        $('body').addClass('freeze-page');
        $('.left-wrapper').addClass('position-absolute');
    });

    $videoModal.on("hide.bs.modal", function (e) {
        var $if = $(e.delegateTarget).find('iframe');
        var src = $if.attr("src");
        $if.attr("src", '/empty.html');
        $if.attr("src", src);
    })

    $videoModal.on("hidden.bs.modal", function (e) {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.nav-bar-wrapper').css('padding-right', 'unset')
            $('.detail-search').css('right', '40px')
            $('.home-search').css('right', '40px')
        }

        $('html').removeClass('freeze-page');
        $('body').removeClass('freeze-page');
    })
})