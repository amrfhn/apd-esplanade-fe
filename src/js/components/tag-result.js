$(function () {
    'use strict'
    
    if ($('#tagResult').length > 0) {
        var data = {
            message: 'Tag Result Vue',
        }

        var params = {
            'header': '',
            'contentType': '',
            'date': '',

        }

        var tagApp = new Vue({
            el: '#tagResult',
            data: data,

        })
    }
})