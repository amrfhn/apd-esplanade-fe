$(function () {
    'use strict'

    var $milestoneWrap = $('.milestones-wrapper');

    if ($milestoneWrap.length > 0) {
        $milestoneWrap.each(function (index, item) {
            var $btnLoadMore = $(this).find('.loadMilestone');
            var $milestone = $(this).find('.milestones');

            if (!$milestone.children().hasClass('more-miles')) {

                $btnLoadMore.parent().removeClass('d-flex').addClass('d-none');
                $milestone.children().addClass('milestone-single-item');

            } else {

                var moreMiles = $(this).find('.more-miles').attr('id');
                var newID = moreMiles + "-" + index;
                $(this).find('.more-miles').attr('id', newID);

                var buttonTarget = $btnLoadMore.attr('data-target');
                var newTarget = buttonTarget + "-" + index;
                $btnLoadMore.attr('data-target', newTarget);
                
                $btnLoadMore.parent().removeClass('d-none').addClass('d-flex');
            }

            $btnLoadMore.on('click', function () {
                $(this).parent().removeClass('d-flex').addClass('d-none');
            })
        })
    }
})