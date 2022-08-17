const express = require('express');
const router = express.Router();

//Middleware to catch errors
const catchAsync = require('../utilities/catchAsync');

const Campground = require('../models/campground');

// 1.Middleware to protect app from unauthorized users 
// 2.Makes sure only the Authour has the Authority over his camp
// 3. Check the existance of the camp
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');



router.get('/', catchAsync(async (req, res) => {
 const campgrounds = await Campground.find({});
 res.render('campgrounds/index', { campgrounds })
}));

router.get('/new', isLoggedIn, (req, res) => {
 res.render('campgrounds/new');
});



router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
 const campground = new Campground(req.body.campground);
 campground.author = req.user._id;
 await campground.save();
 req.flash('success', 'Successfully made a new campground!');
 res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
 const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
 if (!campground) {
  req.flash('error', 'Cannot find that campground :(');
  return res.redirect('/campgrounds');
 }
 res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
 const { id } = req.params;
 const campground = await Campground.findById(id);
 if (!campground) {
  req.flash('error', 'Cannot find that campground :(');
  return res.redirect('/campgrounds');
 };
 res.render('campgrounds/edit', { campground });
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res, next) => {
 const { id } = req.params;
 const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
 req.flash('success', 'Successfully updated the campground!');
 res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
 const { id } = req.params;
 await Campground.findByIdAndDelete(id);
 req.flash('success', 'You deleted the campground');
 res.redirect('/campgrounds');
}));

module.exports = router;