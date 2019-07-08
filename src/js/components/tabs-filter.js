$(function () {
    const VueLineClamp = window['vue-line-clamp'];

    Vue.use(VueLineClamp, {
        importCss: true
    })

    var data = {
        message: 'Hello Vue!',
        category: "eta",
        genre: "all",
        pageSize: 6,
        currPage: 1,
        // genres: [
        //     { name:'All', key:'all', selected: 'true'},
        //     { name:'MUSIC', key:'music', selected: 'false'},
        //     { name:'DANCE', key:'dance', selected: 'false'},
        //     { name:'THEATRE', key:'theatre', selected: 'false'},
        //     { name:'VISUAL ARTS', key:'visualarts', selected: 'false'},
        //     { name:'LITERARY ARTS', key:'literaryarts', selected: 'false'},
        // ],
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

        if ($numberofListItem.length <= 2){
            $('#goPrev').css('display', 'none');
            $('#goNext').css('display', 'none');

        }
    }

})