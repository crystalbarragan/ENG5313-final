'use strict';

// grabbing the class names from the data attributes
var navBar = $('.navbar'),
    data = navBar.data();

// booleans used to tame the scroll event listening a little..
var scrolling = false,
    scrolledPast = false;

// transition Into
function switchInto() {
  // update `scrolledPast` bool
  scrolledPast = true;
  // add/remove CSS classes
  navBar.removeClass(data.startcolor);
  navBar.removeClass(data.startsize);
  navBar.addClass(data.intocolor);
  navBar.addClass(data.intosize);
  console.log('into transition triggered!');
};

// transition Start
function switchStart() {
  // update `scrolledPast` bool
  scrolledPast = false;
  // add/remove CSS classes
  navBar.addClass(data.startcolor);
  navBar.addClass(data.startsize);
  navBar.removeClass(data.intocolor);
  navBar.removeClass(data.intosize);
  console.log('start transition triggered!');
}

// set `scrolling` to true when user scrolls
$(window).scroll(function () {
  return scrolling = true;
});

setInterval(function () {
  // when `scrolling` becomes true...
  if (scrolling) {
    // set it back to false
    scrolling = false;
    // check scroll position
    if ($(window).scrollTop() > 100) {
      // user has scrolled > 100px from top since last check
      if (!scrolledPast) {
        switchInto();
      }
    } else {
      // user has scrolled back <= 100px from top since last check
      if (scrolledPast) {
        switchStart();
      }
    }
  }
  // take a breath.. hold event listener from firing for 100ms
}, 100);

// video

//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
