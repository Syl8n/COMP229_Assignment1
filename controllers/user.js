let User = require('../models/user');
let passport = require('passport');

// for errors
function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

// rendering sign in page
module.exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('secure/signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

// rendering sign up page
module.exports.renderSignup = function(req, res, next) {
  if (!req.user) {

    // creates a empty new user object.
    let newUser = User();

    res.render('secure/signup', {
      title: 'Sign-up Form',
      messages: req.flash('error'),
      user: newUser
    });

  } else {
    return res.redirect('/');
  }
};

// saving info to db and perform proper actions
module.exports.signup = function(req, res, next) {
  if (!req.user && req.body.password === req.body.password_confirm) {
    console.log(req.body);

    let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        req.flash('error', message);
        // return res.redirect('/users/signup');
        return res.render('secure/signup', {
          title: 'Sign-up Form',
          messages: req.flash('error'),
          user: user
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/businessContact');
      });
    });
  } else {
    return res.redirect('/');
  }
};

// for signing out
module.exports.signout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};

// for signing in
module.exports.signin = function(req, res, next){
    console.log(req.body);
  passport.authenticate('local', {   
    successRedirect: req.session.url || '/',
    failureRedirect: '/users/signin',
    failureFlash: true
  })(req, res, next);
  delete req.session.url;
}