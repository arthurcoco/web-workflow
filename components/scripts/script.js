$(function() {
    var wheight = $(window).height();

    $('#featured .item').css('height', wheight);

    $('#featured .item img').each(function() {
        var imgSrc = $(this).attr('src');

        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')'
        });


        $(this).remove();
    });


    $(window).resize(function() {
        var wheight = $(window).height();

        $('#featured .item').css('height', wheight);

        $('#featured .item img').each(function() {
            var imgSrc = $(this).attr('src');

            $(this).parent().css({
                'background-image': 'url(' + imgSrc + ')'
            });


            $(this).remove();
        });
    });


    console.log("main function");



});


$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        scrollOverflow: true,
        loopHorizontal: true,
        afterRender: function() {
            // setInterval(function () {
            //     $.fn.fullpage.moveSlideRight();
            // }, 151000);
            //playing the video
            // $('video').get(0).play();
        }

    });

    console.log("doc ready!");
});
