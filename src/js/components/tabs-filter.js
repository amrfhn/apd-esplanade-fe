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
                data.genre = e
                console.log(e);
                console.log(data.genre);
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

    $(window).resize(function () {
        check_navigation_tabs();
    });
    check_navigation_tabs();

    //category tabs check outerwidth funct
    function check_navigation_tabs() {
        var container_width = $(".wrap").width();
        var tabs_width = 0;

        var container_width_genre = $(".wrapper").width();


        var $numberofListItem = $(".list-act")

        $('.nav-tabs li').each(function () {
            tabs_width += $(this).outerWidth();
        });

        if (tabs_width > container_width) {
            $('.nav button').fadeIn();
        } else {
            $('.nav button').fadeOut();
        }

        if (tabs_width > container_width_genre) {
            $('.nav button').fadeIn();
        } else {
            $('.nav button').fadeOut();
        }

        if ($numberofListItem.length <= 2) {
            $('#goPrev').css('display', 'none');
            $('#goNext').css('display', 'none');

        }
    }

})