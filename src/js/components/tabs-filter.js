import VueLineClamp from 'vue-line-clamp';
import VueMatchHeights from 'vue-match-heights'

$(function () {
    Vue.use(VueLineClamp, {
        importCss: true
    })

    Vue.use(VueMatchHeights, {
        disabled: [768],
    });

    Vue.use(InfiniteLoading, {
        /* options */
    });

    var host = "http://dev.esplanade.growthopsapp.com"

    var data = {
        message: 'Hello Vue!',
        category: "eta",
        genre: "all",
        pageSize: 6,
        currPage: 1,
        filters: [],
        banners: [],
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
        updated: function () {
            var _this = this;
            //setTimeout(function(){ _this.slick(); }, 3000); 

            // _this.slick("unslick").slick();
            _this.bgSwitcher();
            _this.clamptext();

            if ($('.banner-bg').length) {
                _this.slick();
            }
        },
        methods: {
            
            checkScroll: function (e) {
                // console.log(checkScroll("#product-catalogue .column-control.type-g .col:last"))
                // console.log(scrPrevPosition)
                if($(window).scrollTop() + $(window).height() == $(document).height() && $(document).find('.tab-content .card:last-child')) {
                    alert("bottom!");
                }
            },
            updateData: function (data) {

                // function updateData(data){
                var arr = data
                const tmp = `${arr.map(item => `
                    <div class="col-12 col-md-6 card-tile px-2 pb-4"><div class="card"><a href="${item.Url}" class="position-relative"><div class="position-absolute w-100"><div class="icon-holder bg-white d-flex float-right align-items-center justify-content-center m-3"><img src="/offstage/-/media/Offstage Microsite/Youtube.svg?mw=1920&amp;hash=23ABDC098ACB922A164377ED7549134E19C14239" alt="" class="icon"></div></div> <img src="/offstage/-/media/Offstage Microsite/Tests/bloom-blossom-close-up-36764.jpg?mw=1920&amp;hash=519DE4A445CDAEC948EBD0BB775A0CF285C06618" class="card-img-top"> <div class="border border-top-0 text-left position-relative"><span class="card-label p-1 px-3 bg-primary text-white font-12 text-uppercase position-absolute">Watch</span> <div class="card-body text-center pt-5" style="height: 184px;"><div><span class="genre-title px-2 card-text font-16 font-weight-bold text-uppercase">Dance</span><span class="genre-title px-2 card-text font-16 font-weight-bold text-uppercase">Theatre</span></div> <div class="card-title text-primary m-0"><h5 class="font-weight-bolder m-0 font-22 vue-line-clamp" style="-webkit-line-clamp: 3;">Zhi wei</h5></div> <p class="card-text font-18 vue-line-clamp" style="-webkit-line-clamp: 2;">Zhi wei</p></div></div></a></div></div>
                `)}`

                return tmp
                // }
            },
            // appendData: function () {
            //     let tabContent = $('.tab-content')
            //     tab.Content.append(updateData())
            // },
            bgSwitcher: function () {
                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                $('.banner-bg').each(function () {

                    var carouselMobileImage = $(this).attr('data-mobile-image')
                    var carouselDesktopImage = $(this).attr('data-desktop-image')

                    if (width <= 768) {
                        if (carouselMobileImage !== "") {
                            $(this).css('background-image', 'url("' + carouselMobileImage + '")')
                        } else {
                            $(this).css('background-image', 'url("' + carouselDesktopImage + '")')
                        }

                    }
                    if (width > 768) {
                        $(this).css('background-image', 'url("' + carouselDesktopImage + '")')
                    }
                });
            },
            slick: function (e) {
                $('.carousel-banner').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

                    var i = (currentSlide ? currentSlide : 0) + 1;

                    $(this).find('.slide-count-wrap').text('0' + i + '/' + '0' + slick.slideCount);

                });

                if ($(this).find('.banner-bg').length < 2) {
                    $(this).find('.slide-count-wrap').hide();
                }
                $('.carousel-banner').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: 1500,
                    dots: false,
                    focusOnSelect: true,
                    arrows: true,
                    prevArrow: $('.prev-slide'),
                    nextArrow: $('.next-slide')
                });


            },
            clamptext: function () {
                let item = $("*[class*='clamp-']")
                for (var i = 1, len = $(item).length; i < len; i++) {
                    Ellipsis({
                        className: '.clamp-' + i,
                        break_word: false,
                        lines: i,
                        responsive: true
                    });
                }
            },
            filterGenre: function (e) {
                var key = e;
                data.genre = key

                $('#' + key).show();

                this.fetchData();
            },
            applyFilter: function () {
                var browse = [];
                $('.browse-by').find('input[type=checkbox]:checked').each(function () {
                    if ($(this).find('input[type=checkbox]:checked')) {
                        browse.push($(this).data('key'));
                    }
                })
                params.browse = browse.join(',');


                var contentType = [];
                $('.content-types').find('input[type=checkbox]:checked').each(function () {
                    if ($(this).find('input[type=checkbox]:checked')) {
                        contentType.push($(this).data('key'));
                    }
                })
                params.contentType = contentType.join(',');

                var timeTaken = [];
                $('.time-taken').find('input[type=checkbox]:checked').each(function () {
                    if ($(this).find('input[type=checkbox]:checked')) {
                        timeTaken.push($(this).data('key'));
                    }
                })
                params.timeTaken = timeTaken.join(',');

                var $sortValue = $('[name="sort"]:checked').length > 0 ? $('[name="sort"]:checked').val() : "";

                params.sort = $sortValue;

                console.log(params.browse, params.contentType, params.timeTaken, params.sort);

                this.fetchData();
            },
            fetchData: function () {

                var url = host + "/sitecore/api/offstage/articles/" + this.category + '/' + this.genre + '/' + this.currPage + '/' + this.pageSize
                console.log(url)
                var _this = this

                var request = $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    data: $.param(params)
                }).done(function (data) {
                    console.log(data)


                    _this.banners = data.Banners
                    _this.filters = data.Articles


                    jQuery.fn.hasScrollBar = function () {
                        return this.get(0).scrollWidth > this.innerWidth();
                    }
                    if (!$('.wrap').hasScrollBar()) {
                        $('#goPrev').css('display', 'none');
                        $('#goNext').css('display', 'none');
                        console.log($('.wrap').get(0).scrollWidth, $('.wrap').innerWidth())
                    }
                    if ($('.carousel-banner').hasClass('slick-initialized')) {
                        $('.carousel-banner').slick('unslick');
                    }
                })
            },

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
<div class="parent">

//page 1
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>

</div>


var curPageNum = $('.parent').find('li').length // 18
var reqPageNum = number(curPagenum / 6) + 1 // 3 = 4(this for backend)