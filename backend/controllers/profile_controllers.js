const asyncWrapper = require("../middlewares/async");
const User=require("../models/user.js")

const getprofile=asyncWrapper( async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    if(id){
        if(user){

            res.render("users/profile.ejs", { user });
        }else{
            res.redirect("/register");    
        }
    }else{
        res.redirect("/login");
    }
    // res.redirect("users/edit.ejs",{user});
})
const getEditProfile=asyncWrapper( async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    // res.redirect("users/edit.ejs",{user});
    res.render("users/edit.ejs", { user });
})
const updateEditProfile=asyncWrapper(async(req,res)=>{
    let {id}=req.params
    let userData={
        name:req.body.name,
        email:req.body.email,
        Contact:req.body.Contact,
        city:req.body.city,
        state:req.body.state
    }
    let user=await User.findByIdAndUpdate(id,userData,{new:true})
    res.redirect("/profile")
    console.log(user)
    console.log("successfully edited")
})
module.exports={getprofile,getEditProfile,updateEditProfile}