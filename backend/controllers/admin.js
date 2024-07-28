/* eslint-disable no-undef */
const Listing = require("../models/listing.js")//require model listing
const mongoose=require('mongoose')
const asyncWrapper=require('../middlewares/async.js')
const {hashSync}=require("bcrypt")
const User = require("../models/admin.js");
const {sendMail}=require('../nodeMailer/nodeMailer.js')
const {createResetPasswordToken}=require('./crypto.js')
const crypto=require('crypto')
const loginform=(req, res) => {
    res.render("users/login.ejs");
};
const login=async (req, res) => {
    // let { email, password } = req.body;
    // // const newUser = new User({ email, name,password });
    // let result = await User.find({ $and: [{ email: email }, { password: password }] });
    // console.log(result);
    // if (result.length == 0) {
    //     res.send("Enter the valid id and password!");
    // }
    // res.render("users/profile.ejs", { user: result[0] });
    console.log("hello user")
    console.log(req.user)
    if(req.isAuthenticated()){
        const result=sendMail(req.user.email)
        console.log("email sent successfully "+result)
        res.redirect("http://localhost:5173")
    }
    else{
        res.redirect("http://localhost:5173/login")
    }
};

const signUp=asyncWrapper( async (req, res) => {

    // let { name, email, password, Cpassword } = req.body;
    const newUser = await User.findOne({
        email:req.body.email})
    if(newUser){
        return res.send("User already exist")
    }
    if(req.body.Cpassword===req.body.password){
        const data={
            name:req.body.name,
            email:req.body.email,
            Contact:req.body.Contact,
            // Number:req.body.Number,
            password:hashSync(req.body.password,10)
        }
        const new_User=await User.create(data)
        console.log("successfully created");
        sendMail({
            email:new_User.email,
            subject:'Success',
            text:`Welcome to Taste Trove! 🎉 Thank you for joining our vibrant community of food enthusiasts. Get ready to discover exciting flavors, connect with fellow foodies, and embark on delicious culinary adventures. Happy exploring!`
        })
        res.redirect("http://localhost:5173/login")
    }
    // let result = await newUser.save();

})

const logout=asyncWrapper(async(req,res)=>{
    console.log("logging out")
    req.logout()
    res.redirect("/login")
})

const forgotPassword=asyncWrapper(async(req,res)=>{
    const forgottedUser=await User.findOne({email:req.body.email})
    if(!forgottedUser){
        res.send("you dont exsist. Go back!!! ")
        return
    }

    const tokenObject=createResetPasswordToken()
    
    forgottedUser.passwordResetToken=tokenObject.passwordResetToken
    forgottedUser.passwordResetTokenExpires=tokenObject.passwordResetTokenExpires
    await forgottedUser.save()
    
    const resetUrl=`${req.protocol}://${req.get('host')}/resetPassword/${tokenObject.resetToken}`;
    const message=`We have received a passwword reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nAbove link will be expired in 10 minutes.`;
    try {
        await sendMail({
            email:forgottedUser.email,
            subject:'password change request received',
            text:message
        })
        res.status(200).json({
            status:'success',
            message:'password reset link sendd to user email'
        })
    } catch (error) {
        forgottedUser.passwordResetToken=undefined
        forgottedUser.passwordResetTokenExpires=undefined
        forgottedUser.save()
        return error
    }

})

const resetPassword=asyncWrapper(async(req,res)=>{
    const token=crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user=await User.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}});

    if(!user){
        res.json({message:"token is invalid"});
        return
    }
    if(req.body.Cpassword===req.body.password){
        user.password=hashSync(req.body.password,10)
        user.passwordResetToken=undefined
        user.passwordResetTokenExpires=undefined
        user.passwordChangedAt=Date.now()
        await user.save()
        res.status(200).json({status:'success',
        message:'password changed successfully'})
        
    }
    else{
        res.json({message:"password wont match"});
        return
    }


})

module.exports={loginform,login,signUp,logout,forgotPassword,resetPassword}
