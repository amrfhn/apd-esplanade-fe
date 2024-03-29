import VueLineClamp from 'vue-line-clamp';
import URL from 'core-js/features/url';
import URLSearchParams from 'core-js/features/url-search-params';

$(function () {
    'use strict'
    
    if ($('#tagResult').length > 0) {
        
        Vue.use(VueLineClamp, {
            importCss: true
        })
        
        var xs = window.matchMedia('(max-width: 768px)');
        var md = window.matchMedia('(min-width: 769px)');

        var host = '';
        var currUrl = window.location.href;

        var data = {
            message: 'Tag Result Vue',
            tag: '',
            pageNum: 1,
            pageSize: 10,
            results: [],
            keyword: '',
            category: [],
            fetchingData: false
        }

        var params = {
            'tagResults': '',
        }

        var url = new URL(currUrl);
        var query_string = url.search;
        var searchParams = new URLSearchParams(query_string);

        var tagApp = new Vue({
            el: '#tagResult',
            data: data,

            mounted: function () {
                this.setMinHeight();

                this.checkMetatUrl();

                this.checkUrl();

                
                this.fetchResults();
            },

            updated: function () {
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

                checkUrl: function (){
                    var _this = this;

                    if(currUrl.indexOf('tagcloud') > -1){
                        var tagValue = url.searchParams.get('tagcloud');
                        data.tag = tagValue;
                        // $('.tag-error-message').removeClass('d-block').addClass('d-none');

                    } else {
                        this.hideLoader();

                        $('.tag-error-message').fadeIn('200');
                        $('.tagged-in').removeClass('d-block').addClass('d-none');
                        $('#loadMore').parent().addClass('d-none').removeClass('d-flex');
                        $('#tagResult').parent().closest('.container').addClass('m-auto');
                        $('body').addClass('overflow-hidden');


                        $('body').removeClass('overflow-hidden');
                    }

                },

                setMinHeight: function () {
                    $('#tagResult').closest('main').addClass('custom-tag-result');

                    if ($('.newsletter').length > 0) {
                        var newsletter_height = $('.newsletter').outerHeight();
                        var footer_height = $('footer').outerHeight();
                        var outerNewsletterHeight = window.innerHeight - newsletter_height - footer_height;

                        $('#genericPage').css('min-height', outerNewsletterHeight);
                    }
                },
                fetchResults: function (){

                    var _this = this;
                    var url = host + '/sitecore/api/offstage/tagcloud/results/' + this.tag + '/' + this.pageNum + '/' + this.pageSize;

                    //show loading screen

                    var request = $.ajax({
                        type: 'GET',
                        url: url,
                        dataType: 'json',
                        data: decodeURIComponent($.param(params))

                    }).done(function (data){
                        
                        $('.tag-results').removeClass('d-none').addClass('d-block')

                        _this.results = data.TagCloudResult
                        _this.keyword = data.Keyword
                        _this.category = data.TagCloudResult.Category;
                        
                        if(data.TagCloudResult.length < 10 || data.TagCloudResult.length == 0 ){
                            $('#loadMore').parent().addClass('d-none').removeClass('d-flex');
                        } else {
                            $('#loadMore').parent().addClass('d-flex').removeClass('d-none');
                        }

                        //hide loading screen
                        _this.hideLoader();

                        $('#tagResult').closest('main').removeClass('custom-tag-result');
                    })
                },

                loadMoreResults: function (){

                    var _this = this;
                    var offset = 10;

                    this.pageNum += 1;
                    _this.showLoader();
                    $('#loadMore').parent().addClass('d-none').removeClass('d-flex');


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
                        } else {
                            $('#loadMore').parent().removeClass('d-none').addClass('d-flex');
                        }

                        _this.hideLoader();

                        _this.fetchingData = false;
                    })
                },
                showLoader: function () {
                    var $loader = $('#loadContainer');

                    $loader.fadeIn('1000');
                },

                hideLoader: function () {
                    var $loader = $('#loadContainer');

                    $loader.fadeOut('1000');
                }
            },

        })
    }
})