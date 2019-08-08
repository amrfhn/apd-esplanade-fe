$(function () {
    var btn = $('.bToTop').find('#backTop');
    btn.fadeOut();
    
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.fadeIn(100);
        } else {
            btn.fadeOut(500);
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '1000');
    });
})