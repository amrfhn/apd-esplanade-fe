$(function () {


    for (var i = 1; i <= 5; i++) {
        Ellipsis({
            className: '.clamp-' + i,
            break_word: false,
            lines: i,
            responsive: true
        });
    }

    $('#author-name').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('#acknowledgements').offset().top
        }, 500);
    });

    $('.multi-collapse').on('shown.bs.collapse', function () {
        var text = $('#in-the-series button').text();
        $('#in-the-series button').text(text.replace('View All', 'View Less'));
    })

    $('.multi-collapse').on('hidden.bs.collapse', function () {
        var text = $('#in-the-series button').text();
        $('#in-the-series button').text(text.replace('View Less', 'View All'));
    })
})
