import VueLineClamp from 'vue-line-clamp';
import VueMatchHeights from 'vue-match-heights'

$(function () {
    'use strict'

    Vue.use(VueLineClamp, {
        importCss: true
    })

    Vue.use(VueMatchHeights, {
        disabled: [768],
    });

    var xs = window.matchMedia('(max-width: 768px)');
    var md = window.matchMedia('(min-width: 769px)');

    //var host = "http://dev.esplanade.growthopsapp.com"
    var host =  window.location.protocol + "//" + window.location.hostname;

    var data = {
        message: 'Hello Vue!',
        category: "eta",
        genre: "all",
        pageSize: 6,
        currPage: 1,
        loadPage: 1,
        filters: [],
        banners: [],
        totalBanners: 0,
        reqPageNum: "",
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
            this.clamptext();
            console.log("called api");
            this.checkScroll();
            this.checkActiveGenre();
            // this.checkMenuGenre();
        },
        updated: function () {
            var _this = this;
            //setTimeout(function(){ _this.slick(); }, 3000); 

            // _this.slick("unslick").slick();
            _this.bgSwitcher();
            _this.clamptext();

            _this.bannerCount = data.banners.length;

            if (_this.bannerCount > 1) {
                _this.slick();
                $('.banner-content').find('.banner-navigation').css('display', 'flex');
            } else {
                $('.banner-content').find('.banner-navigation').css('display', 'none');
            }

            

        },
        methods: {

            checkMenuGenre: function(){
                
            },

            checkActiveGenre: function () {

                var genre = $('.genre-list').find('.nav-link');


                genre.on('click', function () {
                    console.log("asdasdas");
                    let genreId = $(this).attr('id');
                    sessionStorage.setItem('genreId', genreId);
                });

                var category = $('#menus').find('a.active');

                var categoryId = category.attr('id');

                var sessionCatId = sessionStorage.getItem('mainCategoryId');

                if (sessionCatId == null || sessionCatId != categoryId)
                {
                    sessionStorage.setItem('mainCategoryId', categoryId);
                }
                var sessionGenreId = sessionStorage.getItem('genreId');

                if (sessionGenreId != null){
                    $('#genreTabs').find('#'+sessionGenreId).click();
                }

            },

            checkScroll: function (e) {

                window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

                    if (bottomOfWindow && ($(".tab-content")[0])) {
                        this.scrolledToBottom = true
                        document.getElementById('spinner').style.display = "block";
                        this.updateData();
                    }
                }
            },
            updateData: function (data) {
                var offset = 0;

                if (xs.matches) {
                    offset = 3;
                    this.loadPage += 1
                    console.log("mobile")
                }
                if (md.matches) {
                    offset = 6
                    this.loadPage += 1
                    console.log("desktop")
                }

                var updateUrl = host + "/sitecore/api/offstage/articles/" + this.category + '/' + this.genre + '/' + this.loadPage + '/' + offset
                var _this = this

                console.log(updateUrl)

                var requestData = $.ajax({
                    type: "GET",
                    url: updateUrl,
                    dataType: "json",
                    data: $.param(params)
                }).done(function (data) {
                    console.log(data)
                    _this.filters = _this.filters.concat(data.Articles)
                    if (data.Articles.length < offset || data.Articles.length == 0) {
                        document.getElementById('spinner').style.display = "none";
                        window.onscroll = () => { }
                    }
                })
            },
            bgSwitcher: function () {
                var _this = this;
                var bannerIndex = 0;

                $('.banner-bg').each(function () {

                    var carouselMobileImage = $(this).attr('data-mobile-image')
                    var carouselDesktopImage = $(this).attr('data-desktop-image')

                    if (xs.matches) {
                        if (carouselMobileImage !== "") {
                            $(this).css('background-image', 'url("' + carouselMobileImage + '")')
                        } else {
                            $(this).css('background-image', 'url("' + carouselDesktopImage + '")')
                        }

                    }
                    if (md.matches) {
                        $(this).css('background-image', 'url("' + carouselDesktopImage + '")')
                    }



                    _this.contentColor = data.banners[bannerIndex].Content.Colour

                    if (_this.contentColor == '#000000') {
                        $(this).find('.banner-content').find('.btn-carousel').removeClass('btn-outline-light').addClass('btn-outline-primary');
                        $(this).find('.banner-content').find('.cust-icon').removeClass('arrow-light').addClass('arrow-black');
                    } else {
                        $(this).find('.banner-content').find('.btn-carousel').removeClass('btn-outline-primary').addClass('btn-outline-light');
                        $(this).find('.banner-content').find('.cust-icon').removeClass('arrow-black').addClass('arrow-light');
                    }
                    bannerIndex++;
                });

            },
            slick: function (e) {
                // $('.carousel-banner').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

                //     var i = (currentSlide ? currentSlide : 0) + 1;

                //     $(this).find('.slide-count-wrap').text('0' + i + '/' + '0' + slick.slideCount);

                // });

                $('.carousel-banner').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: 5000,
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
                    let line = $($(item)[i]).attr('data-clamp');
                    Ellipsis({
                        className: '.clamp-' + line,
                        break_word: true,
                        lines: line,
                        responsive: true
                    });
                }
            },
            filterGenre: function (e) {
                var key = e;
                data.genre = key;

                // $('#' + key).show();
                this.currPage = 1;
                this.loadPage = 1;

                

                document.getElementById('spinner').style.display = "none";

                this.checkScroll();
                this.fetchData();
            },
            applyFilter: function () {
                var _this = this;
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

                this.currPage = 1;
                this.loadPage = 1;

                document.getElementById('spinner').style.display = "none";
                _this.checkScroll();
                _this.fetchData();

                if (browse.length >= 1 || contentType.length >= 1 || timeTaken.length >= 1 || $sortValue.length >= 1) {
                    $('.filter-icon').attr('src', '/assets/microsites/offstage/img/icons/FilterWithNotifications.svg')
                } else {
                    $('.filter-icon').attr('src', '/assets/microsites/offstage/img/icons/Filter.svg')
                }

            },
            fetchData: function () {

                var url = host + "/sitecore/api/offstage/articles/" + this.category + '/' + this.genre + '/' + this.currPage + '/' + this.pageSize
                var _this = this

                var request = $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    data: decodeURIComponent($.param(params))
                }).done(function (data) {

                    _this.banners = data.Banner.Banners
                    _this.totalBanners = data.Banner.Total
                    _this.filters = data.Articles

                    jQuery.fn.hasScrollBar = function () {
                        return this.get(0).scrollWidth > this.innerWidth();
                    }
                    if ($('.wrap').length >= 1) {

                        if (!$('.wrap').hasScrollBar()) {
                            $('#goPrev').css('display', 'none');
                            $('#goNext').css('display', 'none');
                            console.log($('.wrap').get(0).scrollWidth, $('.wrap').innerWidth())
                        }
                    }

                    if ($('.carousel-banner').hasClass('slick-initialized')) {
                        $('.carousel-banner').slick('unslick');
                    }
                    _this.clamptext();

                    
                })
            },

        }
    })

    var $filterContainer = $('#tabs-filter');
    if ($filterContainer.length > 0) {
        $(document).on('scroll', function () {
            let filterScrollPos = $(this).scrollTop();
            if (filterScrollPos > ($filterContainer.offset().top)) {
                //$('.filter-bar').addClass("stick");
            } else {
                //$('.filter-bar').removeClass("stick");
            }
        });
    }

    //only for mobile sticky
    if ($(window).width() < 960) {
        $('.filter-bar').removeClass("stick");
        let mobileHeight = $(document).height() + 50;
        $(document).on('scroll', function () {
            let filterScrollPos = $(this).scrollTop();
            if (filterScrollPos >= mobileHeight) {
                $('.filter-bar').addClass("stick");
                //$('.tabfil-container').addClass("bar-height");
                $('.tab-content .bar-height').css("height", "150px");
            } else {
                $('.filter-bar').removeClass("stick");
                //$('.filter-bar').removeClass("bar-height");
                $('.tab-content .bar-height').css("height", "0px");
            }
        });

        $(".filter").click(function () {
            //console.log("aaaa", $(".tabfil-container").offset().top)
            // $('.tabfil-container').scrollTop( 0 );

            if ($('.filter-bar').hasClass("stick")) {
                console.log("do nothing");
            } else {
                $('html, body').animate({
                    scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
                }, 360, function () {
                    $('.filter-bar').addClass("stick");
                });
            }

        });

    } else {
        //  alert('More than 960');
    }


    //category on click scroller arrow and initialize outer width func
    $('#goPrev').on('click', function () {
        $('.wrap').animate({
            scrollLeft: '-=100'
        }, 200);
        $('#goNext').addClass('d-block');
        $('#goNext').removeClass('d-none');
    });

    $('#goNext').on('click', function () {
        $('.wrap').animate({
            scrollLeft: '+=90'
        }, 200);
        var maxScrollLeft = $('.wrap').get(0).scrollWidth - $('.wrap').get(0).clientWidth - 100;
        // let wrapperWidth = $('.wrapper').width();
        if($('.wrap').scrollLeft() > maxScrollLeft){
            console.log("tamat")
            $('#goNext').addClass('d-none');
            $('#goNext').removeClass('d-block');
        } 
        if($('.wrap').scrollLeft() < maxScrollLeft){
            $('#goNext').addClass('d-block');
            $('#goNext').removeClass('d-none');
        }
    });


    $('#goBack').on('click', function () {
        $('.wrapper').animate({
            scrollLeft: '-=100'
        }, 200);
        $('#goAfter').addClass('d-block');
        $('#goAfter').removeClass('d-none');
    });

    $('#goAfter').on('click', function () {
        $('.wrapper').animate({
            scrollLeft: '+=90'
        }, 200);
        var maxScrollLeft = $('.wrapper').get(0).scrollWidth - $('.wrapper').get(0).clientWidth - 100;
        // let wrapperWidth = $('.wrapper').width();
        if($('.wrapper').scrollLeft() > maxScrollLeft){
            console.log("tamat")
            $('#goAfter').addClass('d-none');
            $('#goAfter').removeClass('d-block');
        } 
        if($('.wrapper').scrollLeft() < maxScrollLeft){
            $('#goAfter').addClass('d-block');
            $('#goAfter').removeClass('d-none');
        }
    });

    //genre on click scroller
    var scrollLeftPrev = 0;
    var catScrollLeftPrev = 0;


    jQuery.fn.hasHScrollBar = function () {
        return this.get(0).scrollWidth > this.innerWidth();
    }

    if ($('.wrapper').length >= 1) {
        if (!$('.wrapper').hasHScrollBar()) {
            $('#goBack').css('display', 'none');
            $('#goAfter').css('display', 'none');
        }

        
    }



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