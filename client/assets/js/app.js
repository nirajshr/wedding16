var WEDDING_DATE = new Date("2017-02-23T02:15:00");

function getDisplayStr(days, hours, minutes, seconds) {
    var str = "";
    if (days > 0) str += days + " days  ";
    if (hours > 0) str += hours + " hrs  ";
    if (minutes > 0) str += minutes + " mins  ";
    str += seconds + " secs";

    return str;
}

function getDateStr(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + day +', ' + year;
}

function startCountdown(deadline, display) {
    var timer = setInterval(function () {
        var now = new Date();
        var t = (deadline.getTime() - now.getTime());

        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );

        var displayText = t > 0 
            ? getDisplayStr(days, hours, minutes, seconds)
            : ""

        display.text(displayText);

        if (t < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

jQuery(function ($) {
    console.log("Jquery ready code!")
    $('weddingDateTxt').text(getDateStr(WEDDING_DATE));
    startCountdown(WEDDING_DATE, $('#timeCountdownTxt'));

    setupPageScrolls();
});

function setupPageScrolls() {
    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    //Click event to scroll to top
    $('.back-to-top').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    //Click event to scroll smoothly to anchor links
    var $root = $('html, body');
    $('.anchorLink').click(function() {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, 500, function () {
            window.location.hash = href;
        });
        return false;
    });
    
}