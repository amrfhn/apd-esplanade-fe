$(function(){
    let $whatsOnContainer = $('.whats-on');
    let whatsOnList = $whatsOnContainer.find('.whats-on-item');

    if(whatsOnList.children().length >  0 && whatsOnList.length){
        $whatsOnContainer.css('min-height', '472px')
    } else {
        $whatsOnContainer.css('min-height', '375px')
    }
})