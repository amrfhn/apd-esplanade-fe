$(function() {
    $('#hamb').on('click', function(){
        $('.mm-wrapper').addClass('active');
    })

    $('.close-btn-x').on('click', function(){
        $('.mm-wrapper').removeClass('active');
    })
