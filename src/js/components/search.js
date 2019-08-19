import VueLineClamp from 'vue-line-clamp';

$(function(){
    'use strict'
    if($('#search').length > 0) {        
        Vue.use(VueLineClamp, {
            importCss: true
        })
        
        var data = {
            searchSuggestion: [
                'Jazz',
                'Jazz 1',
                'Jazz 2',
                'Jazz 3',
                'Jazz 4',
                'Jazz 5',
                'Jazz 6',
                'Jazz 7'
            ],
            searchFilter: [
                { id: '1' , type:'Genre' },
                { id: '2' , type:'Music' },
                { id: '3' , type:'Visual Art' },
                { id: '4' , type:'Family' }
            ]
        }

        var searchFilter = new Vue({
            el: "#search",
            data: data,
            methods: {
                showFilter: function (){
                    $('.search-filter-list').addClass('show-filter-list');
                },
                closeFilter: function (){
                    $('.search-filter-list').removeClass('show-filter-list');
                }
            },
        })
    }
})