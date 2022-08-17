const express = require('express');
const router = express.Router({ mergeParams: true });

const { validateReview } = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');

const ExpressError = require('../utilities/ExpressError');
const catchAsync = require('../utilities/catchAsync');



router.post('/', validateReview, catchAsync(async (req, res, next) => {
 const campground = await Campground.findById(req.params.id);
 const review = new Review(req.body.review);
 campground.reviews.unshift(review);
 await review.save();
 await campground.save();
 req.flash('success', 'Posted a new review!')
 res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
 const { id, reviewId } = req.params;
 await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
 await Review.findByIdAndDelete(reviewId);
 req.flash('success', 'You deleted the review');
 res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;