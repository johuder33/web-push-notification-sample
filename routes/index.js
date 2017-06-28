var express = require('express');
var router = express.Router();
// import web-push lib
var webpush = require('web-push');
var APIKey = process.env.APIKEY;
//'AIzaSyA_JbTuYQpxQS7ABLfdzVtnOqxhGjqS22g'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/notification', function(req, res, next) {
  const vapidKeys = webpush.generateVAPIDKeys();
  const subscription = req.body.subscription;
  const message = req.body.message;
  const options = {
    TTL: 24 * 60 * 60,
    vapidDetails: {
      subject: 'mailto:sender@example.com',
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey
    }
  }

  webpush.setGCMAPIKey(APIKey);

  webpush.sendNotification(
    subscription,
    message,
    options
  ).then((data) => {
    res.status(201).send("notification sent");
  }).catch((e) => {
    res.status(400).send(e);
  });
});

module.exports = router;
