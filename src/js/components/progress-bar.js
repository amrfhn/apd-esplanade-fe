$(function (){
    "use strict";
    
    if($('.progress-wrapper').length > 0){
        var target;
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        
        $('.progress-wrapper').each(function () {
            if(width <= 768) {
                target = '.progress-wrapper.d-block';
            } 
            if(width > 768) {
                target = '.progress-wrapper.d-md-block';
            }
        })

        updateProgressBar(target);

        window.onscroll = function() {updateProgressBar(target)};

        // run sticky progress bar
        var $fixProgress = $('.progress-wrapper');
        if($fixProgress.length>0){
            $(document).on('scroll', function() {
                
                let scrollPos = $(this).scrollTop()
                let menuHeight = $('.left-wrapper').height();
                
                if(scrollPos > ($(target).offset().top - menuHeight)) {
                $(target).find(".progress-container").addClass("fixedbar");
                } else {
                    $(target).find(".progress-container").removeClass("fixedbar"); 
                } 

            });
        }


        function updateProgressBar(selector) {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.querySelectorAll(selector + ' .progress-bar')[0].style.width = scrolled + "%";
        }
    }
});