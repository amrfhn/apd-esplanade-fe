$(function () {
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


    // var params = {
    //     "browse": "ddygsyfs",
    //     "contentType": "uydsgfysgfys",
    //     "timeTaken": "ssfgsdyfg",
    //     "sort": "trending"
    // }

    // console.log($.param(params))
    // var host = "http://dev.esplanade.growthopsapp.com";

    // var reqOne = $.ajax({
    //     type: "GET",
    //     url: host + "/sitecore/api/offstage/articles" + ,
    //     // url: host + "/eta/" + genre + "/" + pageNumber + "/" + pageLimit,
    //     // data: $.param(params),
    //     // cache: false,
    //     dataType: "json"
    // }).done(function(data){
    //     console.log(data);
    // }).fail(function(){
    //     // alert('Fail')
    // })


})



var filterComponent = (function($) {

    var context = {
        articles: [],
        filters: [],
        totalPages: 10,
        pageSize: 6,
        currPage: 1,
        $el: null
    }

    var initialize = function() {

        // bind all the event listeners
        $(".filter-item").click(function(e) {

            var category = $(e.currentTarget).data("category");
            context.category = category;

        })
    }

    var changeCategory = function() {

    }

    

    // DOM is ready and jQuery is loadedx
    $(function() {

        context.$el = $(".filter-component");

        var reqOne = $.ajax({

        })

        var reqTwo = $.ajax({

        })

        $.when(reqOne, reqTwo)
        .done(function(data) {
            context.articles = data[0].articles;
            context.filters = data[1];

            initialize();
        })
    })

    return {
        context
    }
})(jQuery);