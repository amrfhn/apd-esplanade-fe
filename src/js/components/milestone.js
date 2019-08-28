$(function () {

    'use strict'
    
    var $milestoneWrap = $('#milestones-wrapper');
    var milestone = $milestoneWrap.children();
    var btnLoadMore = $('#loadMilestone'); 

    if($milestoneWrap.length > 0) {
        if(milestone.length < 4){
            btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
        } else {
            btnLoadMore.parent().addClass('d-flex').removeClass('d-none')
        }
    
        btnLoadMore.on('click', function(){
            btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
        })
    
        $milestoneWrap.each(function(){
            if(!$(this).children().hasClass('more-miles')){
                $(this).children().addClass('milestones-single-item')
            } 
        })
    }
})