//<!-- TRANSITION FROM ESPLANDE.COM TO OFFSTAGE -->
//<! DON"T HAVE TO INCLUDE INTO OFFSTAGE SCRIPT -->

var anchor = $("a[href!='#']");

anchor.on('click', function (e) {
    if ($(this).attr('href')) {
        var redirectUrl = $(this).attr('href');
        var toOffStageScreen = $('#animationToOffStage');

        if (($(this).attr('href').includes('esplanade') || $(this).attr('href').startsWith("/")) && $(this).attr('href').includes('offstage')) {
            e.preventDefault();
            toOffStageScreen.removeClass('d-none').addClass('d-block');
            // toOnStageScreen.addClass('active')
            $('body').css('overflow', 'hidden');
            setTimeout(function () {
                location.href = redirectUrl
            }, 3000);
        } else {
            e.currentTarget.click();
        }
    }
});