$(function () {
    var data = {
        message: 'Hello Vue!',
        value: { name: 'EN', id: 'default' },
        options: [
          { name: 'EN', id: 'en' },
          { name: 'CH', id: 'ch' },
          { name: 'ML', id: 'ml' },
          { name: 'TA', id: 'ta' },
        ]
    }

    var langToggle = new Vue({
        el: '#lang-toggle',
        components: { Multiselect: window.VueMultiselect.default },
        data: data,
    });
})