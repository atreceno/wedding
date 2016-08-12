// Scrolling
////////////////////////////////////////////////////////////
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Scroll to top
///////////////////////////////
jQuery(document).ready(function() {
    var offset = 250;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('#back-to-top').fadeIn(duration);
        } else {
            jQuery('#back-to-top').fadeOut(duration);
        }
    });

    jQuery('#back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});

// Responsive Menu
//////////////////////////////////////////
$(document).ready(function(){
    $("#toggle").click(function(){
        $(".navigation").fadeToggle();
    });
});

/* Stripe */
$(document).ready(function() {
    $("#giftForm").validate({
        rules: {
            amount: { required: true, digits: true, min: 10, max:2000 }
        }
//      ,
//        messages: {
//            amount: "Please enter a valid amount"
//        }
    })
});

var donation;
var handler = StripeCheckout.configure({
  key: 'pk_test_0TU79n6iUYVlIJs6hCiTWi6H',
  image: 'images/portfolio/first-date.png',
  locale: 'auto',
  name: 'Our wedding in Toledo',
  description: 'Anya & Agustín',
  zipCode: false,
  currency: "gbp",
  allowRememberMe: false,
  token: function(token) {
    console.log(token);

    $.ajax({
      url: '/stripes',
      type: 'post',
      data: {tokenid: token.id, email: token.email, livemode: token.livemode, amount: donation},
      success: function(data) {
        if (data == 'success') {
            console.log("Card successfully charged!");
        }
        else {
            console.log("Success Error!");
        }
      },
      error: function(data) {
        console.log("Ajax Error!");
        console.log(data);
      }
    }); // end ajax call

    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  }
});

$('#stripe100').on('click', function(e) {
  // Open Checkout with further options:
  donation = 10000;
  handler.open({
    amount: 10000,
    panelLabel: 'Send {{amount}} gift'
  });
  e.preventDefault();
});

$('#stripe200').on('click', function(e) {
  // Open Checkout with further options:
  donation = 20000;
  handler.open({
    amount: 20000,
    panelLabel: 'Send {{amount}} gift'
  });
  e.preventDefault();
});

$('#stripe300').on('click', function(e) {
  // Open Checkout with further options:
  donation = 30000;
  handler.open({
    amount: 30000,
    panelLabel: 'Send {{amount}} gift'
  });
  e.preventDefault();
});

$('#stripe500').on('click', function(e) {
  // Open Checkout with further options:
  donation = 50000;
  handler.open({
    amount: 50000,
    panelLabel: 'Send {{amount}} gift'
  });
  e.preventDefault();
});

$('#stripeother').on('click', function(e) {
  if($('#giftForm').valid()) {
    // Open Checkout with further options:
    donation = $('#amount').val() * 100;
    handler.open({
      amount: $('#amount').val() * 100,
      panelLabel: 'Send {{amount}} gift'
    });
    e.preventDefault();
  } else {
    console.log("Invalid form");  
  }
});

// Close Checkout on page navigation:
$(window).on('popstate', function() {
  handler.close();
});

