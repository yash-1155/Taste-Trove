const mongoose = require("mongoose")
const Listing=require('./listing')
const User=require('./user')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    amount: {
        type: Number,
        // required:true
    },
    time:{
        type: Date,
        default: Date.now() + 3 * 60 * 60 * 1000
        // required:true
    },
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messContact:{
        type:String
    },
    userContact:{
        type:String
    }
    
    
});


module.exports = mongoose.model("Order", orderSchema);

