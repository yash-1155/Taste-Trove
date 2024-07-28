const express=require("express")
const router=express.Router()
const passport=require("passport")
const {getprofile,getEditProfile,updateEditProfile}=require("../controllers/profile_controllers.js")

router.route('/:id').get(getprofile)
router.route('/:id/edit').get(getEditProfile).put(updateEditProfile)
module.exports=router