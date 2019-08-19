$(function () {
    'use strict'
    
    if ($('#tagResult').length > 0) {

        var host = 'http://dev.esplanade.growthopsapp.com/';

        var data = {
            message: 'Tag Result Vue',
            tag: '',
            results: '',
            pageNum: '',
            pageSize: ''
        }

        var params = {
            'header': '',
            'contentType': '',
            'date': '',

        }

        var tagApp = new Vue({
            el: '#tagResult',
            data: data,

            mounted: function () {
                var _this = this;

            },

            methods: {
                
                
            },



        })
    }
})