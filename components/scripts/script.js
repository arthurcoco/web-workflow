$(function() {
    "use strict";

    var wheight = $(window).height();
    var wwidth = $(window).width();

    $('#map').css('height', wwidth / 3);

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
        var wwidth = $(window).width();

        $('#map').css('height', wwidth / 3);

        $('#featured .item').css('height', wheight);

        $('#featured .item bimg').each(function() {
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
            interval: 5000,
            // pause: 'hover'
        })
        // $('.carousel').carousel({
        //  interval: false;
        // });
    $('#featured').on('slide.bs.carousel', function() {
        // console.log("start sliding");
    })

    $('#featured').on('slid.bs.carousel', function() {
        // console.log("slided");
    })

    /*
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

    */

    var wwidth = $(window).width();




    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(22.286207, 114.190389),
            zoom: 15,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }


    google.maps.event.addDomListener(window, 'load', initialize);

    // var overlay = jQuery('<div id="overlay"> </div>');
    // overlay.appendTo(document.body);

    $('#contactModal').on('shown.bs.modal', function(e) {
        $("div").last().addClass("bg-pdmred");
    })

    $('#contactModal').on('hidden.bs.modal', function(e) {
        console.log("Hidded");
    })




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
        },
        anchors: ['sfeatured', 'scarousel', 'snon-slide'],
        afterLoad: function(anchorLink, index) {
            //using anchorLink
            var target = $("#cnavbar");
            if (anchorLink == 'scarousel' || anchorLink == 'sfeatured') {
                if (target.hasClass('dark-nav')) {
                    console.log('remove dark');
                    target.addClass('light-nav');
                    target.removeClass('dark-nav');
                }

                // set logo
                console.log($('#main-logo').attr('src'));
                $('#main-logo').attr('src', "images/logo/pdm_dark.svg");
                $('#cnavbar').css('background-color', 'transparent');



            }

            if (anchorLink == 'snon-slide') {

                if (!target.hasClass('dark-nav')) {
                    console.log('add dark');
                    target.addClass('dark-nav');
                    target.removeClass('light-nav');
                    $('#main-logo').attr('src', "images/logo/pdm.svg");
                    $('#cnavbar').css('background-color', 'rgba(255,255,255,0.8)');
                }
            }


        },
        // onLeave: function(index, nextIndex, direction){
        //     var leavingSection = $(this);

        //     //after leaving section 2
        //     if(index == 2 && direction =='down'){
        //         console.log("Going to section 3!");
        //     }

        //     else if(index == 2 && direction == 'up'){
        //         console.log("Going to section 1!");
        //     }
        // }

    });


    $(".loader").fadeOut("slow");
    console.log("doc ready!");


});
