/* eslint-disable no-undef */
// const express=require('express')
// const router=express.Router({ mergeParams: true });
// const {createNewReview,DeleteReview}=require('../controllers/reviews.js')

// router.route('/reviews')
//     .post(createNewReview)

// router.route('/:reviewId/reviews')
//     .delete(DeleteReview)

// module.exports=router

const express = require('express')
const router = express.Router({ mergeParams: true });
const { createNewReview, DeleteReview } = require('../controllers/reviews.js')
const Listing = require("../models/listing.js"); //require model listing
const Review = require("../models/reviews.js");
// router.route('/reviews')
//     .post(createNewReview)

// router.route('/:reviewId/reviews')
//     .delete(DeleteReview)

router.get('/', async (req, res) => {
    // console.log('get(/listing/:id/reviews)')
    try {
        const listing = await Listing.findById(req.params.id).populate({
            path: 'reviews',
            populate: {
                path: 'Author', // Populate the 'Author' field in each review
                model: 'User' // Assuming 'User' is the correct model name
            }
        });
        
        // console.log(listing.reviews)
        res.status(200).json(listing.reviews);
    } catch (error) {
        res.status(500).json({ "error": error })
    }
})

router.post('/', async (req, res) => {
    // console.log('post(/listing/:id/reviews)')
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newreview = new Review(req.body);
    listing.reviews.push(newreview);
    // if(req.user){
    //     newreview.Author=req.user;
    // }
    console.log(req.user);
    if(req.user){
        newreview.Author = req.user._id;
        // newreview.Author=req.user;
    }
    console.log("review add!");
    console.log(req.user);
    await newreview.save();
    await listing.save();
    res.status(200).json(newreview);
})

router.delete('/:reviewId', async (req, res) => {
    // console.log("delete review");
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });//remove review from reviews array whose id=reviewId
    let review = await Review.findByIdAndDelete(reviewId);
    console.log(review);
    console.log(req.user);
    res.status(200).json(review);
})

module.exports = router
