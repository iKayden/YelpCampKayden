const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

//Middleware to catch errors
const catchAsync = require('../utilities/catchAsync');

const Campground = require('../models/campground');

// 1.Middleware to protect app from unauthorized users 
// 2.Makes sure only the Authour has the Authority over his camp
// 3. Check the existance of the camp
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

// controller for campground route
const campgrounds = require('../controllers/campgrounds')

router.route('/')
 .get(catchAsync(campgrounds.index))
 .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
 .get(catchAsync(campgrounds.showCampground))
 .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
 .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditFrom));

module.exports = router;