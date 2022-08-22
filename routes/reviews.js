const express = require('express');
const router = express.Router({ mergeParams: true });

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/review');
const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');



//route to make a review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//route to delete a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;