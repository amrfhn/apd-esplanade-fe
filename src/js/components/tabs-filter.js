$(function () {
    $('.tab-filter').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        focusOnSelect: true,
        prevArrow:"<img class='a-left control-c prev slick-prev prev-tabs' src='./assets/img/icons/Previous.svg'>",
        nextArrow:"<img class='a-right control-c next slick-next next-tabs' src='./assets/img/icons/Next.svg'>"  
    });
});