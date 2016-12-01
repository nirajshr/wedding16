var firebase = require('firebase/app');
require("firebase/database");

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
        var top = $(href).offset() ? $(href).offset().top : 0;
        $root.animate({
            scrollTop: top
        }, 500, function () {
            window.location.hash = href;
        });
        return false;
    });    
}

function setupGuestbookForm(saveCbk) {
    $('#guestbookForm').on('submit', function () {
        try {
            var $form = $(this);
            
            if(postGuestbookMessage(
                $("#contactName").val(),
                $("#contactMessage").val(),
                $("#contactEmail").val())) {
                $form.find(':submit').each(function() {
                    $button = $(this);
                    label = $button.attr('after-submit-value');
                    if (typeof label != 'undefined') {
                        $button.text(label).prop('disabled', true);
                    }
                });
            }
        }
        catch (e) {
            console.log("exception caught:", e);
        }

        return false;
    });
}
var config = {
    apiKey: "AIzaSyB_eHmMLp1f4qiWD1ef8Npicrvoi-JNI5M",
    authDomain: "abinaniraj.firebaseapp.com",
    databaseURL: "https://abinaniraj.firebaseio.com",
    //storageBucket: "abinaniraj.appspot.com",
    //messagingSenderId: "745415908791"
};
var abinaniraj_svc = firebase.initializeApp(config);
console.log("Firebase initialized with app name: ", abinaniraj_svc.name);

function postGuestbookMessage(name, msg, email) {
    if (name && msg) {
        console.log("Saving guestbook with name: ", name, ", email: ", email, ", msg: ", msg);
        var key = abinaniraj_svc.database().ref('messages_inbox').push().key;

        abinaniraj_svc.database().ref('messages_inbox/' + key).set({
            name: name,
            email: email,
            msg: msg
        });
    
        return true;
    }
    return false;
}

function autoHideNavBar() {
    var $navbarc = jQuery('.navbar-collapse');
    jQuery(".navbar a").on('click', function () {
        $navbarc.collapse('hide');
    });
}

jQuery(function ($) {
    console.log("Jquery ready code!")
    $('weddingDateTxt').text(getDateStr(WEDDING_DATE));
    startCountdown(WEDDING_DATE, $('#timeCountdownTxt'));

    autoHideNavBar();
    setupPageScrolls();
    setupGuestbookForm();
});
