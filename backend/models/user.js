/* eslint-disable no-undef */
const mongoose=require("mongoose")
const crypto=require('crypto')
const listing=require('./listing')
const Order=require('./order.js')

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        // required:true
    },
    googleId:String,
    email:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    Type:{
        type: String,
        default:'User',
    }
    ,
    Contact:{
        type:Number,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    passwordChangedAt:{
        type:Date
    },
    passwordResetToken:{type:String},
    passwordResetTokenExpires:{type:Date},
    orders:[{
        orderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        listingid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing',
        }
    }]
});


const User=mongoose.model("User",userSchema);
module.exports=User
// module.exports.createResetPasswordToken = userSchema.methods.createResetPasswordToken;

