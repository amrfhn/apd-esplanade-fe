$(function () {
    'use strict'
    
    if ($('#tagResult').length > 0) {

        var xs = window.matchMedia('(max-width: 768px)');
        var md = window.matchMedia('(min-width: 769px)');

        var host = 'http://dev.esplanade.growthopsapp.com/';
        var currUrl = window.location.href;

        var data = {
            message: 'Tag Result Vue',
            tag: '',
            pageNum: 1,
            pageSize: 10,
            results: [],
            keyword: '',
            fetchingData: false
        }

        var params = {
            'header': '',
            'contentType': '',
            'date': '',

        }

        var url = new URL(currUrl);
        var query_string = url.search;
        var searchParams = new URLSearchParams(query_string);

        var tagApp = new Vue({
            el: '#tagResult',
            data: data,

            mounted: function () {
                var _this = this;

                this.checkUrl();
                this.fetchResults();

            },

            methods: {

                checkUrl: function (){

                    if(currUrl.indexOf('tag') > -1){
                        var tagValue = url.searchParams.get('tag');
                        data.tag = tagValue;
                    }

                },
                
                fetchResults: function (){

                    var _this = this;
                    var url = host + '/sitecore/api/offstage/tagcloud/results/' + this.tag + '/' + this.pageNum + '/' + this.pageSize;

                    var request = $.ajax({
                        type: 'GET',
                        url: url,
                        dataType: 'json',
                        data: decodeURIComponent($.param(params))

                    }).done(function (data){

                        _this.results = data.TagCloudResult
                        _this.keyword = data.Keyword
                        
                        if(data.TagCloudResult.length < 10 || data.TagCloudResult.length == 0 ){
                            $('#loadMore').parent().addClass('d-none').removeClass('d-flex');
                        } else {
                            $('#loadMore').parent().addClass('d-flex').removeClass('d-none');
                        }
                    })
                },

                loadMoreResults: function (){

                    var _this = this;
                    var offset = 10;

                    this.pageNum += 1;

                    var loadUrl = host + '/sitecore/api/offstage/tagcloud/results/' + this.tag + '/' + this.pageNum + '/' + offset;

                    this.fetchingData = true;

                    var loadData = $.ajax({
                        type: 'GET',
                        url: loadUrl,
                        dataType: 'json',
                        data: $.param(params) 
                    }).done(function (data){
                        _this.results = _this.results.concat(data.TagCloudResult);

                        if (data.TagCloudResult.length < offset || data.TagCloudResult.length == 0) {
                            $('#loadMore').parent().addClass('d-none').removeClass('d-flex');
                        }

                        _this.fetchingData = false;
                    })
                }
            },

        })
    }
})