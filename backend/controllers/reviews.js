/* eslint-disable no-undef */
const Listing = require("../models/listing.js")//require model listing
const mongoose=require('mongoose')
const asyncWrapper=require('../middlewares/async.js')
const Review = require("../models/reviews.js");

const createNewReview=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newreview = new Review(req.body.review);
    listing.reviews.push(newreview);
    console.log(newreview);
    console.log(req.user);
    await newreview.save();
    await listing.save();
    res.redirect(`/listing/${id}`);
}

const DeleteReview= asyncWrapper( async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });//remove review from reviews array whose id=reviewId
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
})

module.exports={createNewReview,DeleteReview}
