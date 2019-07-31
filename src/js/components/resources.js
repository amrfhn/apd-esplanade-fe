$(function () {

    var resourcesContent = $('.resources-content');
    resourcesContent.hide();
    $('.resource-wrapper').find('.resources-1').show();


    $('.resource-select').on('change', function () {
        // var resource = $('.resource-wrapper').find('.resources-content');
        $('.resource-wrapper').find('.resources-content').removeClass('d-block')
        $('.resource-wrapper').find('.resources-content').addClass('d-none')
        $('.resource-wrapper').find('.resources-' + this.value).addClass('d-block')
    });
})