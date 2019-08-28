$(function () {

    'use strict'
    
    var $milestoneWrap = $('.milestones-wrapper');
    var milestone = $milestoneWrap.children();

    if($milestoneWrap.length > 0) {
        // if(milestone.length < 4){
        //     btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
        // } else {
        //     btnLoadMore.parent().addClass('d-flex').removeClass('d-none')
        // }
    
        // btnLoadMore.on('click', function(){
        //     btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
        // })
    
        $milestoneWrap.each(function(index, item){
            var $btnLoadMore = $(this).find('#loadMilestone');

            if(!$(this).children().hasClass('more-miles')){
                $(this).children().addClass('milestones-single-item')
            } else {
               var moreMiles =  $(this).find('.more-miles').attr('id');
               var newID = moreMiles + "-" + index
               var replaceID =  $(this).find('.more-miles').attr('id', newID);
               console.log(replaceID)

               var buttonTarget = $btnLoadMore.attr('data-target')
               var newTarget = buttonTarget + "-" + index
               var replaceTarget = $btnLoadMore.attr('data-target', newTarget)

               console.log(replaceTarget)
            }

            if($(this)[0].children.length < 4){
                $btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
            } else {
                $btnLoadMore.parent().addClass('d-flex').removeClass('d-none')
            }
        
            $btnLoadMore.on('click', function(){
                $(this).parent().removeClass('d-flex').addClass('d-none')
            })            

            console.log($(this)[0].children.length)

        })
    }
})