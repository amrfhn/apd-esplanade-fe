import VueLineClamp from 'vue-line-clamp';

$(function () {
    'use strict'
    if ($('#search').length > 0) {
        Vue.use(VueLineClamp, {
            importCss: true
        })

        var data = {
            search: "",
            searchSuggestion: [],
            searchFilter: [
                { id: '1', type: 'Genre' },
                { id: '2', type: 'Music' },
                { id: '3', type: 'Visual Art' },
                { id: '4', type: 'Family' }
            ]
        }

        var searchFilter = new Vue({
            el: "#search",
            data: data,
            mounted: function () {
                this.fetchSuggestKey();
                $(".search-suggestion, .show-result-wrapper, .search-filter, .search-result, .no-result").hide();
            },
            computed: {},
            methods: {
                fetchSuggestKey: function () {
                    var _this = this
                    var requestSuggestKey = $.ajax({
                        type: "GET",
                        url: "http://www.mocky.io/v2/5d5b9b423200002900628964",
                        dataType: "json",
                        data: data
                    }).done(function (data) {
                        console.log('key', data)
                        _this.searchSuggestion = data
                    })
                },
                filteredSuggestion: function () {
                    var value = $('#search-input').val().toLowerCase();

                    // Filter List
                    if (this.search.length > 2) {
                        $(".search-suggestion-list li").removeClass("match").hide().filter(function () {
                            return $(this).text().toLowerCase().indexOf(value) != -1;
                        }).addClass("match").show();

                        this.searchHighlight(this.search)

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
                    if (!this.search) {
                        this.errors.push('Search required.');
                    } else {
                        this.fetchResultData();
                    }

                    e.preventDefault();
                },
                fetchResultData: function (e) {
                    console.log('getting result...')
                    $('.show-result-wrapper, .search-filter, .search-result').show();
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