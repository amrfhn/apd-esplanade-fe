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
                { id: '1', type: 'Genre'  },
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
                $('#search-input').val().toLowerCase();
            },
            computed: {
                filteredSuggestion: function() {
                    return this.searchSuggestion.filter((suggestion) => {
                        return suggestion.name.toLowerCase().match(this.search)
                    })
                },                
            },
            methods: {
                fetchSuggestKey: function(){
                    var _this =  this
                    var requestSuggestKey = $.ajax({
                        type: "GET",
                        url: "http://www.mocky.io/v2/5d5b9b423200002900628964",
                        dataType: "json",
                        data: data 
                    }).done(function(data){
                        console.log('key', data)

                        _this.searchSuggestion = data
                    })
                },

                showFilter: function () {
                    $('.search-filter').addClass('show-filter');
                },
                closeFilter: function () {
                    $('.search-filter').removeClass('show-filter');
                },
            }
        })
    }

})