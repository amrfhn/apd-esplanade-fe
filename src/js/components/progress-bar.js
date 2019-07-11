$(function (){

    var current;
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    
    $('.progress-wrapper').each(function () {
        
        if(width <= 768) {
            current = $('.progress-wrapper.d-block');
        } 
        if(width > 768) {
            current = $('.progress-wrapper.d-md-block');
        }
    })

    var $readSection = $('#readSection');
    var $scrollOffset = $(document).scrollTop();


    var getMax = function(){
        return  $('#readSection').height() + 50;
    }
    
    var getValue = function(){
        return $(window).scrollTop();
    }
    
    if('max' in document.createElement('progress')){
        var progressBar = $('progress');
        
        progressBar.attr({ max: getMax() });

        $(document).on('scroll', function(){
            progressBar.attr({ value: getValue() });
        });
    
        $(window).resize(function(){
            progressBar.attr({ max: getMax(), value: getValue() });
        });   
    }
    else {
        var progressBar = $('.progress-bar'), 
            max = getMax(), 
            value, width;
        
        var getWidth = function(){
            value = getValue();            
            width = (value/max) * 100;
            width = width + '%';
            return width;
        }
        
        var setWidth = function(){
            progressBar.css({ width: getWidth() });
        }
        
        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
            max = getMax();
            setWidth();
        });
    }



    $('#flat').addClass("active");
    current.find("progress").addClass('flat');
    
    $('#flat').on('click', function(){
        current.find("progress").removeClass().addClass('flat');
        $('a').removeClass();
        $(this).addClass('active');
        $(this).preventDefault();
    });


    var $fixProgress = $('.progress-wrapper');


    if($fixProgress.length>0){
        $(document).on('scroll', function() {
            
            let scrollPos = $(this).scrollTop()
            let menuHeight = $('.nav-bar-wrapper').height();
            
            if(scrollPos > (current.offset().top - menuHeight + 50)) {
            current.find("progress").addClass("fixedbar");
            } else {
                current.find("progress").removeClass("fixedbar");
            } 
        });
    }
});