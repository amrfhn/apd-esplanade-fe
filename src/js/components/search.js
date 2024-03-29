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
            placeholderIE: true,
            content: "",
            field: "",
            keyword: "",
            currPage: 1,
            pageSize: 10,
            searchSuggestion: [],
            searchSuggestionFiltered: [],
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

        // var bodyScrollLock = require('body-scroll-lock');
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        var searchFilter = new Vue({
            el: "#search",
            data: data,
            mounted: function () {
                var _this = this

                this.checkMetatUrl();
                this.hideAll();

                // Initialise data
                this.content = $('#search').attr('data-content');
                this.field = $('#search-input').attr('data-content');

                this.fetchSuggestKey();
                this.checkUrlParam();

                $('.in-between-screen').on('click', function () {
                    _this.closeSearch();
                })

                // Internet Explorer 6-11


                if (!isIE) {
                    this.placeholderIE = false;
                }
            },
            watch: {
                searchSuggestionFiltered: {
                    handler: function () {
                        if (this.searchSuggestionFiltered.length == 0) {
                            $(".search-suggestion").hide();
                        }
                    },
                    deep: true,
                }
            },
            methods: {
                checkMetatUrl: function () {
                    let metaUrl = $('meta');

                    for (let i = 0, lengthMeta = metaUrl.length; i < lengthMeta; i++) {
                        if ($(metaUrl[i]).attr('property') == 'site_domain' && currentUrl.indexOf('localhost') === -1) {
                            var currDomain = $(metaUrl[i]).attr('content');
                            host = currDomain;
                        } else {
                            host = 'http://dev.esplanade.growthopsapp.com';
                        }
                    }
                },
                hideAll: function () {
                    $(".search-suggestion, #search-spinner, .total-result-wrapper, .search-filter, .search-filter-btn, .search-result, .no-result, .result-more, .result-more-loading").hide();
                },
                hideSuggestion: function (event) {
                    $(".search-suggestion").hide();

                    if (!$(event.target).closest(".search-suggestion").length) {
                        $(".search-suggestion").slideUp("fast");
                        this.placeholderIE == false;
                    }
                },
                boldSearchKeyword: function (str) {

                    var searchMask = this.keyword.trim().split(' ');
                    var newStr = str;
                    // searchMask.forEach(function(searchTerm) {
                    //         var regEx = new RegExp(searchTerm, 'i');
                    //         // str.substr(str.indexOf(this.keyword),this.keyword.length)

                    //         var matched = newStr.match(new RegExp(searchTerm, 'ig'));
                    //         var splited = newStr.split(new RegExp(searchTerm, 'i'));

                    //         newStr = splited.reduce(function(str1, item, index) {
                    //             // var matchedValue = newArray[index]
                    //             var matchedValue = matched[index];
                    //             return str1 += item + (!matchedValue ? '' : '<>' + matchedValue + '</>')
                    //         }, '');
                    // })

                    newStr = newStr.replace(/<>/g, '<strong class="font-weight-bolder">');
                    return newStr.replace(/<\/>/g, '</strong>');
                    // var replaceMask = '<span class="font-weight-bolder">' + str.substr(str.indexOf(this.keyword),this.keyword.length) + '</span>'



                    // return str.replace(regEx, replaceMask)
                    // return str.replace(this.keyword,'<span class="font-weight-bolder">' + this.keyword + '</span>')
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
                    var searching = null;
                    clearInterval(searching);


                    // var value = $('#search-input').val().toLowerCase();

                    // var newVal = value.split(" ")


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

                    // -------------------- REGEX SEARCH --------------------
                    var _this = this;
                    searching = setTimeout(function () {


                        if (_this.keyword.length > 2) {
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


                            _this.searchSuggestionFiltered = _this.searchSuggestion.filter(function (suggestion) {
                                return re.test(suggestion)
                            })

                            // Loop through all list items, and hide those who don't match the search query
                            // for (i = 0; i < lis.length; i++) {
                            //     li = lis[i];
                            //     span = li.firstChild;

                            //     if (re.test(span.innerText)) {
                            //         li.style.display = '';
                            //     } else {
                            //         li.style.display = 'none';
                            //     }
                            // }

                            // // $('.search-suggestion-list li').mark(filter);



                        } else {
                            $(".search-suggestion").hide();
                        }
                    }, 100)

                    if (isIE) {
                        if (this.keyword.length > 0) {
                            this.placeholderIE = false;
                        } else {
                            this.placeholderIE = true;
                        }
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
                    // $('#search-input').blur();
                    var $text = $('#search-input')
                    var $selectedKey = event.target.textContent;

                    $text.val($selectedKey);
                    this.keyword = $selectedKey
                    this.resetFilter();
                    this.submittedSearch(event);
                },
                submittedSearch: function (e) {
                    // e.preventDefault();
                    $('#search-input').blur();
                    this.hideAll();
                    this.resetFilter();
                    this.placeholderIE = false;
                    this.updateUrlParam();
                    this.fetchResultData();

                    return false;
                },
                fetchResultData: function (e) {
                    
                    this.hideAll();
                    $('.search-suggestion').hide();
                    $('#search-spinner').show();

                    this.updateFilter();
                    this.currPage = 1
                    var url = host + "/sitecore/api/offstage/" + this.content + '/articles/' + this.currPage + '/' + this.pageSize
                    var _this = this
                    resultParams.keyword = this.keyword

                    var requestResult = $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        data: $.param(resultParams)
                    }).done(function (data) {

                        _this.searchResult.total = data.total
                        _this.searchResult.result = data.result

                        // $(".search-suggestion").hide();

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
                        $(".search-suggestion").hide();
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
                        data: resultParams,
                        beforeSend: function () {
                            $('.result-more').hide();
                            $('.result-more-loading').fadeIn('fast');
                        },
                        complete: function (data) {
                            $('.result-more-loading').fadeOut('fast');
                        }
                    }).done(function (data) {
                        $('.result-more').show();

                        if (data.result.length > 0 && data.result.length == 10) {
                            var updatedResult = _this.searchResult.result.concat(data.result);
                            _this.searchResult.result = updatedResult;

                            if (updatedResult.length == data.total) {
                                $('.result-more').hide();
                            }

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
                        $('.search').fadeIn('slow');
                        $('.in-between-screen').addClass('active-darkscreen');

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

                    //fix undefined in ie
                    if (newUrl) {
                        window.history.pushState({ path: currentUrl }, '', newUrl);
                    }
                },
                moreResult: function () {
                    this.updateResultData();
                },
                resetResult: function () {
                    this.resultScrollTop();

                    $('.no-result').hide();
                    $('.total-result-wrapper, .search-filter, .search-filter-btn, .search-result, .result-more').show();

                    if (this.searchResult.total <= 10) {
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
                    // $('.search-wrapper').reset();
                },
                closeSearch: function () {

                    $('.search').fadeOut('fast');
                    $('#btnSearch').prop('disabled', false);
                    $('.in-between-screen').removeClass('active-darkscreen');
                    // $('.in-between-screen').click();
                    $('body').removeClass('no-scroll');
                    this.hideAll();

                    this.keyword = ""
                    $('.search-wrapper')[0].reset();
                    $('.search-wrapper').removeClass('was-validated');
                    this.removeKeyword();

                    // bodyScrollLock.clearAllBodyScrollLocks();

                    if (isIE) {
                       this.placeholderIE = true 
                    }
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