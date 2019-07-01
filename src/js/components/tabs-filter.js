$(function () {
    $('.tab-filter').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        variableWidth: true,
        prevArrow:"<img class='a-left control-c prev slick-prev prev-tabs' src='./assets/img/icons/Previous.svg'>",
        nextArrow:"<img class='a-right control-c next slick-next next-tabs' src='./assets/img/icons/Next.svg'>" ,
        afterChange: function(slider, index){
            if (index == 0){
                $('.slick-prev').css('display', 'none')
            }
            else{
                $('.slick-prev').css('display', 'block')
            }
        },
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            } 
        ],
        
    });
});