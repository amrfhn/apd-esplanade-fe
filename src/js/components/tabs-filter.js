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
        filters: [],
        banners: [],
        genreSpecificBanners: []
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
            $('.carousel-banner').data('banners').forEach(function (item) {
                var genreSpecificBanners = [];
                
                item.forEach(function(itemArray) {
                    var contentPosition = "";
                    switch(itemArray.Content.ContentPosition)
                    {
                        case "top":
                            {
                                contentPosition = "pos-top";
                                break;
                            }
                        case "middle":
                            {
                                contentPosition = "pos-mid";
                                break;
                            }
                        case "bottom":
                            {
                                contentPosition = "pos-bot";
                                break;
                            }
                        default:
                            {
                                contentPosition = "pos-top";
                                break;
                            }
                    }
                    genreSpecificBanners.push({
                        "desktopImage": itemArray.ThumbnailDesktop,
                        "mobileImage": itemArray.ThumbnailMobile,
                        "title": itemArray.Content.Title,
                        "subTitle": itemArray.Content.SubTitle,
                        "pageUrl": itemArray.Content.LinkToPage,
                        "contentPosition": contentPosition,
                    })
                });

                data.banners.push({
                    "genre": item[0].Genre,
                    "banners": genreSpecificBanners
                })
            });
              
            this.loadBanner('all');
            this.fetchData();
            console.log("called api");
        },
        methods: {
            loadBanner: function (e) {
                var genreSpecificBanners = data.banners.find(function(element) {
                    return element.genre == e;
                });
                var banners = genreSpecificBanners != null ? genreSpecificBanners.banners : [];

                this.genreSpecificBanners = banners;

                console.log('banners', banners)
            },
            filterGenre: function (e) {
                var key = e;
                data.genre = key
                
                $('.carousel-banner').hide();
                $('#' + key).show();

                this.loadBanner(key);
                this.fetchData();
            },
            applyFilter: function () {
                var browse = [];
                $('.browse-by').find('input[type=checkbox]:checked').each(function(){
                    if ($(this).find('input[type=checkbox]:checked')){
                        browse.push($(this).data('key'));
                    }
                })
                params.browse = browse.join(',');


                var contentType = [];
                $('.content-types').find('input[type=checkbox]:checked').each(function(){
                    if ($(this).find('input[type=checkbox]:checked')){
                        contentType.push($(this).data('key'));
                    }
                })
                params.contentType = contentType.join(',');

                var timeTaken = [];
                $('.time-taken').find('input[type=checkbox]:checked').each(function(){
                    if ($(this).find('input[type=checkbox]:checked')){
                        timeTaken.push($(this).data('key'));
                    }
                })
                params.timeTaken = timeTaken.join(',');

                var $sortValue = $('[name="sort"]:checked').length>0? $('[name="sort"]:checked').val():"";

                params.sort = $sortValue;

                console.log(params.browse, params.contentType, params.timeTaken, params.sort);
                
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

                    jQuery.fn.hasScrollBar = function () {
                        return this.get(0).scrollWidth > this.innerWidth();
                    }
                    if (!$('.wrap').hasScrollBar()) {
                        $('#goPrev').css('display', 'none');
                        $('#goNext').css('display', 'none');
                        console.log($('.wrap').get(0).scrollWidth, $('.wrap').innerWidth())
                    }
                    // hideMainCategoryArrow()
                    // console.log(data.filters[1].Title)

                

                })
            }
        }
    })
    var $filterContainer = $('.tab-filter');

    if ($filterContainer.length > 0) {
        $(document).on('scroll', function () {

            let filterScrollPos = $(this).scrollTop();

            if (filterScrollPos > ($filterContainer.offset().top)) {
                $('.filter-bar').addClass("stick");
            } else {
                $('.filter-bar').removeClass("stick");
            }

        });
    }

    //category on click scroller arrow and initialize outer width func
    $('#goPrev').on('click', function () {
        $('.wrap').animate({ scrollLeft: '-=100' }, 200);
    });

    $('#goNext').on('click', function () {
        $('.wrap').animate({ scrollLeft: '+=100' }, 200);
    });

    $('#goBack').on('click', function () {
        $('.wrapper').animate({ scrollLeft: '-=100' }, 200);
    });

    $('#goAfter').on('click', function () {
        $('.wrapper').animate({ scrollLeft: '+=100' }, 200);
    });

    //genre on click scroller
    var scrollLeftPrev = 0;
    var catScrollLeftPrev = 0;

    jQuery.fn.hasHScrollBar = function () {
        return this.get(0).scrollWidth > this.innerWidth();
    }
    if (!$('.wrapper').hasHScrollBar()) {
        $('#goBack').css('display', 'none');
        $('#goAfter').css('display', 'none');
    }

    $(function hideMainCategoryArrow() {
        
    })



    $('.wrapper').on('scroll', function (e) {
        var genreScroll = $('.wrapper').scrollLeft();
        var $goBack = $('#goBack')

        if ($(this).scrollLeft() == 0) {
            $goBack.toggleClass('show-arrow');
        }
        if ($(this).scrollLeft() > 0) {
            $goBack.addClass('show-arrow');
        }

        var $elem = $('.wrapper');
        var newScrollLeft = $elem.scrollLeft(),
            width = $elem.width(),
            scrollWidth = $elem.get(0).scrollWidth
        var offset = 8;

        if (scrollWidth - newScrollLeft - width == offset) {
            $('#goBack').addClass('show-arrow');
        }
        if (newScrollLeft === 0) {
            $('#goAfter').addClass('show-arrow');
        }

        scrollLeftPrev = newScrollLeft;
    })

    $('.wrap').on('scroll', function (event) {

        var $category = $('.wrap');
        var catScrollLeft = $category.scrollLeft(),
            catWidth = $category.width(),
            catScrollWidth = $category.get(0).catScrollWidth
        var catOffset = 8;

        if ($(this).scrollLeft() === 0) {
            $('#goPrev').toggleClass('arrow');
        }
        if ($(this).scrollLeft() >= 1) {
            $('#goPrev').addClass('arrow');
        } 

        console.log($(this).scrollLeft())
        if (catScrollWidth - catScrollLeft - catWidth == catOffset) {
            $('#goPrev').addClass('arrow');
        }
        

        catScrollLeftPrev = catScrollLeft;
    })



})