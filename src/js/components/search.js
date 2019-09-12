import VueLineClamp from 'vue-line-clamp';
import URL from 'core-js/features/url'
import URLSearchParams from 'core-js/features/url-search-params'

$(function () {
    'use strict'
    if ($('#search').length > 0) {
        Vue.use(VueLineClamp, {
            importCss: true
        })

        var host = '';
        var currentUrl = window.location.href;


        var data = {
            content: "",
            field: "",
            keyword: "",
            currPage: 1,
            pageSize: 10,
            searchSuggestion: [],
            searchResult: {
                total: 0,
                result: [],
                message: ""
            },
            searchFilter: ""
        }

        var params = {
            "keyword": ""
        }

        var resultParams = {
            "keyword": "",
            "filter": ""
        }

        var searchFilter = new Vue({
            el: "#search",
            data: data,
            mounted: function () {

                this.checkMetatUrl();
                this.hideAll();

                // Initialise data
                this.content = $('#search').attr('data-content');
                this.field = $('#search-input').attr('data-content');

                this.fetchSuggestKey();
                this.checkUrlParam();
            },
            methods: {
                checkMetatUrl: function () {
                    let metaUrl = $('meta');

                    for (let i = 0, lengthMeta = metaUrl.length; i < lengthMeta; i++) {
                        if ($(metaUrl[i]).attr('property') == 'site_domain' && currentUrl.indexOf('localhost') === -1) {
                            var currDomain = $(metaUrl[i]).attr('content');
                            host = currDomain;
                            // console.log('current Host from meta:', host)
                        } else {
                            host = 'http://dev.esplanade.growthopsapp.com';
                        }
                    }
                },
                hideAll: function () {
                    $(".search-suggestion, #search-spinner, .total-result-wrapper, .search-filter, .search-filter-btn, .search-result, .no-result, .result-more").hide();
                },
                fetchSuggestKey: function () {
                    var url = host + "/sitecore/api/offstage/" + this.content + '/' + this.field
                    var _this = this
                    params.keyword = this.keyword

                    var requestSuggestKey = $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        // data: params
                    }).done(function (data) {
                        _this.searchSuggestion = data.suggestions
                    }).fail(function () {
                        $(".search-suggestion").hide();
                    })
                },
                filteredSuggestion: function () {
                    // var value = $('#search-input').val().toLowerCase();

                    // var newVal = value.split(" ")

                    // console.log(newVal);

                    // // Filter List
                    // if (this.keyword.length > 2 && this.searchSuggestion.length > 0) {
                    //     $(".search-suggestion-list li").removeClass("match").hide().filter(function () {
                    //         return $(this).text().toLowerCase().indexOf(value) != -1;
                    //     }).addClass("match").show();

                    //     this.searchHighlight(this.keyword)

                    //     $(".search-suggestion").show();

                    //     var countlistitems = $(".search-suggestion-list li:visible").length;
                    //     if (countlistitems < 1) {
                    //         $(".search-suggestion").hide();
                    //     }

                    // } else {
                    //     $(".search-suggestion").hide();
                    // }


                    // -------------------- MARK.JS --------------------
                    // var $input = $('#search-input input'),
                    //     $context = $('.search-suggestion-list li'),
                    //     term = $('#search-input').val();

                    // if (this.keyword.length > 2 && this.searchSuggestion.length > 0) {
                    //     $(".search-suggestion").show();
                    //     $context.show().unmark();
                    //     if (term) {
                    //         $context.mark(term, {
                    //             "element": "mark",
                    //             "className": "hightlight",
                    //             separateWordSearch: true,
                    //             acrossElements: false,
                    //             done: function (counter) {
                    //                 $context.not(":has(mark)").hide();
                    //                 var words = term.split(' ')
                    //                 // console.log('foundTerm', words.length)

                    //                 $context.each(function(){
                    //                     var mark = $(this).find('span').find('mark').text().toLowerCase()

                    //                     // console.log(words)

                    //                     // mark.filter(function(el){
                    //                     //     console.log("here")
                    //                     //     return words.indexof(el) > 0
                    //                     // })
                    //                     // console.log($context.has('mark').text())

                    //                     var highlight = $(this).has('mark').text()
                    //                     // console.log(highlight)
                    //                     // if($.inArray(mark, words) != '-1'){
                    //                     //     alert(mark + 'in the array')
                    //                     // }
                    //                 })
                    //             }
                    //         })
                    //     }
                    // } else {
                    //     $(".search-suggestion").hide();
                    // }

                    // -------------------- REGEX SEARCH --------------------

                    if (this.keyword.length > 2 && this.searchSuggestion.length > 0) {
                        $(".search-suggestion").show();

                        // Declare variables
                        var input = document.getElementById('search-input'),
                            filter = input.value,
                            ul = document.getElementById('search-suggestion-list'),
                            lis = ul.getElementsByTagName('li'),
                            searchTerms = filter.match(/[a-z0-9]+/gi),
                            re, i, li, span;

                        if (searchTerms) {
                            searchTerms = searchTerms.map(function (term) {
                                return '(?=.*' + term + ')';
                            });

                            re = new RegExp(searchTerms.join(''), 'i');
                        } else {
                            re = /./;
                        }

                        // Loop through all list items, and hide those who don't match the search query
                        for (i = 0; i < lis.length; i++) {
                            li = lis[i];
                            span = li.firstChild;

                            if (re.test(span.innerHTML)) {
                                li.style.display = '';
                            } else {
                                li.style.display = 'none';
                            }
                        }

                        // $('.search-suggestion-list li').mark(filter);

                        if($('.search-suggestion-list li').length === $('.search-suggestion-list li:hidden').length) {
                            $(".search-suggestion").hide();
                        }
                        
                    } else {
                        $(".search-suggestion").hide();
                    }
                },
                searchHighlight: function (string) {
                    $(".search-suggestion-list li.match").each(function () {
                        var matchStart = $(this).text().toLowerCase().indexOf('' + string.toLowerCase() + '');
                        var matchEnd = matchStart + string.length - 1;
                        var beforeMatch = $(this).text().slice(0, matchStart);
                        var matchText = $(this).text().slice(matchStart, matchEnd + 1);
                        var afterMatch = $(this).text().slice(matchEnd + 1);
                        $(this).html("<span>" + beforeMatch + "<em>" + matchText + "</em>" + afterMatch + "</span>");
                    })
                },
                selectedSuggestion: function (event) {
                    var $text = $('#search-input')
                    var $selectedKey = event.target.textContent;

                    $text.val($selectedKey);
                    this.keyword = $selectedKey
                    this.resetFilter();
                    this.submittedSearch(event);
                },
                submittedSearch: function (e) {
                    // e.preventDefault();
                    this.hideAll();
                    this.resetFilter();
                    this.updateUrlParam();
                    this.fetchResultData();
                    return false;
                },
                fetchResultData: function (e) {
                    console.log('getting result...')
                    
                    this.updateFilter();
                    $('#search-spinner').show();
                    $(".search-suggestion").hide();

                    this.currPage = 1
                    var url = host + "/sitecore/api/offstage/" + this.content + '/articles/' + this.currPage + '/' + this.pageSize
                    var _this = this
                    resultParams.keyword = this.keyword

                    var requestResult = $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        data: decodeURIComponent($.param(resultParams))
                    }).done(function (data) {
                        _this.searchResult.total = data.total
                        _this.searchResult.result = data.result


                        if (_this.searchResult.result.length == 0) {
                            _this.hideAll();
                            _this.searchResult.message = data.message
                            $('.search-suggestion').hide();
                            $('.total-result-wrapper').show();
                            $('.no-result').show();

                            if ($('.form-check input[type=checkbox]:checked').length) {
                                $('.search-filter, .search-filter-btn').show();
                            }
                        } else {
                            $('#search-spinner').hide();
                            _this.resetResult();
                        }
                    }).fail(function () {
                        $('#search-spinner').hide();
                        console.log('update fail')
                    })
                },
                updateResultData: function () {
                    this.currPage += 1
                    var updateUrl = host + "/sitecore/api/offstage/" + this.content + '/articles/' + this.currPage + '/' + this.pageSize
                    var _this = this;

                    var requestResult = $.ajax({
                        type: "GET",
                        url: updateUrl,
                        dataType: "json",
                        data: resultParams
                    }).done(function (data) {
                        if (data.result.length > 0 && data.result.length == 10) {
                            var updatedResult = _this.searchResult.result.concat(data.result);
                            _this.searchResult.result = updatedResult;

                        } else if (data.result.length < 10) {
                            var updatedResult = _this.searchResult.result.concat(data.result);
                            _this.searchResult.result = updatedResult;

                            $('.result-more').hide();
                        }
                    })
                },
                checkUrlParam: function () {
                    var currentUrl = window.location.href;
                    var url = new URL(currentUrl);
                    var query_string = url.search;
                    var urlParams = new URLSearchParams(query_string);
                    var myParams = urlParams.get('keyword')

                    if (currentUrl.indexOf("keyword") > -1) {
                        console.log('showwwwwwwwwwwww')
                        $('.search').fadeIn('slow');
                        $('.in-between-screen').addClass('active').css({ 'background-color' : 'black', 'opacity' : '.5', 'left' : '0' });

                        var $text = $('#search-input')

                        $text.val(myParams);
                        this.keyword = myParams
                        this.resetFilter();
                        this.submittedSearch();
                        // this.fetchResultData();
                    }
                },
                updateUrlParam: function () {
                    var currentUrl = window.location.href;
                    var url = new URL(currentUrl);
                    var query_string = url.search;
                    var urlParams = new URLSearchParams(query_string);

                    console.log('check keyword')

                    if (currentUrl.indexOf("keyword") < -1 && this.keyword.length > 0) {
                        urlParams.append('keyword', this.keyword)
                        url.search = urlParams.toString();
                        var newUrl = url.toString();
                    } else {
                        urlParams.delete('keyword');
                        urlParams.append('keyword', this.keyword)
                        url.search = urlParams.toString();
                        var newUrl = url.toString();
                    }

                    window.history.pushState({ path: currentUrl }, '', newUrl);
                },
                removeKeyword: function () {
                    var currentUrl = window.location.href;
                    var url = new URL(currentUrl);
                    var query_string = url.search;
                    var urlParams = new URLSearchParams(query_string);

                    if (currentUrl.indexOf("keyword") > -1) {
                        urlParams.delete('keyword');
                        url.search = urlParams.toString();
                        var newUrl = url.toString();
                    }

                    window.history.pushState({ path: currentUrl }, '', newUrl);
                },
                moreResult: function () {
                    this.updateResultData();
                },
                resetResult: function () {
                    this.resultScrollTop();

                    $('.no-result').hide();
                    $('.total-result-wrapper, .search-filter, .search-filter-btn, .search-result, .result-more').show();

                    if (this.searchResult.result.length < 10) {
                        $('.result-more').hide();
                    }
                },
                resultScrollTop: function () {
                    $('.search-result').animate({ scrollTop: 0 }, '1000');
                },
                showFilter: function () {
                    $('.search-filter').addClass('show-filter');
                },
                closeFilter: function () {
                    $('.search-filter').removeClass('show-filter');
                    $('.search-wrapper').reset();
                },
                closeSearch: function () {
                    var bodyScrollLock = require('body-scroll-lock');

                    $('.search').fadeOut('fast');
                    $('#btnSearch').prop('disabled', false);
                    $('.in-between-screen').removeClass('active').css({ 'background-color': '', 'opacity': '' });
                    // $('body').removeClass('no-scroll');
                    this.hideAll();
                   
                    bodyScrollLock.clearAllBodyScrollLocks();

                    this.keyword = ""
                    $('.search-wrapper')[0].reset();
                    $('.search-wrapper').removeClass('was-validated');
                    this.removeKeyword();
                },
                resetFilter: function () {
                    //reset all filter uncheck
                    var $checkbox = $('.search-filter .form-check-input')
                    $checkbox.each(function () {
                        if ($(this).is(':checked')) {
                            $(this).prop('checked', false);
                        }
                    })
                },
                updateFilter: function () {
                    // loop and check .search-filter has attr "checked"
                    // append id to param 
                    // no checked - remove id from param if it's uncheck 
                    var checkFilter = []

                    var $checkbox = $('.search-filter .form-check-input')
                    $checkbox.each(function () {
                        var filter = $(this).attr('id')

                        if ($('#' + filter).is(':checked')) {
                            checkFilter.push(filter);
                        }
                    })

                    resultParams.filter = checkFilter.toString();
                },
            }
        })
    }

})