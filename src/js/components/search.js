import VueLineClamp from 'vue-line-clamp';

$(function () {
    'use strict'
    if ($('#search').length > 0) {
        Vue.use(VueLineClamp, {
            importCss: true
        })

        var host = '';
        var currUrl = window.location.href;

        var data = {
            content: "",
            field: "",
            keyword: "",
            currPage: 1,
            pageSize: 5,
            searchSuggestion: [],
            searchResult: {
                total: 0,
                result: []
            },
            searchFilter: [
                { id: '1', type: 'Genre' },
                { id: '2', type: 'Music' },
                { id: '3', type: 'Visual Art' },
                { id: '4', type: 'Family' }
            ]
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
                
                // Initialise data
                this.content = $('#search').attr('data-content');
                this.field = $('#search-input').attr('data-content');

                $(".search-suggestion, .show-result-wrapper, .search-filter, .search-result, .no-result").hide();
            },
            watch: {
                keyword: function (){
                    console.log(this.keyword)
                    this.fetchSuggestKey();
                }
            },
            methods: {
                checkMetatUrl: function () {
                    let metaUrl = $('meta');

                    for (let i = 0, lengthMeta = metaUrl.length; i < lengthMeta; i++) {
                        if ($(metaUrl[i]).attr('property') == 'site_domain' && currUrl.indexOf('localhost') === -1) {
                            // console.log()
                            var currDomain = $(metaUrl[i]).attr('content');
                            host = currDomain;
                            console.log('current Host from meta:', host)
                        } else {
                            host = 'http://dev.esplanade.growthopsapp.com';
                        }
                    }
                },
                fetchSuggestKey: function () {
                    var url = host + "/sitecore/api/offstage/" + this.content + '/' + this.field 
                    var _this = this
                    params.keyword = this.keyword
                    console.log('url', url)

                    console.log('keyword', this.keyword)
                    var requestSuggestKey = $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        data: params
                    }).done(function (data) {
                        console.log('key', data)
                        _this.searchSuggestion = data.suggestions

                        console.log("searchSuggestion", _this.searchSuggestion)
                    }).fail(function (){
                        console.log('fail')
                    })
                },
                filteredSuggestion: function () {
                    var value = $('#search-input').val().toLowerCase();

                    // Filter List
                    if (this.keyword.length > 2) {
                        $(".search-suggestion-list li").removeClass("match").hide().filter(function () {
                            return $(this).text().toLowerCase().indexOf(value) != -1;
                        }).addClass("match").show();

                        this.searchHighlight(this.keyword)

                        $(".search-suggestion").show();
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
                    var $selectedKey = event.target.innerText
                    $('#search-input').val($selectedKey);
                    $(".search-suggestion").hide();
                    $('.search-submit').click();
                },
                submittedSearch: function (e) {
                    if (!this.keyword) {
                        this.errors.push('Search required.');
                    } else {
                        this.fetchResultData();
                    }

                    e.preventDefault();
                },
                fetchResultData: function (e) {
                    console.log('getting result...')

                    var url = host + "/sitecore/api/offstage/" + this.content + '/articles/' + this.currPage + '/' + this.pageSize
                    var _this = this
                    resultParams.keyword = this.keyword

                    var requestResult = $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        data: resultParams
                    }).done(function(data){
                        _this.searchResult.total = data.total
                        _this.searchResult.result = data.result

                        $('.search-suggestion').hide();
                        $('.show-result-wrapper, .search-filter, .search-result').show();
                    })
                },
                updateResultData: function(){
                    this.currPage += 1
                    var updateUrl = host + "/sitecore/api/offstage/" + this.content + '/articles/' + this.currPage + '/' + this.pageSize
                    var _this = this;
                    
                    var requestResult = $.ajax({
                        type: "GET",
                        url: updateUrl,
                        dataType: "json",
                        data: resultParams
                    }).done(function(data){                        
                        if(data.result.length > 0 && data.result.length == 5) {
                            var updatedResult = _this.searchResult.result.concat(data.result);
                            _this.searchResult.result = updatedResult;     
                     
                        } else if (data.result.length < 5 ){
                            var updatedResult = _this.searchResult.result.concat(data.result);
                            _this.searchResult.result = updatedResult;     

                            $('.result-more').hide();
                        }
                    })
                },
                moreResult: function() {
                    this.updateResultData();
                },
                resetSearch: function () {
                    $('.search-wrapper').reset();
                },
                showFilter: function () {
                    $('.search-filter').addClass('show-filter');
                },
                closeFilter: function () {
                    $('.search-filter').removeClass('show-filter');
                    this.resetSearch();
                },
            }
        })
    }

})