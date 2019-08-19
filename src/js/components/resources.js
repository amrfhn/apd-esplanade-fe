$(function () {

    let resourcesContent = $('.resources-content');
    let checkSelect = $('select.resource-select').children();
    let resource = $('.resource-wrapper');

    resourcesContent.hide();

    checkSelect.each(function(){
        if  ($(this).is('option:selected')){
            var selectedVal = $(this).attr('value');
            $('.resource-wrapper').find('.resources-' + selectedVal).show();
        }
    })

    $('.resource-select').on('change', function () {
        var selectedValue = $(this).attr('value');
        resource.find('.resources-' + selectedValue).show();
        // var resource = $('.resource-wrapper').find('.resources-content');
        resource.find('.resources-content').removeClass('d-block')
        resource.find('.resources-content').addClass('d-none')
        resource.find('.resources-' + this.value).addClass('d-block')
    });

    if(checkSelect.length < 2){
        $('.resource-select').attr('disabled', 'disabled');
        
    }

})