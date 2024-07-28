/* eslint-disable no-undef */
// const mongoose = require('mongoose');

// const reviewSchema = mongoose.Schema(
//     {
//         user: {
//             type: String,
//             required:true,
//             default:"david"
//         },
//         comment:{
//             type: String,
//             required:true,
//         },
//         rating: {
//             type:Number,
//             min: 0,
//             max: 5,
//         }
//     }
// )

// const Review = mongoose.model("Review", reviewSchema);

// module.exports=Review;

const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: String,
            // required:true,
            default: "david"
        },
        comment: {
            type: String,
            //required:true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default:3,
        },
        Author:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'

        }
    }
)
       

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;