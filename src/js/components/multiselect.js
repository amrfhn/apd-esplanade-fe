$(function () {
    var options = [];
    options = $('#lang-toggle').data('options');

    var data = {
        message: 'Hello Vue!',
        value: { name: 'EN', id: 'default' },
        options: options
    }

    var langToggle = new Vue({
        el: '#lang-toggle',
        components: { Multiselect: window.VueMultiselect.default },
        data: data,
    });
})