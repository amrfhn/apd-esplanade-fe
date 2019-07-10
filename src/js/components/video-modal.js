$(function () {
    var videoModal = $("#video-modal");

    videoModal.on("hide.bs.modal", function (e) {
        var $if = $(e.delegateTarget).find('iframe');
        var src = $if.attr("src");
        $if.attr("src", '/empty.html');
        $if.attr("src", src);
    })
    
    videoModal.on("hidden.bs.modal", function (e) {
        $('.nav-bar-wrapper').css('padding-right', 'unset')
    })

    videoModal.on('show.bs.modal', function () {
        $('.nav-bar-wrapper').css('padding-right', '17px')
    })
})