const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        // required:true
    },
    googleId: String,
    email: {
        type: String,
        // required:true
    },
    password: {
        type: String,
        // required:true
    },
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ],
    Type:{
        type: String,
        default:'Admin',
    }
    ,
    Contact: {
        type: Number,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    messName: {
        type: String
    },
    messAddress: {
        type: String
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date }
});


module.exports = mongoose.model("Admin", userSchema);

