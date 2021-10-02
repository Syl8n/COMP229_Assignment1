var express = require('express'),
    fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* GET Contact page. */
router.get('/resume', function(req, res, next) {
  // To download the pdf
  // res.download("./public/file/HenrySuhResume.pdf");
  // To display it in the browser
  var filePath = "./public/file/HenrySuhResume.pdf";

    fs.readFile(filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

/* Send Message */
router.get('/sendMsg', function(req, res, next) {
  var myGb = require('/js/script.js');
  // myGb.gbName = req.query.name;
  // myGb.gbMsg = req.query.msg;
  // res.write("<script>alert('Your message has been sent! Please check the console log')</script>");
  // res.write("<script>window.location=\"/contact\"</script>");
  // console.log('name: ' + myGb.gbName);
  // console.log('message: ' + myGb.gbMsg);
  // res.send(`name : ${gbName}, msg : ${gbMsg}`);
  // res.render('contact', { title: 'Contact' });
});

module.exports = router;
