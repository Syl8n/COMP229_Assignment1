const { secureHeapUsed } = require('crypto');
var express = require('express'),
    fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home',
  userName: req.user ? req.user.username : '' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects',
  userName: req.user ? req.user.username : '' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About',
  userName: req.user ? req.user.username : '' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services',
  userName: req.user ? req.user.username : '' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact',
  userName: req.user ? req.user.username : '' });
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
router.post('/sendMsg', function(req, res, next) {
  var msg = req.body;
  res.render('contact', { title: 'Contact' });
  console.log(msg);
});

module.exports = router;
