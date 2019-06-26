$(".clamp").each(function (i, element) {
    var numLines = $(this).data("clamp-lines") || 3;
    $clamp(element, { clamp: numLines });
});

for (var i = 1; i <= 5; i++) {
    Ellipsis({
        className: '.clamp-' + i,
        break_word: false,
        lines: i,
        responsive: true
    });
}


