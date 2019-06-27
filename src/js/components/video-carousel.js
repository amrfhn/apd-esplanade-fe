$(function(){
    var $videoCarousel = $('.video-carousel-nav');
    var $slideCount = $('.slide-count-wrap');

    $videoCarousel.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        
        var i = (currentSlide ? currentSlide : 0) + 1;
        
        $slideCount.text('0'+i + '/' + slick.slideCount);
    });   

    $('.video-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.video-carousel-nav'
    });
    $('.video-carousel-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.video-carousel',
        dots: true,
        focusOnSelect: true
    });

    //Video thumbnail
    const iframe =  $('iframe:first');
    const iframe_src = iframe.attr('src');
    const youtube_video_id = iframe_src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

    if(youtube_video_id.length == 11){
        var video_thumbnail = $('<img src="//img.youtube.com/vi/'+youtube_video_id+'/0.jpg">');
        $(body).append(video_thumbnail);        
    }
})