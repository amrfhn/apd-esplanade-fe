$(document).ready(function(){
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

    $('.read-more').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('#content').offset().top
        }, 500);
    }); 
    
    


    $.ajax({
        type: "GET",
        url: "./assets/js/json/sample.json",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json",
    }).done(function(data){
        console.log(data);
    }).fail(function(){
        
    })
})


