(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])