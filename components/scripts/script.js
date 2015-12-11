$(function() {
    var wheight = $(window).height();

    $('#featured .item').css('height', wheight);

    $('#featured .item .bimg').each(function() {
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

    var slideqty = $('#featured .item').length;

    for (var i = 0; i < slideqty; i++) {
        var insertText = '<li data-target="#featured" data-slide-to="' + i + '"></li>';
        $('#featured ol').append(insertText);
    }

    $('.carousel').carousel({
            interval: 3000,
            // pause: 'hover'
        })
        // $('.carousel').carousel({
        //  interval: false;
        // });
    $('#featured').on('slide.bs.carousel', function() {
        console.log("start sliding");
    })

    $('#featured').on('slid.bs.carousel', function() {
        console.log("slided");
    })


    var faded = false;

    $('#menu-btn').on('click', function() {
        if (faded == false) {
            $('#overlay, #overlay-back').fadeIn(500);
        } else {
            $('#overlay, #overlay-back').fadeOut(500);
        }

        faded = !faded;

    });

    $('#close-menu-btn').on('click', function() {
        if (faded == false) {
            $('#overlay, #overlay-back').fadeIn(500);
        } else {
            $('#overlay, #overlay-back').fadeOut(500);
        }

        faded = !faded;

    });



    // var overlay = jQuery('<div id="overlay"> </div>');
    // overlay.appendTo(document.body);



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
