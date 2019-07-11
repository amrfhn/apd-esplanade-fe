import VueLineClamp from 'vue-line-clamp';
import VueMatchHeights from 'vue-match-heights'

$(function () {
    Vue.use(VueLineClamp, {
        importCss: true
    })

    Vue.use(VueMatchHeights, {
        disabled: [768],
    });


    var data = {
        message: 'Hello Vue!',
        category: "eta",
        genre: "all",
        pageSize: 6,
        currPage: 1,
        filters: []
    }

    var params = {
        "browse": "",
        "contentType": "",
        "timeTaken": "",
        "sort": ""
    }


    var app = new Vue({
        el: '#tabs-filter',
        data: data,
        mounted: function () {
            this.fetchData();
            console.log("called api");
        },
        methods: {
            filterGenre: function (e) {
                var key = e;
                data.genre = key
                console.log(key);
                console.log(data.genre);

                
                $('.carousel-banner').hide();
                $('#'+key).show();

                this.fetchData();
            },
            fetchData: function () {
                var host = "http://dev.esplanade.growthopsapp.com";
                var url = host + "/sitecore/api/offstage/articles/" + this.category + '/' + this.genre + '/' + this.currPage + '/' + this.pageSize

                var _this = this

                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    data: $.param(params)
                }).done(function (data) {
                    console.log(data)
                    _this.filters = data
                    // console.log(data.filters[1].Title)
                })
            }
        }
    })

    //on click scroller arrow and initialize outer width func
    $('#goPrev').click(function () {
        $('.wrap').animate({ scrollLeft: '-=100' }, 200);
    });

    $('#goNext').click(function () {
        $('.wrap').animate({ scrollLeft: '+=100' }, 200);
    });

    $('#goBack').click(function () {
        $('.wrapper').animate({ scrollLeft: '-=100' }, 200);
    });

    $('#goAfter').click(function () {
        $('.wrapper').animate({ scrollLeft: '+=100' }, 200);
    });

    $('.wrapper').scroll(function(e){
        var genreScroll = $('.wrapper').scrollLeft();
        console.log('scroll', genreScroll);
        
        if($(this).scrollLeft() == 0){
            console.log('scroll');
            $('#goBack').css('display', 'none');
        } 
        if($(this).scrollLeft() > 0){
            console.log('scroll');
            $('#goBack').css('display', 'block');
        }
        if($(this).scrollLeft() == $('.wrapper').width()){
            console.log('scroll');
            $('#goAfter').css('display', 'none');
        }
    }) 

    // $(window).resize(function () {
    //     check_navigation_tabs();
    // });
    // check_navigation_tabs();

    

    //category tabs check outerwidth funct
    // function check_navigation_tabs() {
    //     var container_width = $(".wrap").width();
    //     var tabs_width = 0;

    //     var categoryLastLeft = 0;
    //     var $categoryListItem = $(".list-act");
    //     var $genreListItem = $(".genre-list");
    //     var lastScrollLeft = 0;


    //     $('#goBack').fadeOut();
    //     $('#goPrev').fadeOut();

    //     if ($categoryListItem.length <= 2) {
    //         $('#goPrev').css('display', 'none');
    //         $('#goNext').css('display', 'none');

    //     }

    //     if ($genreListItem.length <= 5) {
    //         $('#goAfter').css('display', 'none');

    //     }

})