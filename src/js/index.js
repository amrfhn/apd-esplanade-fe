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

})



var filterComponent = (function($) {

    var context = {
        articles: [],
        filters: [],
        totalPages: 10,
        pageSize: 10,
        currPage: 1,
        params: [],
        $el: null
    }

    var initialize = function() {
    
        

        // bind all the event listeners
        $(".filter-item").click(function(e) {

            var category = $(e.currentTarget).data("category");
            context.category = category;

        })
        $(".filter-genre").click(function(e) {

            var genre = $(e.currentTarget).data("key");
            context.filters.genre = genre;
            console.log("fire")
            fireApi();
        })
    }

    var fireApi = function() {
        var host = "http://dev.esplanade.growthopsapp.com/sitecore/api/offstage/articles";


        $.ajax({
            type: "GET",
            // url: local,
            url: host + "/eta/" + context.filters.genre + "/" + context.currPage + "/" + context.pageSize,
            data: $.param(context.params),
            // cache: false,
            dataType: "json"
        }).done(function(data){
            console.log(data);
        }).fail(function(){
            console.log("fail")
        })
    }

    

    // DOM is ready and jQuery is loaded
    $(function() {
        var params = {
            "browse": "ddygsyfs",
            "contentType": "uydsgfysgfys",
            "timeTaken": "ssfgsdyfg",
            "sort": "trending"
        }

        var filter = {
            "genre": "all",
            "pageNumber": "1",
            "pageLimit": "10"
        }
    
        // console.log($.param(params))
        var host = "http://dev.esplanade.growthopsapp.com/sitecore/api/offstage/articles";
        var local = "./assets/microsites/offstage/data/sample.json"

        context.$el = $(".filter-component");

        var reqOne = $.ajax({
            type: "GET",
            // url: local,
            url: host + "/eta/" + filter.genre + "/" + filter.pageNumber + "/" + filter.pageLimit,
            data: $.param(params),
            // cache: false,
            dataType: "json"
        }).done(function(data){
            console.log(data);
        }).fail(function(){
            console.log("fail")
        })



        // var reqTwo = $.ajax({

        // })

        $.when(reqOne)
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