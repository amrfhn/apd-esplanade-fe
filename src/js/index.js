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




// var filterComponent = (function($) {

//     var context = {
//         articles: [],
//         filters: [],
//         totalPages: 10,
//         category: "eta",
//         genre: "all",
//         pageSize: 6,
//         currPage: 1,
//         $el: null
//     }

//     var params = {
//         "browse": "",
//         "contentType": "",
//         "timeTaken": "",
//         "sort": ""
//     }
    

//     var initialize = function() {

//         // bind all the event listeners
//         $(".nav-link").on("click", function(e) {
//             alert('click')
//             var category = $(e.currentTarget).data("category");
//             context.category = category;

//             console.log(category)
//             fetchData();
//         })

//         $(".pn-ProductNav_Link").on("click", function(e) {
//             var genre = $(e.currentTarget).data("key");
//             context.genre = genre;

//             console.log(genre)
//             fetchData();
//         })
        
//     }

//     var changeCategory = function() {

//     }

//     function fetchData(){
//         var host = "http://dev.esplanade.growthopsapp.com";
//         var url = host + "/sitecore/api/offstage/articles/" + context.category + '/' + context.genre + '/' + context.currPage + '/' + context.pageSize

//         $.ajax({
//             type: "GET",
//             url: url,
//             dataType: "json",
//             data: $.param(params),
//         }).done(function(data) {
//             // context.articles = data[0].articles;
//             // context.filters = data[1];
//             console.log(data)
//             console.log(context.$el)
//             if (data.length > 0) {
//                 for(var i=0; i < data.length; i++){
//                     params.browse = data[i].BrowseById
//                     params.contentType = data[i].ContentTypeById
//                     params.timeTaken = data[i].TimeTakenById
//                     params.sort = data[i].PublishDate                    
//                 }
//             }

//             console.log(params)
            
//         })
//     }
    

//     // DOM is ready and jQuery is loadedx
//     $(function() {

//         context.$el = $(".genre-tabs-container");
//         initialize();
//         fetchData();

//         // var reqOne = $.ajax({
//         //     type: "GET",
//         //     url: url,
//         //     dataType: "json",
//         //     data: $.param(params),
//         // })

//         // var reqTwo = $.ajax({

//         // })

//         // $.when(reqOne, reqTwo)
//         // .done(function(data) {
//         //     // context.articles = data[0].articles;
//         //     // context.filters = data[1];
//         //     console.log(data[0][0])
//         //     console.log(context.$el)

//         //     params.browse = data[0][0].BrowseById
//         //     params.contentType = data[0][0].ContentTypeById
//         //     params.timeTaken = data[0][0].TimeTakenById
//         //     params.sort = data[0][0].PublishDate
//         //     console.log(params)
//         //     initialize();
//         // })
//     })

//     return {
//         context
//     }
// })(jQuery);