const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
 res.render('users/register');
});


// New User registration logic 
router.post('/register', catchAsync(async (req, res) => {
 try {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  // Takes new user and pw, hashes and stores
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, err => {
   if (err) return next(err)
   req.flash('success', `Hello, ${registeredUser.username}! Welcome to Yelp Camp!`);
   res.redirect('/campgrounds');
  });
 } catch (e) {
  req.flash('error', e.message);
  res.redirect('register');
 }
 console.log(registeredUser);
}));

router.get('/login', (req, res) => {
 res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
 req.flash('success', 'Welcome back!');
 const redirectUrl = req.session.returnTo || '/campgrounds';
 delete req.session.returnTo;
 res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
 req.logout();
 req.flash('success', 'You\'ve been logged out');
 res.redirect('/campgrounds');
})

module.exports = router; 