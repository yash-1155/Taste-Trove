/* eslint-disable no-undef */
// const mongoose = require('mongoose');
// const dish=require('./dish.js')
// const listingSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required:true,
//             minlength:1,
//             maxlength:50,
//             trim:true,
//              match: /^[a-zA-Z\s]+$/,
//         },
//         rating: {
//             type: Number,
//             min: 0,
//             max: 5,
//             validate: {
//                 validator: function(value) {
//                     return /^(\d*\.)?\d{1}$/.test(value);
//                 },
//                 message: 'Invalid rating format. Should be a number with at most one decimal place.',
//             },
//         },
//         image:{
//             type:String,
//             default:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
//         },
//         price:{
//             type:Number,
//             min:0,

//         },
//         address:{
//             type:String,
//             minlength:3,
//             maxlength:200,
//             trim:true
//         },
//         dishes:[
//             {
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref:'dish'

//             }
//         ],
//         reviews: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Review'
//             }
//         ]
//     }
// )

// const Listing = mongoose.model("Listing", listingSchema);

// module.exports=Listing;

const mongoose = require('mongoose');
const dish = require('./dish.js')
const User=require('./user.js')
const Order=require('./order.js')
const listingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            // required:true,
            minlength: 1,
            maxlength: 50,
            // trim:true,
            //  match: /^[a-zA-Z\s]+$/,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            validate: {
                validator: function (value) {
                    return /^(\d*\.)?\d{1}$/.test(value);
                },
                message: 'Invalid rating format. Should be a number with at most one decimal place.',
            },
        },
        image: {
            url: String,
            filename: String
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
        ,
        pricePerMeal: {
            type: Number,
        },
        pricePerMonth: {
            type: Number,
        },
        address: {
            type: String,
            minlength: 3,
            maxlength: 200,
            trim: true
        },
        dishes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish'

            }
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        OpearationalDirectives:{
            type:String,
        }
        ,
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
        ,
        MorningStart: {
            type: String
        },
        MorningEnd: {
            type: String
        },

        NightStart: {
            type: String
        },
        NightEnd: {
            type: String
        },
        orders:[{
            orderId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
            userid:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }]

                
                
        ,  
        days: {
            Monday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },
            Tuesday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },
            Wednesday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },
            Thursday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },
            Friday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },
            Saturday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },
            Sunday: {
                name: {
                    type: String,
                }, breakFast: [{
                    type: String,
                }],
                lunch: [{
                    type: String,
                }],
                dinner: [{
                    type: String,
                }]
            },

        }

    }

)

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;