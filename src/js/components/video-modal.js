$(function () {
    var $videoModal = $("#video-modal"),
        $window = $(window),
        $body = $("body"),
        scrollDistance = 0;

    $videoModal.on('show.bs.modal', function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.nav-bar-wrapper').css('padding-right', '19px')
        }

        // Get the scroll distance at the time the modal was opened
        scrollDistance = $window.scrollTop();

        // Pull the top of the body up by that amount
        $body.css("top", scrollDistance * -1);
    })

    $videoModal.on("hide.bs.modal", function (e) {
        var $if = $(e.delegateTarget).find('iframe');
        var src = $if.attr("src");
        $if.attr("src", '/empty.html');
        $if.attr("src", src);
    })

    $videoModal.on("hidden.bs.modal", function (e) {
        $('.nav-bar-wrapper').css('padding-right', 'unset')

        // Remove the negative top value on the body
        $body.css("top", "");

        // Set the window's scroll position back to what it was before the modal was opened
        $window.scrollTop(scrollDistance);
    })
})