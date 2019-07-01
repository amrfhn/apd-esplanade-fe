$(function (){
    
    var getMax = function(){
        return $(document).height() - $(window).height();
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
    $('#progressBar').addClass('flat');
      
    $('#flat').on('click', function(){
      $('#progressBar').removeClass().addClass('flat');
      $('a').removeClass();
      $(this).addClass('active');
      $(this).preventDefault();
    });



    var fixProgress = $('#progressBar').offset().top - 100;

    $(document).on('scroll', function() {
    
        if($(this).scrollTop() >= fixProgress && !$("#progressBar").hasClass("fixedbar")){
           $("#progressBar").addClass("fixedbar");
        }
        
        if($(this).scrollTop() <= fixProgress && $("#progressBar").hasClass("fixedbar")){
            $("#progressBar").removeClass("fixedbar");
        }
      });

});


