const asyncWrapper = require("../middlewares/async")
const {sendMail}=require('../nodeMailer/nodeMailer.js')

const logout=asyncWrapper(async(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log("Successfully logged out")
        res.redirect('http://localhost:5173/login');
      });
})

const redirect=asyncWrapper(async(req,res)=>{
    console.log("hello"+ req.isAuthenticated())
        if(req.isAuthenticated()){

            console.log(req.user)
            sendMail({
                email:req.email,
                subject:'Success',
                text:`Welcome to Taste Trove! 🎉 Thank you for joining our vibrant community of food enthusiasts. Get ready to discover exciting flavors, connect with fellow foodies, and embark on delicious culinary adventures. Happy exploring!`
            })
            console.log("email sent successfully ")
            res.redirect('http://localhost:5173')
        }
    // res.send("heelo redirect")
})
const protected=asyncWrapper(async(req,res)=>{
    if(req.isAuthenticated()){
        res.send("protected")
    }
    else{
        res.redirect("/login")
    }
})
const sendUser=asyncWrapper(async(req,res)=>{
    if(req.user){
        res.status(200).send(req.user)
        console.log(req.user)
    }
    else{
        res.status(400).json({message:"unAuthorized"})
    }
})
const timepass=asyncWrapper(async(req,res)=>{
    res.send("<h1>HEllo</h1>")
})
module.exports={logout,protected,redirect,sendUser,timepass}
