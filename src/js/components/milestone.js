$(function () {

    'use strict'

    var $milestoneWrap = $('#milestones-wrapper');
    var milestone = $milestoneWrap.children();
    var btnLoadMore = $('#loadMilestone'); 

    if(milestone.length < 4){
        btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
    } else {
        btnLoadMore.parent().addClass('d-flex').removeClass('d-none')
    }

    btnLoadMore.on('click', function(){
        btnLoadMore.parent().removeClass('d-flex').addClass('d-none')
    })

    $milestoneWrap.each(function(index){
        
        var $lastItem = $(this).children().last().children().last()

        if($lastItem.find('.box-left')){
            console.log($(this))
            $('.box-left::before').css('content', 'none')
        } else {

        }
    })
})