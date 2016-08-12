var express = require('express');
var path = require('path');
var router = express.Router();
var mailgun = require('mailgun-js')({apiKey: 'key-fe56da0dfc8f46a5115f33066b608419', domain: 'sandboxfb062be13e184f1f9a1f2028f16b893b.mailgun.org'});
var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* GET home page */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* Send email */
router.post('/', function(req, res, next) {
  if (req.body.name) {
    var data = {
      from: 'Our Wedding in Toledo <do-not-reply@anyaagus.com>',
      to: ['agustin.treceno@gmail.com', 'anya.fainberg@gmail.com'],
      subject: 'Anya & Agus Wedding - RSVP',
      text: JSON.stringify(req.body)
    };
    console.log(req.body);
    mailgun.messages().send(data, function(err, body) {
      console.log(body);
    });
  } else {
    console.log('Name is false');
  }

  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/stripes', function(req, res, next) {
  console.log('Processing payment: ');
  console.log(req.body); // tokenid, email, livemode, amount

  stripe.charges.create({
    amount: req.body.amount,
    currency: "gbp",
    source: req.body.tokenid, // obtained with Stripe.js
    description: "Wedding gift"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      console.log(charge.id);
      res.send('success');
    }
  });

});

module.exports = router;
