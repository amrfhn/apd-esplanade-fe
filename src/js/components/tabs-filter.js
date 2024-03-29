// import VueLineClamp from 'vue-line-clamp';
import URL from 'core-js/features/url'
import URLSearchParams from 'core-js/features/url-search-params'


$(function () {
    'use strict';

    if ($('#tabs-filter').length > 0) {
        // Vue.use(VueLineClamp, {
        //     importCss: true
        // })

        // var xs = window.matchMedia('(max-width: 768px)');
        var xlg = window.matchMedia('(min-width: 1025px)');
        var lg = window.matchMedia('(max-width: 1024px)');

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
            "sort": "latest",
            "languages": "",
            "levels": "",
            "subjects": ""
        }

        var currUrlParams = {
            "category": "",
            "genre": ""
        }

        var url = new URL(currUrl);
        var query_string = url.search;
        var searchParams = new URLSearchParams(query_string);
        // var tallest = 0;

        var app = new Vue({
            el: '#tabs-filter',
            data: data,

            mounted: function () {
                this.checkMetatUrl();

                // Initialise data
                this.content = $('main').attr('data-content');
                this.category = $('.category-tabs-wrapper li:first-child a').attr('id');

                // $('#offstageLoading').addClass('d-block').removeClass('d-none');
                //hide loading screen
                $('#offstageLoading').fadeIn(200);
                $('.throbber').css('display', 'block');

                setTimeout(function () { $('body').removeClass('overflow-hidden'); }, 1000);

                this.initialize();
                // this.onPopState();
            },
            updated: function () {
                var _this = this;
                _this.bgSwitcher();

                setTimeout(function () {
                    _this.clamptext();

                }, 100);

                _this.genreArrow();

                _this.bannerCount = data.banners.length;

                if (!$('.carousel-banner').hasClass('slick-initialized')) {
                    if (_this.bannerCount > 1) {
                        _this.slick();
                        $('.banner-content').find('.banner-navigation').addClass('d-flex').removeClass('d-none');
                    } else {
                        $('.banner-content').find('.banner-navigation').addClass('d-none').removeClass('d-flex');
                    }
                }

                //show banner cta button
                $('.banner-content').each(function () {
                    $(this).find('.btn-carousel').addClass('d-inline-block').removeClass('d-none');
                })

            },
            created() {
                // this.initialize();
                // window.onpopstate = function (event) {
                //     // this.fetchData();

                // }
            },
            methods: {
                checkMetatUrl: function () {

                    let metaUrl = $('meta');

                    for (let i = 0, lengthMeta = metaUrl.length; i < lengthMeta; i++) {
                        if ($(metaUrl[i]).attr('property') == 'site_domain' && currUrl.indexOf('localhost') === -1) {
                            var currDomain = $(metaUrl[i]).attr('content');
                            host = currDomain;
                        } else {
                            host = 'http://dev.esplanade.growthopsapp.com';
                        }
                    }
                },
                checkScroll: function () {
                    var _this = this;
                    var dataFilters = _this.filters;
                    var checkScroll = false;
                    var spinner = $('#spinner');
                    // spinner.removeClass('d-block').addClass('d-none');


                    var checkScrollOffset = 0;

                    if (lg.matches) {
                        checkScrollOffset = 3;
                    } else {
                        checkScrollOffset = 6;
                    }


                    if (dataFilters.length < checkScrollOffset) {
                        checkScroll = false;
                    } else {
                        checkScroll = true;
                    }

                    if (checkScroll) {
                        window.onscroll = () => {
                            var bottomOfWindow = $(window).scrollTop() + $(window).height() > $(document).height() - 100;
                            if ($(".tab-content").length > 0 && bottomOfWindow && !this.fetchingData) {
                                
                                if (data.filters.length > 1) {
                                    spinner.addClass('d-block').removeClass('d-none');
                                }

                                this.updateData();
                            }
                        }
                    } else {
                        spinner.addClass('d-none').removeClass('d-block');
                    }


                },
                updateData: function (data) {
                    var offset = 0;

                    if (lg.matches) {
                        offset = 3;
                        if (this.loadPage === 1) {
                            this.loadPage += 2;
                        } else {
                            this.loadPage += 1;
                        }
                            
                    }
                    if (xlg.matches) {
                        offset = 6
                        this.loadPage += 1;
                    }

                    var updateUrl = host + "/sitecore/api/offstage/articles/" + this.content + '/' + this.category + '/' + this.genre + '/' + this.loadPage + '/' + offset;
                    var _this = this;

                    this.fetchingData = true;

                    var requestData = $.ajax({
                        type: "GET",
                        url: updateUrl,
                        dataType: "json",
                        data: $.param(params)
                    }).done(function (data) {

                        _this.filters = _this.filters.concat(data.Articles)

                        setTimeout(function () {
                            _this.clampTextCard();
                        }, 100)

                        setTimeout(function () {
                            _this.eqHeight();
                        }, 300)

                        var hideSpinner = $('#spinner');

                        if (data.Articles.length < offset || data.Articles.length == 0) {
                            hideSpinner.addClass('d-none').removeClass('d-block');
                            window.onscroll = () => { }
                        }

                        _this.fetchingData = false;
                    })
                },
                bgSwitcher: function () {
                    var _this = this;
                    var bannerIndex = 0;

                    $('.banner-bg').each(function () {

                        if (!$(this).parent().parent().hasClass('slick-cloned')) {
                            var carouselMobileImage = $(this).attr('data-mobile-image')
                            var carouselDesktopImage = $(this).attr('data-desktop-image')

                            if (lg.matches) {
                                if (carouselMobileImage !== "") {
                                    $(this).css('background-image', 'url("' + carouselMobileImage + '")')
                                } else {
                                    $(this).css('background-image', 'url("' + carouselDesktopImage + '")')
                                }

                            }
                            if (xlg.matches) {
                                $(this).css('background-image', 'url("' + carouselDesktopImage + '")')
                            }


                            _this.contentColor = data.banners[bannerIndex].Content.Colour

                            if (_this.contentColor == '#000000') {
                                $(this).find('.banner-content').find('.btn-carousel').removeClass('btn-outline-light').addClass('btn-outline-primary');
                                $(this).find('.banner-content').find('.cust-icon').removeClass('arrow-light').addClass('arrow-black');

                            } else {
                                $(this).find('.banner-content').find('.btn-carousel').removeClass('btn-outline-primary').addClass('btn-outline-light');
                                $(this).find('.banner-content').find('.cust-icon').removeClass('arrow-black').addClass('arrow-light');
                                // $(this).find('.banner-content').find('.slick-arrow-font').removeClass('arrow-black').addClass('arrow-light');

                            }
                            bannerIndex++;
                        }

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

                    $('.genre-list').find('.nav-link').removeClass('active').removeClass('disabled');
                    $('#genre-tabs-' + this.category).find('#' + e).addClass('active').addClass('disabled');

                    var hideSpinner = $('#spinner');
                    hideSpinner.addClass('d-none').removeClass('d-block');

                    //hide loading screen
                    $('#offstageLoading').fadeIn(1000);

                    setTimeout(function () { $('body').removeClass('overflow-hidden'); }, 1000);

                    let genreId = key;
                    let categoryId = data.category;
                    
                    currUrlParams.genre = genreId;
                    currUrlParams.category = categoryId;

                    // if (window.location.href.indexOf("schools") > -1) {
                        
                    // } else {
                        if (currUrl.indexOf("genre") < -1) {
                            // currUrl += separator+"genre=" + currUrlParams.genre;
                            searchParams.append('genre', currUrlParams.genre)
                            searchParams.append('category', currUrlParams.category)
                            searchParams.sort();
                            url.search = searchParams.toString();
                            var newUrl = url.toString();
                        } else {
                            searchParams.delete('genre');
                            searchParams.append('genre', currUrlParams.genre)
                            searchParams.delete('category');
                            searchParams.append('category', currUrlParams.category)
                            searchParams.sort();
                            url.search = searchParams.toString();
                            var newUrl = url.toString();
                        }
                    // }

                    var catId = this.category;

                    $('.mm-content-item').find('.megamenu-genre').parent().removeClass('active');
                    var megaMenuItem = $('.mm-content-item').find('.megamenu-genre');

                    for (var i = 0, len = megaMenuItem.length; i < len; i++) {
                        if ($(megaMenuItem[i]).attr('data-key') == currUrlParams.genre && catId === 'explorethearts') {
                            $(megaMenuItem[i]).parent().addClass('active');
                        }
                    }
                    //append params on current url 
                    window.history.pushState({ path: currUrl }, '', newUrl);

                    currUrl = newUrl;

                    this.fetchData();
                    this.scrollIntoTileTop();

                },
                filterCategory: function (id, genre = 'all') {
                    this.category = id;
                    // change genre filter

                    $('.genre-tabs').addClass('d-none');
                    $('#genre-tabs-' + id).removeClass('d-none');
                    // change side filter 
                    $('.filter-menu-content').addClass('d-none');
                    $('#filter-menu-content-' + id).removeClass('d-none');

                    this.resetFilter();

                    if (genre == 'all') {
                        this.resetGenre()
                    }
                    // this.genreArrow();

                    // reset all side filter checkboxes and radios
                    $('.filter-menu-content [type="checkbox"]').prop('checked', false);
                    $('.filter-menu-content [type="radio"][value="latest"]').prop('checked', true);

                    let filterIcon = $('.genre-filter').find('img');
                    filterIcon.attr('src', '/assets/microsites/offstage/img/icons/Filter.svg');

                    //reset genre to ALL
                    searchParams.delete('genre');
                    searchParams.append('genre', genre)

                    //hide loading screen
                    $('#offstageLoading').fadeIn(1000);

                    setTimeout(function () { $('body').removeClass('overflow-hidden'); }, 1000);

                    let categoryId = id;
                    currUrlParams.category = categoryId;

                    if (currUrl.indexOf('category') < -1) {
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

                },
                genreArrow: function () {
                    var _this = this;
                    var catId = this.category;

                    jQuery.fn.hasHScrollBar = function () {
                        return this.get(0).scrollWidth > this.innerWidth();
                    }
                    var maxScrollLeft = $('.wrapper-' + catId).get(0).scrollWidth - $('.wrapper-' + catId).get(0).clientWidth - 10;

                    if ($('#genre-tabs-' + catId).length > 0) {
                        if ($('.wrapper-' + catId).length >= 1) {
                            if (!$('.wrapper-' + catId).hasHScrollBar()) {
                                $('#goBack-' + catId).addClass('d-none');
                                $('#goAfter-' + catId).addClass('d-none');
                                if (lg.matches) {
                                    $('.wrapper-' + catId).removeClass('box-shadow-right');
                                }
                            } else {
                                if (xlg.matches && $('.wrapper-' + catId).scrollLeft() < maxScrollLeft) {
                                    setTimeout(function () {
                                        $('#goAfter-' + catId).addClass('d-block').removeClass('d-none');
                                    }, 100)
                                }

                                if (xlg.matches && $('.wrapper-' + catId).scrollLeft() >= maxScrollLeft) {
                                    setTimeout(function () {
                                        $('#goBack-' + catId).addClass('show-arrow').removeClass('d-none');
                                    }, 100)
                                }

                                if (lg.matches && $('.wrapper-' + catId).scrollLeft() < maxScrollLeft) {
                                    $('.wrapper-' + catId).addClass('box-shadow-right');
                                }
                            }
                        }

                        $('#goBack-' + catId).on('click', function () {
                            $('.wrapper-' + catId).animate({
                                scrollLeft: '-=85'
                            }, 200, 'linear', function () {
                                $('#goAfter-' + catId).addClass('d-block');
                                $('#goAfter-' + catId).removeClass('d-none');
                            });

                        });

                        $('#goAfter-' + catId).on('click', function () {
                            $('.wrapper-' + catId).animate({
                                scrollLeft: '+=85'
                            }, 200, 'linear', function () {
                                // var maxScrollLeft = $('.wrapper-' + catId).get(0).scrollWidth - $('.wrapper-' + catId).get(0).clientWidth - 20;
                                if ($('.wrapper-' + catId).scrollLeft() >= maxScrollLeft) {
                                    $('#goAfter-' + catId).addClass('d-none');
                                    $('#goAfter-' + catId).removeClass('d-block');

                                    if (lg.matches) {
                                        $('.wrapper-' + catId).removeClass('box-shadow-right');
                                    }
                                }
                                if ($('.wrapper-' + catId).scrollLeft() < maxScrollLeft) {
                                    $('#goAfter-' + catId).addClass('d-block');
                                    $('#goAfter-' + catId).removeClass('d-none');
                                }
                            });

                        });

                        //genre on click scroller
                        var scrollLeftPrev = 0;
                        var catScrollLeftPrev = 0;

                        $('.wrapper-' + catId).on('scroll', function (e) {
                            var genreScroll = $('.wrapper-' + catId).scrollLeft();
                            var $goBack = $('#goBack-' + catId)
                            if ($(this).scrollLeft() < 1) {
                                $goBack.removeClass('show-arrow');

                            }
                            if ($(this).scrollLeft() > 0) {
                                $goBack.addClass('show-arrow');

                                if (lg.matches) {
                                    $('.wrapper-' + catId).addClass('box-shadow-right');
                                }
                            }

                            var $elem = $('.wrapper-' + catId);
                            var newScrollLeft = $elem.scrollLeft(),
                                width = $elem.width(),
                                scrollWidth = $elem.get(0).scrollWidth
                            var offset = 8;

                            if (scrollWidth - newScrollLeft - width == offset) {
                                $('#goBack-' + catId).addClass('show-arrow');
                            }
                            if (newScrollLeft === 0) {
                                $('#goAfter-' + catId).addClass('show-arrow');

                            }

                            var maxScroll = $('.wrapper-' + catId).get(0).scrollWidth - $('.wrapper-' + catId).get(0).clientWidth;
                            if ($('.wrapper-' + catId).scrollLeft() >= maxScroll) {
                                $('#goAfter-' + catId).addClass('d-none');
                                $('#goAfter-' + catId).removeClass('d-block');

                                $('#goBack-' + catId).addClass('show-arrow');

                                $('.wrapper-' + catId).removeClass('box-shadow-right');

                                if (lg.matches) {
                                    $('.wrapper-' + catId).removeClass('box-shadow-right');
                                }
                            }

                            scrollLeftPrev = newScrollLeft;
                        })
                    }
                },
                genreTabActive: function () {
                    var category_id = this.category;

                    $('.genre-tabs').addClass('d-none');
                    $('#genre-tabs-' + category_id).removeClass('d-none');

                },
                resetGenre: function () {
                    var _this = this;
                    var catId = _this.category;

                    $('.genre-tabs').each(function () {
                        $(this).find('.nav-link').removeClass('active').removeClass('disabled');
                    }).find('#all').addClass('active').addClass('disabled')
                    this.filterGenre('all');

                    //to scroll back to all
                    $('.genre-tabs .wrapper-' + catId).animate({
                        scrollLeft: $('.genre-tabs .active').position().left - $('#goBack-' + catId).outerWidth()
                    }, 2000, function () {
                        // this.genreArrow();
                    });

                    jQuery.fn.hasHScrollBar = function () {
                        return this.get(0).scrollWidth > this.innerWidth();
                    }
                    if ($('#genre-tabs-' + catId).length > 0) {
                        if ($('.wrapper-' + catId).length >= 1) {
                            if (!$('.wrapper-' + catId).hasHScrollBar()) {
                                $('#goBack-' + catId).addClass('d-none');
                                $('#goAfter-' + catId).addClass('d-none');
                            } else {
                                $('#goAfter-' + catId).removeClass('d-none');
                            }
                        }
                    }
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

                    var $sortValue = $('[name="sort-eta"]:checked').length > 0 ? $('[name="sort-eta"]:checked').val() : "" || $('[name="sort-kta"]:checked').length > 0 ? $('[name="sort-kta"]:checked').val() : "";

                    params.sort = $sortValue;

                    // for schools
                    // ===========

                    var languages = [];
                    $('.language').find('input[type=checkbox]:checked').each(function () {
                        if ($(this).find('input[type=checkbox]:checked')) {
                            languages.push($(this).data('key'));
                        }
                    })
                    params.languages = languages.join(',');

                    var levels = [];
                    $('.level').find('input[type=checkbox]:checked').each(function () {
                        if ($(this).find('input[type=checkbox]:checked')) {
                            levels.push($(this).data('key'));
                        }
                    })
                    params.levels = levels.join(',');

                    var subjects = [];
                    $('.subject').find('input[type=checkbox]:checked').each(function () {
                        if ($(this).find('input[type=checkbox]:checked')) {
                            subjects.push($(this).data('key'));
                        }
                    })
                    params.subjects = subjects.join(',');

                    // ==============

                    this.currPage = 1;
                    this.loadPage = 1;

                    _this.fetchData();

                    if (browse.length >= 1 || contentType.length >= 1 || timeTaken.length >= 1 || $sortValue.length >= 1 || languages.length >= 1 || levels.length >= 1 || subjects.length >= 1) {
                        $('.filter-icon').attr('src', '/assets/microsites/offstage/img/icons/FilterWithNotifications.svg')
                    } else {
                        $('.filter-icon').attr('src', '/assets/microsites/offstage/img/icons/Filter_with_text.svg')
                    }

                },
                resetFilter: function () {

                    //reset all filter uncheck
                    var $checkbox = $('.fm-content-item .custom-control-input')
                    $checkbox.each(function () {
                        if ($(this).is(':checked')) {
                            $(this).prop('checked', false);
                        }
                    })

                    params.browse = "";
                    params.contentType = ""
                    params.timeTaken = ""
                    params.sort = "latest";
                    params.languages = ""
                    params.levels = ""
                    params.subjects = ""
                },
                fetchData: function () {
                    var fetchdata = false;
                    if (currUrl.indexOf('genre') > 0) {
                        var url = new URL(currUrl);
                        var query_string = url.search;
                        var searchParams = new URLSearchParams(query_string);
                        var genreValue = url.searchParams.get('genre') || 'all';
                        if (genreValue === this.genre) {
                            fetchdata = true;
                        }
                    } else {
                        fetchdata = true;
                    }

                    if (fetchdata) {
                        var url = host + "/sitecore/api/offstage/articles/" + this.content + '/' + this.category + '/' + this.genre + '/' + this.currPage + '/' + this.pageSize;
                        var _this = this;

                        //show loading screen
                        // $('body').addClass('overflow-hidden');
                        $('#offstageLoading').fadeIn(1000);

                        var request = $.ajax({
                            type: "GET",
                            url: url,
                            dataType: "json",
                            data: decodeURIComponent($.param(params))
                        }).done(function (data) {

                            $('.tab-content').removeClass('d-none')

                            _this.banners = data.Banner.Banners
                            _this.totalBanners = data.Banner.Total
                            _this.filters = data.Articles

                            //Show error message
                            data.filters = data.Articles
                            var $messageContainer = $('#emptyData');
                            var emptyMessage = $messageContainer.find('.message')

                            $('.tabfil-container').css('opacity','1')
                            $('footer').removeClass('d-none');

                            $('#offstageLoading').fadeOut(1000);

                            // $('#offstageLoading').addClass('d-none').removeClass('d-block');

                            if (data.filters.length < 1) {
                                // test.text('Too Bad.. No result found');
                                emptyMessage.removeClass('d-none').addClass('d-block');
                                $('#spinner').addClass('d-none').removeClass('d-block');
                            } else {
                                emptyMessage.removeClass('d-block').addClass('d-none');
                                // $('#spinner').removeClass('d-none');
                                _this.checkScroll();
                            }
                            //end

                            if ($('.carousel-banner').hasClass('slick-initialized')) {
                                $('.carousel-banner').slick('unslick');
                            }
                            setTimeout(function () {
                                _this.clamptext();

                            }, 100);

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



                            setTimeout(function () {
                                _this.clampTextCard();
                            }, 100)


                            setTimeout(function () {
                                _this.eqHeight();
                            }, 300)
                        })
                    }
                },
                clampTextCard: function () {
                    Ellipsis({
                        className: '.title-clamp',
                        break_word: true,
                        lines: 3,
                        responsive: true
                    });

                    Ellipsis({
                        className: '.description-clamp',
                        break_word: true,
                        lines: 2,
                        responsive: true
                    });
                },
                eqHeight: function () {
                    var tallest = 0;
                    $.each($(".card-body"), function () {
                        $(this).css("height", "auto");
                        if ($(this).outerHeight() > tallest) {
                            tallest = $(this).outerHeight();
                        }
                    });
                    $.each($(".card-body"), function () {
                        $(this).css("height", tallest + "px");
                    });
                },
                scrollIntoTileTop: function () {
                    if (lg.matches) {
                        $('html, body').animate({
                            scrollTop: $("body").offset().top
                        }, 360);
                    }

                    if (xlg.matches) {
                        $('html,body').animate({ scrollTop: 0 }, 200, 'linear');
                    }

                },
                initialize: function () {
                    var _this = this;
                    var cat_id = this.category = $('.category-tabs-wrapper li:first-child a').attr('id');
                    var $btnSearch = $('#btnSearch');
                    var $burgerMenu = $('#hamb');
                    var $megaMenu = $('.mm-wrapper');
                    var $filterMenu = $('.filter-menu-wrapper');

                    _this.genreTabActive();

                    $('#spinner').addClass('d-none').removeClass('d-block');

                    $('.mm-content a.filter').click(function () {
                        var dataKey = $(this).attr('data-key');

                        event.preventDefault();
                        $('.custom-checkkbox .custom-control-input ').prop('checked', false);
                        $('.custom-checkkbox [data-key=' + dataKey + '] ').prop('checked', true);
                        $('.mm-wrapper').removeClass('active');
                        $('.submit-filter').click();
                    });               

                    /************************/
                    // search button on click
                    /************************/
                    $btnSearch.on('click', function () {
                        $('.mm-wrapper').removeClass('active');
                        $('.search').fadeIn('fast');
                        $('.in-between-screen').removeClass('active-screen');
                        $('.in-between-screen').addClass('active-darkscreen');
                        $('body').addClass('no-scroll');
                        $('body').css('overflow', '');
                        
                    })

                    /************************/
                    //genre in burger menu on click
                    /************************/
                    
                    $('a.nav-link.megamenu-genre').on('click', function () {
                        if (currUrl.indexOf("arts") > -1) {
                            // location.reload(false);
                            $('body').css('overflow', '');

                            $('.in-between-screen').click();

                            if (!$(this).parent().hasClass('active')) {
                                $('.mm-content-item').find('.nav-item').removeClass('active');
                                $(this).parent().addClass('active');
    
                                _this.category = 'explorethearts';
                                $('.list-act').find('#knowtheartists').removeClass('active')
                                var activeCategory = $('.list-act').find('#explorethearts');
                                activeCategory.addClass('active')
    
                                // change genre filter
                                $('.genre-tabs').addClass('d-none');
                                $('#genre-tabs-explorethearts').removeClass('d-none');
                                // change side filter 
                                $('.filter-menu-content').addClass('d-none');
                                $('#filter-menu-content-explorethearts').removeClass('d-none');
    
                                // reset all side filter checkboxes and radios
                                $('.filter-menu-content [type="checkbox"]').prop('checked', false);
    
                                // if (window.location.href.indexOf("schools") > -1) {
    
                                // } else {
                                    if (currUrl.indexOf('category') < -1) {
                                        searchParams.append('category', 'explorethearts');
                                        searchParams.sort();
                                        url.search = searchParams.toString();
                                        var newUrl = url.toString();
                                    } else {
                                        searchParams.delete('category');
                                        searchParams.append('category', 'explorethearts');
                                        searchParams.sort();
                                        url.search = searchParams.toString();
                                        var newUrl = url.toString();
                                    }
    
                                    //append params on current url
                                    window.history.pushState({ path: newUrl }, '', newUrl);
    
                                    var dataKey = $(this).data('key');
                                    // $('#genre-tabs-explorethearts').find('#' + dataKey).click();
                                    // this.category = 'explorethearts';
    
                                    _this.filterGenre(dataKey);
                                    // _this.checkActiveGenre();
                                    // $('.close-icon').click();
                                // }
    
    
                                $('.genre-tabs .wrapper-explorethearts').animate({
                                    scrollLeft: $('.genre-tabs .active').position().left - $('#goBack-explorethearts').outerWidth()
                                }, 2000, function () {
                                    // _this.genreArrow();
                                });
    
                                $('.mm-wrapper').removeClass('active');
                            }
                        }

                        
                    })

                    /************************/
                    //check url params have category/genre
                    /************************/
                    if (currUrl.indexOf('category') > -1 || currUrl.indexOf('genre') > -1) {
                        var categoryValue = '';
                        var genreValue = url.searchParams.get('genre') || 'all';

                        if (currUrl.indexOf('category') < 1) {
                            categoryValue = _this.category;
                        } else {
                            categoryValue = url.searchParams.get('category');
                        }

                        // $('#' + categoryValue).click();
                        _this.filterCategory(categoryValue, genreValue);

                        $('.list-act').find('.nav-link').removeClass('active');
                        $('.list-act').find('#' + categoryValue).addClass('active');

                        let filterIcon = $('.genre-filter').find('img');
                        filterIcon.attr('src', '/assets/microsites/offstage/img/icons/Filter.svg');


                        $('#genre-tabs-' + categoryValue + ' .nav').find('#' + genreValue).click();
                        if (genreValue != 'all') {
                            _this.filterGenre(genreValue);
                        }

                        $('.genre-tabs .wrapper-' + categoryValue).animate({
                            scrollLeft: $('.genre-tabs .active').position().left - $('#goBack-' + categoryValue).outerWidth()
                        }, 2000, function () {
                            var maxScroll = $('.wrapper-' + categoryValue).get(0).scrollWidth - $('.wrapper-' + categoryValue).get(0).clientWidth;
                            if ($('.wrapper-' + categoryValue).scrollLeft() >= maxScroll) {
                                $('#goBack-' + categoryValue).addClass('show-arrow')
                            }
                        });

                    } else {
                        this.fetchData();
                    }

                    /************************/
                    //TO FORCE PAGE RELOAD WHEN BROWSER BACK BUTTON IS CLICKED
                    /************************/
                    // var docref =  document.referrer;
                    window.onpopstate = function(e) {
                        // this.fetchData();
                        location.reload();
                    };
                    //

                    /************************/
                    //show animation when click - to on stage
                    /************************/
                    let redirectTime = '3000'
                    // let redirectUrl = 'https://www.esplanade.com/'

                    $('a').on('click', function (e) {
                        if ($(this).attr('href')) {
                            let redirectUrl = $(this).attr('href');
                            let toOnStageScreen = $('#animationToOnstage')

                            if (($(this).attr('href').includes('esplanade.com') || $(this).attr('href').startsWith("/")) && !$(this).attr('href').includes('offstage') && !$(this).hasClass('nav-item')) {
                                e.preventDefault();
                                toOnStageScreen.removeClass('d-none').addClass('d-block')
                                // toOnStageScreen.addClass('active')
                                setTimeout(function () {
                                    location.href = redirectUrl
                                }, redirectTime);
                            } else {
                                e.currentTarget.click();
                            }
                        }
                    });

                    /************************/
                    // mega menu functions
                    /************************/
                    $burgerMenu.on('click', function () {
                        // $('.carousel-banner').slick('slickPause');
                        $megaMenu.addClass('active');
                        $('.in-between-screen').addClass('active-screen');
                        $('body').css('overflow', 'hidden');

                        // if (lg.matches) {
                        //     $('body').addClass('position-fixed')
                        // }
                    })
                    $('.close-btn-x').on('click', function () {
                        $megaMenu.removeClass('active');
                        $('.in-between-screen').removeClass('active-screen');
                        // $('body').removeClass('no-scroll');
                        // $('body').removeClass('set-fixed');
                        $('body').css('overflow', '');


                        if (lg.matches) {
                            $('body').removeClass('position-fixed')
                        }
                        // $('.carousel-banner').slick('slickPlay');
                    })
                    /************************/
                    // filter menu functions
                    /************************/
                    //only for mobile sticky
                    if (lg.matches) {
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
                            $filterMenu.scrollTop(0)
                            $('.in-between-screen').addClass('active-screen');
                            $('body').css('overflow', 'hidden');


                            if ($('.filter-bar').hasClass("stick")) {
                                // $('.filter-bar').closest('.container-fluid').addClass("stick");

                            } else {
                                $('html, body').stop().animate({
                                    scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
                                }, 360, function () {
                                    // $('.filter-bar').closest('.container-fluid').addClass("stick");
                                });
                            }
                            $filterMenu.addClass('show-filter');

                        });

                        $('.submit-filter').on('click', function () {
                            $('.filter-bar').closest('.container-fluid').removeClass("stick");
                            $filterMenu.removeClass('show-filter');
                            $('.in-between-screen').removeClass('active-screen');
                            $('body').css('overflow', '');



                            // $('body').removeClass('no-scroll');
                            // $("body").removeClass("filter-open");
                            $('html, body').animate({
                                scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
                            }, 360);

                        });
                    }

                    if (xlg.matches) {

                        $('.filter').on('click', function () {
                            $('.filter-menu-wrapper').addClass('show-filter');
                            $('.in-between-screen').addClass('active-screen');
                            // $('body').addClass('no-scroll');
                            $('body').css('overflow', 'hidden');


                            $('.mm-wrapper').removeClass('active');

                            $(".filter-menu-wrapper").scrollTop(0);
                            $filterMenu.addClass('show-filter');
                        })

                        $('.submit-filter').on('click', function () {
                            $('body').removeClass('position-fixed');
                            $filterMenu.removeClass('show-filter');
                            $('.in-between-screen').removeClass('active-screen');
                            // $('body').removeClass('no-scroll');
                            // $("body").removeClass("filter-open");
                            $('body').css('overflow','');


                            $('html, body').stop().animate({
                                scrollTop: ($(".tab-content").offset().top) - ($('.filter-bar').height())
                            }, 360, function () {
                                $('.filter-bar').closest('.container-fluid').removeClass("stick");
                            });
                        })

                    }

                    /************************/
                    //close filter menu and enable body scroll
                    /************************/
                    $('.close-filter').on('click', function () {
                        var homepageFilter = $('.filter-bar').closest('.container-fluid')

                        $('.filter-bar').closest('.container-fluid').removeClass("stick");

                        $filterMenu.removeClass('show-filter');
                        $('.in-between-screen').removeClass('active-screen');
                        $('body').css('overflow','');

                    })



                    //category on click scroller arrow and initialize outer width func
                    // $('#goPrev').on('click', function () {
                    //     $('.wrap').animate({
                    //         scrollLeft: '-=100'
                    //     }, 200);
                    //     $('#goNext').addClass('d-block');
                    //     $('#goNext').removeClass('d-none');
                    // });

                    // $('#goNext').on('click', function () {
                    //     $('.wrap').animate({
                    //         scrollLeft: '+=90'
                    //     }, 200);
                    //     var maxScrollLeft = $('.wrap').get(0).scrollWidth - $('.wrap').get(0).clientWidth - 100;
                    //     // let wrapperWidth = $('.wrapper').width();
                    //     if ($('.wrap').scrollLeft() > maxScrollLeft) {
                    //         $('#goNext').addClass('d-none');
                    //         $('#goNext').removeClass('d-block');
                    //     }
                    //     if ($('.wrap').scrollLeft() < maxScrollLeft) {
                    //         $('#goNext').addClass('d-block');
                    //         $('#goNext').removeClass('d-none');
                    //     }
                    // });
                }
            }
        })
    }
});