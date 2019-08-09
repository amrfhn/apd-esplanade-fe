import VueLineClamp from 'vue-line-clamp';

$(function () {
    'use strict';
    if ($('#tabs-filter').length > 0) {
        Vue.use(VueLineClamp, {
            importCss: true
        })

        var xs = window.matchMedia('(max-width: 768px)');
        var md = window.matchMedia('(min-width: 769px)');

        // var host = window.location.origin
        // var host =  window.location.protocol + "//" + window.location.hostname;
        // var host = 'http://dev.esplanade.growthopsapp.com/';
        var host = '';
        var currUrl = window.location.href;

        var data = {
            message: 'Hello Vue!',
            content: "",
            category: "",
            genre: "all",
            pageSize: 6,
            currPage: 1,
            loadPage: 1,
            filters: [],
            banners: [],
            totalBanners: 0,
            reqPageNum: "",
            fetchingData: false,
            articles: [],
            keyMapping: []
        }

        var params = {
            "browse": "",
            "contentType": "",
            "timeTaken": "",
            "sort": ""
        }
        var currUrlParams = {
            "category": "",
            "genre": ""
        }
        var url = new URL(currUrl);
        var query_string = url.search;
        var searchParams = new URLSearchParams(query_string);

        var app = new Vue({
            el: '#tabs-filter',
            data: data,
            mounted: function () {
                var _this = this;
                this.checkMetatUrl();
                // this.fetchData();
                this.clamptext();
                console.log("called api");
                this.checkScroll();
                this.checkActiveGenre();
                // this.checkMenuGenre();
                // this.setKeyMapping();

                // Initialise data
                this.content = $('main').attr('data-content');
                this.category = $('.category-tabs-wrapper li:first-child a').attr('id');

                $('.mm-content a.filter').click(function () {
                    var dataKey = $(this).attr('data-key');

                    event.preventDefault();

                    $('.custom-checkkbox .custom-control-input ').prop('checked', false);
                    $('.custom-checkkbox [data-key=' + dataKey + '] ').prop('checked', true);
                    $('.mm-wrapper').removeClass('active');
                    $('.submit-filter').click();

                });

                $('a.nav-link.megamenu-genre').on('click', function () {
                    if (!$(this).parent().hasClass('active')) {
                        $('.mm-content-item').find('.nav-item').removeClass('active');
                        $(this).parent().addClass('active');

                        var dataKey = $(this).data('key');
                        $('.genre-tabs.nav').find('#' + dataKey).click();

                        _this.filterGenre(dataKey);
                        _this.checkActiveGenre();
                        $('.genre-tabs .wrapper').animate({
                            scrollLeft: $('.genre-tabs .active').position().left - $('#goBack').outerWidth()
                        }, 2000);
                    }
                })

                if (currUrl.indexOf('genre') > -1 || currUrl.indexOf('category') > -1){
                    var genreValue = url.searchParams.get('genre') || 'all';
                    $('.genre-tabs.nav').find('#'+genreValue).click();
                    _this.filterGenre(genreValue);
                    $('.genre-tabs .wrapper').animate({
                        scrollLeft: $('.genre-tabs .active').position().left - $('#goBack').outerWidth()
                    }, 2000); 

                } else {
                    this.fetchData();
                }
            },
            updated: function () {
                var _this = this;

                _this.bgSwitcher();
                _this.clamptext();

                _this.bannerCount = data.banners.length;

                if (_this.bannerCount > 1) {
                    _this.slick();
                    $('.banner-content').find('.banner-navigation').css('display', 'flex');
                } else {
                    $('.banner-content').find('.banner-navigation').css('display', 'none');
                }

                //hide loading screen
                $('.loading-screen').fadeOut(1000);
                setTimeout(function () { $('body').removeClass('overflow-hidden'); }, 1000);

                $('.card-body').matchHeight();
            },
            methods: {
                checkMetatUrl: function () {

                    let metaUrl = $('meta');
                    
                    for (let i = 0, lengthMeta=metaUrl.length; i < lengthMeta; i++){
                        if ($(metaUrl[i]).attr('property') == 'site_domain' && currUrl.indexOf('localhost') === -1){
                            // console.log()
                            var currDomain = $(metaUrl[i]).attr('content');
                            host = currDomain;
                            console.log('current Host from meta:',host)
                        } else {
                            host = 'http://dev.esplanade.growthopsapp.com';
                        }
                    }

                },
                checkActiveGenre: function () {

                    var genre = $('.genre-list').find('.nav-link');

                    genre.on('click', function () {
                        // var separator = (window.location.href.indexOf("?") === -1) ? "?" : "&";
                        let genreId = $(this).attr('id');
                        currUrlParams.genre = genreId;

                        if (currUrl.indexOf("genre") < -1) {
                            // currUrl += separator+"genre=" + currUrlParams.genre;
                            searchParams.append('genre', currUrlParams.genre)
                            searchParams.sort();
                            url.search = searchParams.toString();
                            var newUrl = url.toString();
                        } else {
                            searchParams.delete('genre');
                            searchParams.append('genre', currUrlParams.genre)
                            searchParams.sort();
                            url.search = searchParams.toString();
                            var newUrl = url.toString();
                        }

                        $('.mm-content-item').find('.megamenu-genre').parent().removeClass('active');
                        var megaMenuItem = $('.mm-content-item').find('.megamenu-genre');

                        for (var i = 0, len = megaMenuItem.length; i < len; i++) {
                            if($(megaMenuItem[i]).attr('data-key') == currUrlParams.genre){
                                $(megaMenuItem[i]).parent().addClass('active')
                            }
                        }
                        //append params on current url
                        window.history.pushState({ path: currUrl }, '', newUrl);
                    });

                    var mainCategory = $('.tab-sliders').find('.nav-link');

                    mainCategory.on('click', function () {
                        let categoryId = $(this).attr('id');
                        currUrlParams.category = categoryId;

                        if(currUrl.indexOf('category') < -1){
                            searchParams.append('category', currUrlParams.category);
                            searchParams.sort();
                            url.search = searchParams.toString();
                            var newUrl = url.toString();
                        } else {
                            searchParams.delete('category');
                            searchParams.append('category', currUrlParams.category);
                            searchParams.sort();
                            url.search = searchParams.toString();
                            var newUrl = url.toString();
                        }
                        //append params on current url
                        window.history.pushState({ path: newUrl }, '', newUrl);
                    })

                },

                checkScroll: function (e) {
                    window.onscroll = () => {
                        var bottomOfWindow = $(window).scrollTop() + $(window).height() > $(document).height() - 100;
                        if ($(".tab-content").length>0 && bottomOfWindow && !this.fetchingData) {
                            document.getElementById('spinner').style.display = "block";
                            this.updateData();
                        }
                    }
                },
                updateData: function (data) {
                    var offset = 0;

                    if (xs.matches) {
                        offset = 3;
                        this.loadPage += 1;
                        console.log("mobile")
                    }
                    if (md.matches) {
                        offset = 6
                        this.loadPage += 1;
                        console.log("desktop")
                    }

                    var updateUrl = host + "/sitecore/api/offstage/articles/" + this.content + '/' + this.category + '/' + this.genre + '/' + this.loadPage + '/' + offset;
                    var _this = this;

                    console.log(updateUrl);

                    this.fetchingData = true;

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
                        _this.fetchingData = false;
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
                filterCategory: function (id) {
                    console.log('click category')
                    this.category = id;
                    // change genre filter
                    $('.genre-tabs').addClass('d-none');
                    $('#genre-tabs-'+ id).removeClass('d-none').addClass('.d-block');
                    // change side filter 
                    $('.filter-menu-content').addClass('d-none');
                    $('#filter-menu-content-'+ id).removeClass('d-none').addClass('.d-block');
                    this.resetGenre();
                    // reset all side filter checkboxes and radios
                    $('.filter-menu-content [type="radio"], .filter-menu-content [type="checkbox"]').prop('checked', false);
                },
                resetGenre: function () {
                    $('.genre-tabs').each(function () {
                        $(this).find('.nav-link').removeClass('active');
                    }).find('#all').addClass('active')

                    this.filterGenre('all');
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
                        $('.filter-icon').attr('src', '/assets/microsites/offstage/img/icons/Filter_with_text.svg')
                    }

                },
                fetchData: function () {

                    var url = host + "/sitecore/api/offstage/articles/" + this.content + '/' + this.category + '/' + this.genre + '/' + this.currPage + '/' + this.pageSize;
                    var _this = this;

                    //show loading screen
                    $('body').addClass('overflow-hidden');
                    $('.loading-screen').fadeIn(1000);

                    var request = $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        data: decodeURIComponent($.param(params))
                    }).done(function (data) {

                        _this.banners = data.Banner.Banners
                        _this.totalBanners = data.Banner.Total
                        _this.filters = data.Articles
                        
                        data.filters = data.Articles
                        var cardContainer = $('.tab-content').find('.card-tile')
                        
                        if(data.filters.length < 1){
                            var getMessage = cardContainer.attr('data-no-result-message');
                            cardContainer.children().html(getMessage)
                        }

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

                        //
                        $('#hamb').on('click', function () {
                            $('.mm-wrapper').addClass('active');
                            $('.in-between-screen').addClass('active');

                        })

                        $('.close-btn-x').on('click', function () {
                            $('.mm-wrapper').removeClass('active');
                            $('.in-between-screen').removeClass('active');
                            $('body').removeClass('set-fixed');
                        })

                        var $megaMenu = $('.mm-wrapper');

                        if ($megaMenu.hasClass('active')) {
                            console.log("active")
                            $('body').addClass('set-fixed');

                        }

                        $('#searchBar').modal({
                            backdrop: false,
                            show: false,
                            focus: false
                        });

                        $(document).scroll(function () {
                            var $nav = $(".nav");

                            var $navTabs = $('.left-wrapper');

                            if ($nav.hasClass('back')) {
                                $navTabs.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
                            }
                        });


                        var $btnSearch = $('#btnSearch');
                        var $closeSearch = $('#closeSearch');


                        $btnSearch.on('click', function () {
                            $('#searchBar').addClass('active');
                            $('.in-between-screen').addClass('active');
                        })
                        $closeSearch.on('click', function () {
                            $('#searchBar').removeClass('active');
                            console.log('closeeeeeee!')
                            $('.search').css('width', 0);
                        })

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
        $('.close-btn-x').on('click', function () {
            $('.mm-wrapper').removeClass('active');
            $('.in-between-screen').removeClass('active');

        })

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

            // var lastScrollTop = 0;
            // var $footer = $('footer .container-fluid')
            // $(window).scroll(function (event) {
            //     var st = $(this).scrollTop();
            //     if (st > lastScrollTop) {
            //         // downscroll code
            //         console.log('scroll down'); 
            //         $footer.addClass('sticky-footer-mobile')
            //     } else {
            //         // upscroll code
            //         console.log('scroll up');
            //         $footer.removeClass('sticky-footer-mobile')
            //     }
            //     lastScrollTop = st;
            // });

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
            if ($('.wrap').scrollLeft() > maxScrollLeft) {
                console.log("tamat")
                $('#goNext').addClass('d-none');
                $('#goNext').removeClass('d-block');
            }
            if ($('.wrap').scrollLeft() < maxScrollLeft) {
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
            if ($('.wrapper').scrollLeft() > maxScrollLeft) {
                console.log("tamat")
                $('#goAfter').addClass('d-none');
                $('#goAfter').removeClass('d-block');
            }
            if ($('.wrapper').scrollLeft() < maxScrollLeft) {
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

        });
    }
});